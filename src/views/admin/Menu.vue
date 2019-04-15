<template>
    <div>
        <div class="weui-cells__title menu-path" v-show="form.matchrule.group_id">权限组：</div>
        <div class="weui-cells weui-cells_form" v-show="form.matchrule.group_id">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    {{groupname}}
                </div>
            </div>
        </div>
        <div v-for="(btn,index) in form.button" :key="'L1'+index">
            <div class="weui-cells__title menu-path">一级菜单：</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="btn.name" v-re-valid minlength="0" maxlength="8" placeholder="请输入主菜单名"/>
                    </div>
                </div>
            </div>
            <div class="weui-cells__title">二级菜单（最多5个）：</div>
            <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:;"
                    v-for="(sb,sbindex) in btn.sub_button" :key="'L1'+index+sbindex" @click="doNewSubButton(btn.name, sb)">
                    <div class="weui-cell__bd">
                        <p>{{sb.name}}</p>
                    </div>
                    <div class="weui-cell__ft"></div>
                </a>
                <a href="javascript:void(0);" class="weui-cell weui-cell_link" v-show="canNew(btn.name)" @click="doNewSubButton(btn.name)">
                    <div class="weui-cell__bd">添加更多</div>
                </a>
            </div>
        </div>

        <div class="weui-cells weui-cells_form" v-show="canEidt">
            <div class="weui-cell weui-cell_switch">
                <div class="weui-cell__bd">是否启用</div>
                <div class="weui-cell__ft">
                    <label for="switchCP" class="weui-switch-cp">
                        <input id="switchCP" class="weui-switch-cp__input" type="checkbox" v-model="form.isusing" checked="checked" >
                        <div class="weui-switch-cp__box"></div>
                    </label>
                </div>
            </div>
        </div>

        <div class="weui-btn-area" v-show="canEidt">
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="doSyncToWC">同步到公众号</a>
        </div>
        <dialog-confirm :showing="dialog.showing" inputholder="请输入微信菜单管理口令" :title="dialog.title" :msg="dialog.msg" @cancel="dialog.cancel" @confirm="dialog.confirm"></dialog-confirm>
        <dialog-menu-edit @del="doDel" @confirm="doConfirmNew" :showing="dialogMEdit.showing" :title="dialogMEdit.title" :btn="dialogMEdit.btn"></dialog-menu-edit>
    </div>
</template>

<script>
import DialogMenuEdit from '@/components/Dialog-MenuEdit'
import DialogConfirm from '@/components/Dialog-Confirm'
export default {
    name:'wechatmenu',
    components:{
        "dialog-menu-edit" : DialogMenuEdit,
        'dialog-confirm': DialogConfirm
    },
    data(){
        return{
            canEidt:true,
            dialogMEdit:{
                showing: false,
                title:'',
                btn:{
                    pname:'',
                    name:'',
                    type:'view',
                    url:''
                }
            },
            dialog:{
                showing:false,
                title:'郑重提醒',
                msg:'',
                cancel:() => this.dialog.showing = false,
                confirm:()=>console.log('confirm')
            },
            form:{
                 button:[
                    {
                        name:"",
                        sub_button:[]
                    },{
                        name:"",
                        sub_button:[]
                    },{
                        name:"",
                        sub_button:[]
                    }
                ],
                matchrule:{
                    group_id: ''
                },
                menuid: 0,
                isusing: true
            },
            datas:{
                tags:[]
            }
        }
    },
    created(){
        this.form.matchrule.group_id = this.$route.params.gid

        this.$axios.get(this.$api.wechat_tags)
            .then(res=>{
                if(res.data.code == 0){
                    this.datas.tags = res.data.content.tags
                }
            })
        this.$axios.get(this.$api.wechat_menu)
            .then(res=>{
                if(res.data.code == 0){
                    if(this.$route.params.gid){
                        let cmenu = res.data.content.conditionalmenu 
                                    && res.data.content.conditionalmenu
                                          .find(c=>c.matchrule.group_id == this.$route.params.gid)
                        this.form = cmenu ? cmenu : this.form
                        let pbtnslen = 3-this.form.button.length
                        console.log(this.form.button, pbtnslen)
                        for(var len=0;len<pbtnslen;len++){
                            console.log(len)
                            this.form.button.push({name:"",sub_button:[]})
                        }
                    }else{
                        this.canEidt = !res.data.content.menu
                        this.form = res.data.content.menu ? res.data.content.menu : this.form
                        this.form['matchrule'] = {group_id: undefined}
                    }
                }
            })
    },
    computed:{
        groupname(){
            if(!this.form.matchrule.group_id) return

            let index = this.datas.tags.findIndex(c=>c.id == this.form.matchrule.group_id)
            if(index<0) return
            return this.datas.tags[index].name
        }
    },
    methods:{
        canNew(name){
            if(!this.canEidt) return false

            var button = this.form.button.find(c=>c.name == name)
            return button.sub_button.length<5
        },
        doDel(btn){
            let index = this.form.button.findIndex(b => b.name == btn.pname)
            if(index > -1){
                let sindex = this.form.button[index].sub_button.findIndex(b=>b.name == btn.name)
                if(sindex > -1){
                    this.form.button[index].sub_button.splice(sindex,1)
                }
            }

            this.dialogMEdit.showing = false
        },
        doConfirmNew(nbtn, obtn){
            var index = this.form.button.findIndex(c=>c.name == obtn.pname)
            if(index > -1){
                let sindex = this.form.button[index].sub_button.findIndex(c=>c.name == nbtn.name)
                if(sindex == -1){
                    this.form.button[index].sub_button.push(nbtn)
                }else{
                    this.form.button[index].sub_button.splice(sindex, 1, nbtn)
                }
            }
            this.dialogMEdit.showing = false
        },
        doNewSubButton(pname, sub){
            if(sub){
                this.dialogMEdit.btn = sub
                this.dialogMEdit.btn['pname'] = pname
            }else{
                this.dialogMEdit.btn = {
                    pname:pname,
                    name:'',
                    type:'view',
                    url:''
                }
            }
            this.dialogMEdit.showing = true
            this.dialogMEdit.title = pname
        },
        doConfirmSyncToWC(menu, mgrtoken){
            this.$axios.post(this.$api.wechat_menu, {...menu}, { headers:{ menumgrtoken:mgrtoken } })
                .then(res=>{
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.$router.back()
                    }
                })
            this.dialog.showing = false
        },
        doSyncToWC(){
            if(!this.isReValidPassed()){
                this.$weui.topTips('请检查红色标记数据是否正确')
                return
            }

            let menu = {
                button:this.form.button.filter(c=>c.name),
                isusing : this.form.isusing,
                menuid:this.form.menuid
            }
            if(this.form.matchrule.group_id){
                menu['matchrule'] = {
                    tag_id:this.form.matchrule.group_id
                }
            }
            
            if(!menu.button.length){
                return
            }

            this.dialog.msg = '此操作将同步更新微信公众号中的菜单。'
            this.dialog.confirm = (confirmcxt) => { this.doConfirmSyncToWC(menu, confirmcxt) }
            this.dialog.showing = true
        }
    }
}
</script>

<style lang="stylus" scoped>
    .menu-path
        background-color: #2ca02c;
        color: #ffffff;
</style>

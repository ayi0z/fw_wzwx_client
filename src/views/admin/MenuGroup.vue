<template>
    <div>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goMenu()">
                <div class="weui-cell__bd">
                    <p>默认菜单</p>
                </div>
                <div class="weui-cell__ft">
                    点击编辑
                </div>
            </a>
        </div>
        <div class="weui-cells__title">微信菜单编辑：</div>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;" v-for="tag in datas.tags" :key="tag.id" @click="goMenu(tag.id)">
                <div class="weui-cell__bd">
                    <p>{{tag.name}}</p>
                </div>
                <div class="weui-cell__ft">
                    点击编辑
                </div>
            </a>
        </div>
         <div class="weui-btn-area">
            <a class="weui-btn weui-btn_warn" href="javascript:" @click="doDelAllMenu">删除所有菜单</a>
        </div>
        <dialog-confirm :showing="dialog.showing" inputholder="请输入微信菜单管理口令" :title="dialog.title" :msg="dialog.msg" @cancel="dialog.cancel" @confirm="dialog.confirm"></dialog-confirm>
    </div>
</template>

<script>
import DialogConfirm from '@/components/Dialog-Confirm'
export default {
    name:'wechatmenugroup',
    components:{
        'dialog-confirm': DialogConfirm
    },
    data(){
        return {
            datas:{
                tags: []
            },
            dialog:{
                showing:false,
                title:'郑重提醒',
                msg:'',
                cancel:() => this.dialog.showing = false,
                confirm:()=>console.log('confirm')
            }
        }
    },
    created(){
        this.$axios.get(this.$api.wechat_tags)
            .then(res=>{
                if(res.data.code == 0){
                    this.datas.tags = res.data.content.tags
                }
            });
    },
    methods:{
        doConfirmDelAllMenu(mgrtoken){
            this.$axios.delete(this.$api.wechat_menu, { headers:{ menumgrtoken:mgrtoken } })
                .then(res=>{
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                    }
                });
            this.dialog.showing = false
        },
        goMenu(gid){
            this.$router.push({name: 'menu', params:{ gid }})
        },
        doDelAllMenu(){
            this.dialog.msg = '此操作将删除微信公众号中所有菜单，且不可恢复。是否确认删除？'
            this.dialog.confirm = this.doConfirmDelAllMenu
            this.dialog.showing = true
        }
    }
}
</script>

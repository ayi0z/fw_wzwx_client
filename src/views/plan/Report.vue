<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__hd">
                        <label class="weui-label">车牌号</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-re-valid required v-model="form.CarNo" placeholder="请输入车牌号" />
                    </div>
                    <div class="weui-cell__ft">
                        <button class="weui-vcode-btn" @click="doPickCarNo">选择</button>
                    </div>
                </div>
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__hd">
                        <label class="weui-label">品名</label>
                    </div>
                    <div class="weui-cell__bd">
                        <select class="weui-select" v-empty-class="'weui-empty'" v-re-valid required v-model="form.MartiralName">
                            <option value="">请选择品名</option>
                            <option v-for="(m,index) in datas.martirals" :key="index" :value="m">{{m}}</option>
                        </select>
                    </div>
                </div>
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__hd">
                        <label class="weui-label">发货单位</label>
                    </div>
                    <div class="weui-cell__bd">
                        <select class="weui-select" v-empty-class="'weui-empty'" v-re-valid required v-model="form.OutDpt">
                            <option value="">请选择发货单位</option>
                            <option v-for="unit in outunits" :key="unit.单位" :value="unit.单位">{{unit.单位}}</option>
                        </select>
                    </div>
                </div>
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__hd">
                        <label class="weui-label">收货单位</label>
                    </div>
                    <div class="weui-cell__bd">
                        <select class="weui-select" v-empty-class="'weui-empty'" v-re-valid required v-model="form.InDpt">
                            <option value="">请选择收货单位</option>
                            <option  v-for="unit in inunits" :key="unit.单位" :value="unit.单位">{{unit.单位}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="weui-cells__title">皮重规则（单选）:</div>
            <div class="weui-cells weui-cells_radio">
                <label class="weui-cell weui-check__label" v-for="rule in datas.weighruls" :key="rule.value" :for="rule.value">
                    <div class="weui-cell__bd">
                        <p>{{rule.label}}</p>
                    </div>
                    <div class="weui-cell__ft">
                        <input type="radio" class="weui-check" :value="rule.value" v-model="form.TraeType" :id="rule.value">
                        <span class="weui-icon-checked"></span>
                    </div>
                </label>
            </div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_switch">
                    <div class="weui-cell__bd">长期有效</div>
                    <div class="weui-cell__ft">
                        <label for="switchCP" class="weui-switch-cp">
                            <input id="switchCP" class="weui-switch-cp__input" type="checkbox" v-model="form.LongTime" checked="checked" >
                            <div class="weui-switch-cp__box"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="doSave">提交</a>
            </div>
        </div>
    </div>
</template>

<script>
import { weighruls } from '@/config'
export default {
    name:'PlanReport',
    data:function(){
        return{
            datas:{
                weighruls:weighruls,
                martirals:[],
                carnos:[]
            },
            form:{
                CarNo:'',
                MartiralName:'',
                OutDpt:'',
                InDpt:'',
                TraeType:'1',
                LongTime:true,
                PlanType:'',
                Tasktype:''
            }
        }
    },
    created(){
        const vm = this
        this.$axios.all([
            this.$axios.get(this.$api.ws_mydpts),
            this.$axios.get(this.$api.ws_mymartiral),
            this.$axios.get(this.$api.ws_mycars)])
            .then(this.$axios.spread(function (mydpts, mymartiral, mycars) {
                console.log(mydpts, mymartiral, mycars)
                if(mydpts.data.code == 0){
                    vm.$store.dispatch("mydpts", mydpts.data.content)
                }
                if(mymartiral.data.code == 0){
                    vm.datas.martirals = mymartiral.data.content
                }
                if(mycars.data.code == 0){
                    vm.datas.carnos = mycars.data.content
                }
            }))
    },
    computed:{
        inunits(){
            return this.$store.state.mydpts ? this.$store.state.mydpts.filter(c=>c.单位类型 == '收货单位') : []
        },
        outunits(){
            return this.$store.state.mydpts ? this.$store.state.mydpts.filter(c=>c.单位类型 == '发货单位') : []
        }
    },
    methods:{
        doPickCarNo(){
            this.$weui.picker(this.datas.carnos,{
                onConfirm: result =>{
                    this.form.CarNo = result ? (result[0] ? result[0].value : this.form.CarNo) : this.form.CarNo
                }
            })
        },
        doSave(){
            if(!this.isReValidPassed()){
                this.$weui.topTips('请检查红色标记数据是否正确')
                return
            }
            this.$axios.post(this.$api.ws_carplan, {...this.form})
                .then(res=>{
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.form = {
                                        CarNo:'',
                                        MartiralName:'',
                                        OutDpt:'',
                                        InDpt:'',
                                        TraeType:'',
                                        LongTime:true,
                                        PlanType:'',
                                        Tasktype:''
                                    }
                    }
                })
        }
    }
}
</script>


<style lang="stylus" scoped>
    .weui-cell_select
        padding: 0 15px
    .weui-select
        padding-left:0
    .re-valid-err
        box-shadow: inset -2px 0px 0px 0px #f70000
        border-radius :0
        width: 99%
</style>

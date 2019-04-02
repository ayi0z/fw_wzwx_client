<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">车牌号</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.CarNo" placeholder="请输入车牌号" />
                    </div>
                </div>
                <div class="weui-cell weui-cells_form">
                    <div class="weui-cell__hd">
                        <label class="weui-label">品名</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.MartiralName" placeholder="请输入品名" />
                    </div>
                </div>
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__hd">
                        <label class="weui-label">发货单位</label>
                    </div>
                    <div class="weui-cell__bd">
                        <select class="weui-select" v-empty-class="'weui-empty'" v-model="form.OutDpt">
                            <option value="">请选择发货单位</option>
                            <option  v-for="unit in datas.units" :key="unit.value" :value="unit.value">{{unit.text}}</option>
                        </select>
                    </div>
                </div>
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__hd">
                        <label class="weui-label">收货单位</label>
                    </div>
                    <div class="weui-cell__bd">
                        <select class="weui-select" v-empty-class="'weui-empty'" v-model="form.InDpt">
                            <option value="">请选择收货单位</option>
                            <option  v-for="unit in datas.units" :key="unit.value" :value="unit.value">{{unit.text}}</option>
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
export default {
    name:'PlanReport',
    data:function(){
        return{
            datas:{
                weighruls:[
                    {
                        value:1,
                        label:'一车一皮'
                    },{
                        value:2,
                        label:'日皮'
                    },{
                        value:3,
                        label:'班皮'
                    },{
                        value:4,
                        label:'周皮'
                    }
                ],
                units:[]
            },
            form:{
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
    },
    created(){
        this.$axios.get(this.$api.ws_units)
            .then((res)=>{
                if(res.data.code == 0){
                    this.datas.units = res.data.content
                }
            })
    },
    methods:{
        doSave(){
            console.log(this.form)
            this.$axios.post(this.$api.ws_carplan, {...this.form})
                .then(res=>{
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
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
</style>

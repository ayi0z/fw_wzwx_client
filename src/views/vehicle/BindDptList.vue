<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells__title" v-if="indpts && indpts.length">收货单位：</div>
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" v-for="dpt in indpts"  :key="dpt.单位" :for="'ch'+dpt.单位+dpt.单位类型">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" :value="dpt" v-model="checkedunits" :id="'ch'+dpt.单位+dpt.单位类型"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>{{dpt.单位}}</p>
                    </div>
                    <div class="weui-cell__ft">
                        <p>{{dpt.单位类型}}</p>
                    </div>
                </label> 
            </div>
            <div class="weui-cells__title" v-if="outdpts && outdpts.length">发货单位：</div>
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" v-for="dpt in outdpts"  :key="dpt.单位" :for="'ch'+dpt.单位+dpt.单位类型">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" :value="dpt" v-model="checkedunits" :id="'ch'+dpt.单位+dpt.单位类型"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>{{dpt.单位}}</p>
                    </div>
                    <div class="weui-cell__ft">
                        <p>{{dpt.单位类型}}</p>
                    </div>
                </label> 
            </div>
            <load-tip :datas="datas"></load-tip>
            <btn-tab-bar :buttons="btns"></btn-tab-bar>
        </div>
    </div>
</template>

<script>
import ListLoadTip from '@/components/ListLoadTip'
import BtnTabBar from '@/components/BtnTabBar'
export default {
    name:'bindlist',
    components:{
        "load-tip":ListLoadTip,
        "btn-tab-bar":BtnTabBar
    },
    data: function(){
        return{
            checkedunits:[],
            datas:[],
            btns:[
                {
                    text:'立即解绑',
                    action:()=>{
                        this.doUnbind()
                    }
                }
            ]
        }
    },
    computed:{
        indpts(){
            return this.datas.filter(c=>c.单位类型 === '收货单位')
        },
        outdpts(){
            return this.datas.filter(c=>c.单位类型 === '发货单位')
        }
    },
    created(){
        this.doLoadData()
    },
    methods:{
        doLoadData(){
            this.$axios.get(this.$api.ws_mydpts)
                .then((res) => {
                    if(res.data.code == 0){
                        this.datas = res.data.content
                    }
                })
        },
        doUnbind(){
            if(!this.checkedunits.length){
                this.$weui.topTips('请选择解绑单位')
                return
            }
            this.$axios.delete(this.$api.ws_dpts, { data:{ dpts:this.checkedunits } })
                .then((res) => {
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.checkedunits = []
                    }
                    this.doLoadData()
                })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .carno-checkbox
        background-color: #e4e4e4;
        box-shadow: 0px 0px 12px 0px #2c3235
    .weui-cell:before
        border-top none
    .weui-cells 
        margin-top 0
</style>

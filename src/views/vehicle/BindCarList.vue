<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells__title">我绑定的车牌号：</div>
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" v-for="(da,index) in datas"  :key="index" :for="'ch'+index">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" :value="da" v-model="checkedlist" :id="'ch'+index"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>{{da}}</p>
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
    name: "BindMartiralList",
    components:{
        "load-tip":ListLoadTip,
         "btn-tab-bar":BtnTabBar
    },
    data: function(){
        return {
            datas:[],
            checkedlist:[],
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
    mounted(){
        this.doLoadCars()
    },
    methods:{
        doLoadCars(){
            this.$axios.get(this.$api.ws_mycars)
                .then((res) => {
                    if(res.data.code == 0){
                        this.datas = res.data.content
                    }
                })
        },
        doUnbind(){
            if(!this.checkedlist || this.checkedlist.length==0){
              this.$weui.topTips('请选择要解绑的车牌号')
              return
            }
            this.$axios.delete(this.$api.ws_mycars, { 
                data:{ carno: this.checkedlist }
             }).then((res) => {
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.checkedlist = []
                        this.doLoadCars()
                    }
                })
        }
    }
};
</script>

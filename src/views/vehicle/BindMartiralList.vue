<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells__title">我绑定的品名：</div>
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" v-for="(da,index) in datas"  :key="index" :for="'ch'+index">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" :value="da" v-model="checkedmartirals" :id="'ch'+index"/>
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
            checkedmartirals:[],
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
        this.doLoadMartirals()
    },
    methods:{
        doLoadMartirals(){
            this.$axios.get(this.$api.ws_mymartiral)
                .then((res) => {
                    if(res.data.code == 0){
                        this.datas = res.data.content
                    }
                })
        },
        doUnbind(){
            if(!this.checkedmartirals || this.checkedmartirals.length==0){
              this.$weui.topTips('请选择要解绑的品名')
              return
            }
            this.$axios.delete(this.$api.ws_martiral, { 
                data:{ martiral: this.checkedmartirals }
             }).then((res) => {
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.checkedmartirals = []
                        this.doLoadMartirals()
                    }
                })
        }
    }
};
</script>

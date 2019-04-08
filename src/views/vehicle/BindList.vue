<template>
    <div class="page">
        <div class="page__bd">
            <template v-for="data in datas">
                <div class="weui-cells weui-cells_checkbox" :key="'c'+data.Key">
                    <label class="weui-cell weui-check__label carno-checkbox" :for="'ch'+data.Key">
                        <div class="weui-cell__hd">
                            <input type="checkbox" class="weui-check" disabled :value="data.Key" v-model="checkedcarnos" :id="'ch'+data.Key"/>
                            <i class="weui-icon-checked"></i>
                        </div>
                        <div class="weui-cell__bd">
                            <p>车牌号【{{data.Key}}】</p>
                        </div>
                    </label> 
                    <label class="weui-cell weui-check__label" v-for="unit in data.g"  :key="'d'+data.Key+unit.业务单位" :for="'ch'+data.Key+unit.业务单位+unit.单位类型+'gch'">
                        <div class="weui-cell__hd">
                            <input type="checkbox" class="weui-check" :value="unit" v-model="checkedunits" :id="'ch'+data.Key+unit.业务单位+unit.单位类型+'gch'" @change="doCheckChecked(data.Key)"/>
                            <i class="weui-icon-checked"></i>
                        </div>
                        <div class="weui-cell__bd">
                            <p>{{unit.业务单位}}</p>
                        </div>
                        <div class="weui-cell__ft">
                            <p>{{unit.单位类型}}</p>
                        </div>
                    </label> 
                </div>
            </template>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" v-show="checkedunits.length>0" href="javascript:" @click="doUnbind">立即解绑</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'bindlist',
    data: function(){
        return{
            checkedcarnos:[],
            checkedunits:[],
            datas:[]
        }
    },
    created(){
        this.doLoadData()
    },
    methods:{
        doLoadData(){
            this.$axios.get(this.$api.ws_carnodpts)
                .then((res) => {
                    if(res.data.code == 0){
                        this.datas = res.data.content
                    }
                })
        },
        doCheckChecked(key){
            const unchecked = document.querySelector(`[id$=gch][id^=ch${key}]:not(:checked)`)
            if(unchecked){
                const index = this.checkedcarnos.indexOf(key)
                if(index>-1){
                    this.checkedcarnos.splice(index,1)
                }
            }else{
                if(this.checkedcarnos.indexOf(key) == -1){
                    this.checkedcarnos.push(key)
                }
            }
        },
        doUnbind(){
            if(!this.checkedunits.length){
                this.$weui.topTips('请选择解绑单位')
                return
            }
            this.$axios.delete(this.$api.ws_carnodpts, { data:{ carnos:this.checkedcarnos, dpts:this.checkedunits } })
                .then((res) => {
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
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
        box-shadow: 0px 0px 12px 0px #2c3235;
    .weui-cell:before
        border-top none
    .weui-cells 
        margin-top 0
</style>

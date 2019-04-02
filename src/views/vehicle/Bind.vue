<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells__title">绑定车牌号:</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">车牌号</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.车号" v-re-valid required placeholder="请输入车牌号">
                    </div>
                </div>
            </div>
            <div class="weui-cells__title">选择单位类型：</div>
            <div class="weui-cells">
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__bd">
                        <select class="weui-select" v-empty-class="'weui-empty'" v-re-valid required
                                v-model="form.单位类型" @change="doLoadUnits">
                            <option value="">请选择业务单位类型</option>
                            <option v-for="type in unittypes" :key="type.value" :value="type.value">{{type.text}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="weui-cells__title">选择业务单位：</div>
            <div class="weui-cells">
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__bd">
                        <select class="weui-select" v-empty-class="'weui-empty'" v-re-valid required v-model="form.业务单位">
                            <option value="">请选择业务单位</option>
                            <option v-for="unit in units" :key="unit.value" :value="unit.value">{{unit.text}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="doSave">立即绑定</a>
            </div>
        </div>
    </div>
</template>

<script>
import { unittypes } from '@/config'
export default {
    name: "bind",
    data: function(){
        return {
            units:[],
            unittypes:unittypes,
            form:{
                车号:'',
                业务单位:'',
                单位类型:''
            }
        }
    },
    mounted(){

        if(!this.form.单位类型){
            this.units = []
            this.form.单位类型 = ''
            return
        }

        this.doLoadUnits()
    },
    methods:{
        doLoadUnits(){
            this.$axios.get(this.$api.ws_units, {
                params:{
                    utype: this.form.单位类型
                },
                data: { utype: this.form.单位类型}
            }).then((res) => {
                    if(res.data.code == 0){
                        this.units = res.data.content
                    }
                })
        },
        doSave(){
            if(!this.isReValidPassed()){
              this.$weui.topTips('请检查红色标记数据是否正确')
              return
            }
            this.$axios.post(this.$api.ws_units, { 
                carno: this.form.车号,
                unit: this.form.业务单位,
                utype: this.form.单位类型
             })
                .then((res) => {
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.form ={
                                        车号:'',
                                        业务单位:'',
                                        单位类型:''
                                    }
                    }
                })
        }
    }
};
</script>
<style lang="stylus" scoped>
    .re-valid-err
        box-shadow: inset -2px 0px 0px 0px #f70000
        border-radius :0
        width: 99%
</style>

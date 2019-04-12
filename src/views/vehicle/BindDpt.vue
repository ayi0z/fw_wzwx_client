<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells__title">绑定业务单位</div>
            <div class="weui-cells__title">选择单位类型：</div>
            <div class="weui-cells">
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__bd">
                        <we-select v-empty-class="'weui-empty'" v-re-valid required placeholder="请选择业务单位类型"
                            v-model="form.单位类型" :options="unittypes.map(c=>c.text)" @change="doChangeUType"></we-select>
                    </div>
                </div>
            </div>
            <div class="weui-cells__title">选择业务单位：</div>
            <div class="weui-cells">
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__bd">
                        <we-input-select placeholder="请选择业务单位" v-empty-class="'weui-empty'" v-re-valid required v-model="form.业务单位"
                            @inputchange="doInputLoad" :options="units.map(c=>c.名称)" ></we-input-select>
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
import WePickerSelect from '@/components/WePickerSelect'
import WePickerInputSelect from '@/components/WePickerInputSelect'
export default {
    name: "bind",
    components:{
        'we-select':WePickerSelect,
        'we-input-select':WePickerInputSelect
    },
    data: function(){
        return {
            units:[],
            unittypes:unittypes,
            form:{
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
        doInputLoad(exp){
            this.doLoadUnits(exp)
        },
        doChangeUType(){
            this.doLoadUnits()
        },
        doLoadUnits(exp){
            exp = exp || ''
            if(this.form.单位类型){
                this.$axios.get(this.$api.ws_dpts, {
                    params:{
                        utype: this.form.单位类型,
                        py: exp
                    },
                    data: { utype: this.form.单位类型, py: exp}
                }).then((res) => {
                        if(res.data.code == 0){
                            this.units = res.data.content
                        }
                    })
            }
        },
        doSave(){
            if(!this.isReValidPassed()){
              this.$weui.topTips('请检查红色标记数据是否正确')
              return
            }
            this.$axios.post(this.$api.ws_dpts, { 
                unit: this.form.业务单位,
                utype: this.form.单位类型
             }).then((res) => {
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.form ={
                                        业务单位:''
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
    .v-select
        .dropdown-toggle
            border:none
    .v-select >> .open-indicator
        opacity:0
</style>

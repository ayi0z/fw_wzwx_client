<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells__title">绑定车牌号+业务单位</div>
            <div class="weui-cells__title">绑定车牌号:</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">车牌号</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.车号" readonly @focus="onfocus" v-re-valid required placeholder="请输入车牌号" @click="popcarkeyboard=true">
                    </div>
                </div>
            </div>
            <div class="weui-cells__title">选择单位类型：</div>
            <div class="weui-cells">
                <div class="weui-cell weui-cell_select">
                    <div class="weui-cell__bd">
                        <we-select v-empty-class="'weui-empty'" v-re-valid required placeholder="请选择业务单位类型"
                            v-model="form.单位类型" :options="unittypes.map(c=>c.text)" @change="doLoadUnits"></we-select>
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
        <key-board :propshowing="popcarkeyboard" @close="(v)=>{popcarkeyboard = v}" v-model="form.车号"></key-board>
    </div>
</template>

<script>
import { unittypes } from '@/config'
import WePickerSelect from '@/components/WePickerSelect'
import WePickerInputSelect from '@/components/WePickerInputSelect'
import KeyBoard from '@/components/KeyBoard'
export default {
    name: "bind",
    components:{
        'we-select':WePickerSelect,
        'we-input-select':WePickerInputSelect,
        'key-board': KeyBoard
    },
    data: function(){
        return {
            popcarkeyboard:false,
            units:[],
            unittypes:unittypes,
            unitexp:'',
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
        onfocus(targ){
            targ.target.blur()
        },
        doInputLoad(exp){
            this.unitexp = exp
            this.doLoadUnits()
        },
        doLoadUnits(){
            this.unitexp = this.unitexp || ''
            if(this.form.单位类型){
                this.$axios.get(this.$api.ws_dpts, {
                    params:{
                        utype: this.form.单位类型,
                        py: this.unitexp
                    },
                    data: { utype: this.form.单位类型, py: this.unitexp}
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
            this.$axios.post(this.$api.ws_carnodpts, { 
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
    .v-select
        .dropdown-toggle
            border:none
    .v-select >> .open-indicator
        opacity:0
</style>

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
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-re-valid required v-model="form.业务单位" placeholder="请输入业务单位" />
                    </div>
                    <div class="weui-cell__ft">
                        <button class="weui-vcode-btn" @click="doPictDpt">选择</button>
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="doSave">立即绑定</a>
            </div>
        </div>
        <bind-dpt-list ref="dptlistpanel"></bind-dpt-list>
    </div>
</template>

<script>
import { unittypes } from '@/config'
import WePickerSelect from '@/components/WePickerSelect'
import weuiExt from '@/plugins/weuiExt/weuiExt.js'
import BindDptListSlot from '@/views/vehicle/BindDptListSlot.vue'
export default {
    name: "bind",
    components:{
        'we-select':WePickerSelect,
        'bind-dpt-list':BindDptListSlot
    },
    data: function(){
        return {
            unittypes:unittypes,
            showpicker:false,
            inputPicker:{
                inputext:'',
                options:[]
            },
            form:{
                业务单位:'',
                单位类型:''
            }
        }
    },
    mounted(){
        if(!this.form.单位类型){
            this.inputPicker.options = []
            this.form.单位类型 = ''
            return
        }

        this.doLoadUnits()
    },
    methods:{
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
                            this.inputPicker.options = res.data.content.map(c=>c.名称)
                            if(this.PICKER) this.PICKER.ReLoadDatas(this.inputPicker.options)
                        }
                    })
            }
        },
        doPictDpt(){
            const self = this
            this.PICKER = weuiExt.inputPicker(self.inputPicker.options, {
                    onConfirm: result => {
                        self.form.业务单位 = result ? (result[0] ? result[0].value : self.form.业务单位) : self.form.业务单位
                    },
                    onInputChange:exp=>{
                        self.inputPicker.inputext = exp
                        self.PICKER.loading(true)
                        self.doLoadUnits(exp)
                    },
                    onClose:()=>{
                        self.PICKER = false
                    }
                });
            this.PICKER.RenderInputText(this.inputPicker.inputext)
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
                        this.form ={ 业务单位:'' }
                        this.inputPicker.options = []
                        this.inputPicker.inputext = ''
                        this.$refs.dptlistpanel.doLoadData()
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

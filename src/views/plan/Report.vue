<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__hd">
                        <label class="weui-label">车牌号</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-re-valid maxlengthcn="7" minlengthcn="7" required v-model="form.CarNo" placeholder="请输入车牌号" readonly @focus="onfocus" @click="popcarkeyboard=true" />
                    </div>
                    <div class="weui-cell__ft">
                        <button class="weui-vcode-btn" @click="doPickCarNo">选择</button>
                    </div>
                </div>
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__hd">
                        <label class="weui-label">品名</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-re-valid required v-model="form.MartiralName" placeholder="请输入品名" />
                    </div>
                    <div class="weui-cell__ft">
                        <button class="weui-vcode-btn" @click="doPickMartiral">选择</button>
                    </div>
                </div>
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__hd">
                        <label class="weui-label">发货单位</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-re-valid required v-model="form.OutDpt" placeholder="请输入发货单位" />
                    </div>
                    <div class="weui-cell__ft">
                        <button class="weui-vcode-btn" @click="doPickOutdpt">选择</button>
                    </div>
                </div>
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__hd">
                        <label class="weui-label">收货单位</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-re-valid required v-model="form.InDpt" placeholder="请输入收货单位" />
                    </div>
                    <div class="weui-cell__ft">
                        <button class="weui-vcode-btn" @click="doPickIndpt">选择</button>
                    </div>
                </div>
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__hd">
                        <label class="weui-label">缴款单位</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.PayDpt" placeholder="请输入缴款单位" />
                    </div>
                    <div class="weui-cell__ft">
                        <button class="weui-vcode-btn" @click="doPickPaydpt">选择</button>
                    </div>
                </div>
            </div>
            <div class="weui-cells__title">皮重规则（单选）:</div>
            <div class="weui-cells weui-cells_radio">
                <label class="weui-cell weui-check__label" v-for="rule in datas.weighruls" :key="rule.value" :for="rule.value">
                    <div class="weui-cell__bd" :class="rule.value!=1 ? 'disabled-color':''">
                        <p>{{rule.label}}</p>
                    </div>
                    <div class="weui-cell__ft">
                        <input type="radio" class="weui-check" :disabled="rule.value!=1" :value="rule.value" v-model="form.TraeType" :id="rule.value">
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
        <key-board :propshowing="popcarkeyboard" @close="(v)=>{popcarkeyboard = v}" v-model="form.CarNo"></key-board>
    </div>
</template>

<script>
import { weighruls } from '@/config'
import KeyBoard from '@/components/KeyBoard'
export default {
    name:'PlanReport',
    components:{
        'key-board': KeyBoard
    },
    data:function(){
        return{
            popcarkeyboard:false,
            datas:{
                weighruls:weighruls,
                martirals:[],
                carnos:[],
                mydpts: []
            },
            form:{
                CarNo:'',
                MartiralName:'',
                OutDpt:'',
                InDpt:'',
                PayDpt:'',
                TraeType:'1',
                LongTime:false,
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
                if(mydpts.data.code == 0){
                    vm.datas.mydpts = mydpts.data.content || []
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
            return this.datas.mydpts ? this.datas.mydpts.filter(c=>c.单位类型 == '收货单位') : []
        },
        outunits(){
            return this.datas.mydpts ? this.datas.mydpts.filter(c=>c.单位类型 == '发货单位') : []
        },
        payunits(){
            return this.datas.mydpts ? this.datas.mydpts.filter(c=>c.单位类型 == '缴款单位') : []
        }
    },
    methods:{
        onfocus(targ){
            targ.target.blur()
        },
        doPickCarNo(){
            this._doPick(this.datas.carnos, result => (this.form.CarNo = result ? (result[0] ? result[0].value : this.form.CarNo) : this.form.CarNo))
        },
        doPickMartiral(){
            this._doPick(this.datas.martirals, result => (this.form.MartiralName = result ? (result[0] ? result[0].value : this.form.MartiralName) : this.form.MartiralName))
        },
        doPickIndpt(){
            this._doPick(this.inunits.map(c=>c.单位) , result => (this.form.InDpt = result ? (result[0] ? result[0].value : this.form.InDpt) : this.form.InDpt))
        },
        doPickOutdpt(){
            this._doPick(this.outunits.map(c=>c.单位) , result => (this.form.OutDpt = result ? (result[0] ? result[0].value : this.form.OutDpt) : this.form.OutDpt))
        },
        doPickPaydpt(){
            this._doPick(this.payunits.map(c=>c.单位) , result => (this.form.PayDpt = result ? (result[0] ? result[0].value : this.form.PayDpt) : this.form.PayDpt))
        },
        _doPick(opts, onconfirm){
            this.$weui.picker(opts,{
                onConfirm: onconfirm
            })
        },
        _AttachDpts(dpt, dpttype){
            if(dpt){
                let dpts = this.datas.mydpts || []
                if(dpts.findIndex(c=> c.单位类型===dpttype && c.单位===dpt) === -1){
                    this.datas.mydpts.push({'单位':dpt, '单位类型':dpttype})
                }
            }
        },
        doSave(){
            if(!this.isReValidPassed()){
                this.$weui.topTips('请检查红色标记数据是否正确')
                return
            }
            this._AttachDpts(this.form.InDpt, '收货单位')
            this._AttachDpts(this.form.OutDpt, '发货单位')
            this._AttachDpts(this.form.PayDpt, '缴款单位')
            this.$axios.post(this.$api.ws_carplan, {...this.form})
                .then(res=>{
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.form = {
                                        CarNo:'',
                                        MartiralName:'',
                                        OutDpt:'',
                                        InDpt:'',
                                        PayDpt:'',
                                        TraeType:'1',
                                        LongTime:false,
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
    .disabled-color
        color #c3c3c3
</style>

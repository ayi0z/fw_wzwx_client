<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-cells__title">绑定车牌号</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd">
                        <label class="weui-label">车牌号</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="车号" readonly @focus="onfocus" @click="popcarkeyboard=true" v-re-valid required placeholder="请输入车牌号">
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="doSave">立即绑定</a>
            </div>
        </div>
        <bind-car-list ref="carlistpanel" :lp="isLP"></bind-car-list>
        <key-board :propshowing="popcarkeyboard" @close="(v)=>{popcarkeyboard = v}" v-model="车号"></key-board>
    </div>
</template>

<script>
import BindCarListSlot from '@/views/vehicle/BindCarListSlot.vue'
import KeyBoard from '@/components/KeyBoard'
export default {
    name: "bind",
    components:{
        'bind-car-list': BindCarListSlot,
        'key-board': KeyBoard
    },
    data: function(){
        return {
            popcarkeyboard:false,
            车号:''
        }
    },
    computed:{
        isLP(){
            return this.$attrs.islp
        }
    },
    methods:{
        onfocus(targ){
            targ.target.blur()
        },
        doSave(){
            if(!this.isReValidPassed()){
              this.$weui.topTips('请填写车牌号')
              return
            }
            this.$axios.post(this.$api.ws_mycars, { 
                carno: this.车号
             }).then((res) => {
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.车号 = ''
                        this.$refs.carlistpanel.doLoadCars()
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

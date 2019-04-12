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
                        <input class="weui-input" type="text" v-model="车号" v-re-valid required placeholder="请输入车牌号">
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
export default {
    name: "bind",
    data: function(){
        return {
            车号:''
        }
    },
    methods:{
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

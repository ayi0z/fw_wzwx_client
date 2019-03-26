<template>
    <div v-show="showing">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">{{msg}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'success',
    computed:{
        showing(){
            return this.$store.state.SuccessToast.showing
        },
        fadeSecs(){
            return this.$store.state.SuccessToast.secs
        },
        msg(){
            return this.$store.state.SuccessToast.msg
        }
    }
}
</script>

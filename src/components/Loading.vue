<template>
    <div v-show="loading">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-loading weui-icon_toast"></i>
            <p class="weui-toast__content">{{msg}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'loading',
    computed:{
        loading(){
            return this.$store.state.Loading.loading
        },
        msg(){
            return this.$store.state.Loading.msg
        }
    }
}
</script>

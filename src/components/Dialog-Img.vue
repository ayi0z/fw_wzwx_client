<template>
    <div class="js_dialog" v-show="showing">
        <div class="weui-mask"></div>
        <div class="weui-dialog" style="top:26%;right:-29%;left:auto;width: auto;">
            <div class="weui-dialog__bd">
                <img class="img-qrcode" :src="url" :alt="alt">
            </div>
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{alt}}</strong></div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="$emit('close', false)">关闭</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'dialogimg',
    props:['showing', 'alt', 'url']
}
</script>
<style lang="stylus" scoped>
    .weui-dialog__bd
        padding-bottom 0
        padding-top: 1.5em
    .weui-dialog__hd
        padding-top 0
</style>


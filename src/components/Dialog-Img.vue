<template>
    <div class="js_dialog" v-show="showing">
        <div class="weui-mask"></div>
        <div class="weui-dialog" style="top:26%;left:auto;right:3px;width: auto;transform: translate(0%,-50%);-webkit-transform: translate(0%,-50%);">
            <div class="weui-dialog__bd">
                <img class="img-qrcode" :src="url" :alt="alt">
            </div>
            <div class="weui-dialog__hd"><strong class="weui-dialog__title"><span class="dialog-img-texts" v-for="txt in texts" :key="txt">{{txt}}</span></strong></div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="$emit('close', false)">关闭</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'DialogImg',
    props:['showing', 'alt', 'url'],
    computed:{
        texts(){
            return this.alt.split('\n')
        }
    }
}
</script>
<style lang="stylus" scoped>
    .weui-dialog__bd
        padding-bottom 0
        padding-top: 1.5em
    .weui-dialog__hd
        padding-top 0
    .dialog-img-texts
        display block
        max-width 8em
        word-wrap: break-word
</style>


<template>
    <div class="js_dialog" v-show="showing">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
            <div class="weui-dialog__bd">
                {{msg}}
            </div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="$emit('cancel')">取消</a>
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="$emit('confirm')">确定</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'menuedit',
    props:['showing', 'title', 'msg']
}
</script>

<style lang="stylus" scoped>

</style>


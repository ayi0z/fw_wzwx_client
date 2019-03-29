<template>
<div class="page">
    <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-warn weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">操作失败</h2>
            <div class="err-info">
                <p class="weui-msg__desc">代码：{{code}}</p>
                <p class="weui-msg__desc">信息：{{msg}}</p>
            </div>
        </div>
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
                <a href="javascript:history.back();" class="weui-btn weui-btn_primary">返回</a>
            </p>
        </div>
    </div>
</div>
</template>
<script>

export default {
  name: 'warn',
  props:['msg', 'code']
}
</script>

<style lang="stylus" scoped>
    .err-info
        text-align: left;
        height: 100px;
        overflow-y: auto;
    .weui-msg__desc
        font-size: 12px
</style>
<template>
    <div class="weui-tabbar">
        <p class="weui-tabbar__item weui-bar__item_on" v-for="(btn,index) in buttons" :key="index">
            <span style="display: inline-block;position: relative;">
                <a class="weui-btn weui-btn_primary" :class="btn.classnames" href="javascript:" @click="btn.action">{{btn.text}}</a>
            </span>
        </p>
    </div>
</template>
<script>
export default {
    name:'BtnTabBar',
    props:{
        buttons:{
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .weui-tabbar
        position: fixed
    .weui-btn_primary
        margin .5em auto
        line-height 2em
    .weui-tabbar__item
        padding auto
    .weui-tabbar
        background-color #fff
</style>

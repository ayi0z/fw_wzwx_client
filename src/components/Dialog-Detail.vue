<template>
    <div class="js_dialog" v-show="showing">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__bd">
                <table>
                    <tr v-for="(value,key,index) in dataself" :key="index">
                        <td>{{key}}</td>
                        <td>{{value}}</td>
                    </tr>
                </table>
            </div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="$emit('close', false)">关闭</a>
                <a href="javascript:;" v-for="btn in btns" :key="btn.text"
                    class="weui-dialog__btn" :class="btn.class" @click="btn.onclick">{{btn.text}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'DialogDetail',
    data:function(){
        return {
            dataself:null
        }
    },
    props:{
        showing:{
            type: Boolean,
            default: false
        },
        data:Object,
        before:{
            type: Function,
            default: null
        },
        /**
         * example:
         * btns:[
         *      {
         *          text:'确认',
         *          class:'weui-dialog__btn_primary',
         *          onclick: ()=>{ ... }
         *      }
         * ]
         * 
         */
        btns:{
            type: Array,
            default:null
        }
    },
    watch:{
        data(){
            this.dataself = {...this.data}
            if(this.before){
                this.before(this.dataself)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    .weui-dialog
        width: 100%
        height 99%
        max-height: 99%
    .weui-dialog__bd
        padding-bottom 0
        padding-top: 1.5em
        overflow auto
        height 90%
    .weui-dialog__bd:first-child
        padding: .2em
    table
        font-size 12px
        padding 5px
        width 100%
        text-align: left;
    table
        tr 
            td
                background-color #e8e8e8
                padding 0px 5px
        tr
            :first-child
                width: 6em;
</style>


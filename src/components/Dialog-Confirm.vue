<template>
    <div class="js_dialog" v-show="showing">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
            <div class="weui-dialog__bd">
                {{msg}}
                <input class="weui-input" v-if="inputholder" v-model="inputdata" type="text" v-re-valid required :placeholder="inputholder"/>
            </div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="$emit('cancel')">取消</a>
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="docomfirm">确定</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'menuedit',
    data(){
        return { inputdata:'' }
    },
    props:['showing', 'title', 'msg', 'inputholder'],
    methods:{
        docomfirm(){
            if(this.inputholder){
                if(this.inputdata){ this.$emit('confirm', this.inputdata) }
                else {this.$weui.topTips(this.inputholder)}
            }else if(!this.inputholder){
                this.$emit('confirm')
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
 .weui-input
    text-align center
 .re-valid-err
    box-shadow: 0px 1px 0px 0px #f70000;
</style>


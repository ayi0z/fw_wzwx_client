<template>
    <div class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">{{displaytext}}</span>
    </div>
</template>
<script>
export default {
    name:'ListLoadTip',
    props:{
        datas:{
            type: [Array,Object],
            default(){
                return []
            }
        },
        emptymsg:{
            type: String,
            default: '暂无数据'
        },
        nomoremsg:{
            type: String,
            default: '已经到底啦'
        }
    },
    computed:{
        displaytext(){
            const dataType = Object.prototype.toString.call(this.datas)
            if(dataType == '[object Object]'){
                return this.datas ? this.nomoremsg : this.emptymsg
            }else if(dataType == '[object Array]'){
                return this.datas && this.datas.length ? this.nomoremsg : this.emptymsg
            }
            return "不知道有啥"
        }
    }
}
</script>

<style lang="stylus" scoped>
    .weui-loadmore_line
        margin-bottom: 3.5em
</style>

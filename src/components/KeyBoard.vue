<template>
    <div class="keyboard">
        <div class="weui-picker kb-picker" :class="pickerclass">
            <div class="weui-picker__hd">
                <span :style="{color:warncolor}">{{warningmsg}}</span>
                <a href="javascript:;" class="weui-picker__action" @click="close">关闭</a>
            </div>
            <div class="weui-picker__bd kb-picker-body">
                <ul class="kb-picker__bd" v-for="(ct,index) in citems" :key="'l'+index">
                    <li v-for="(c,idx) in ct" :key="'I'+idx" @click="tapinput(c)"
                        :class="c.class">{{c.txt || c}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"KeyBoard",
    data(){
        return {
            showing:true,
            isCartTmodel:true,
            warningmsg:'',
            warncolor:'',
            values:[],
            cartxt:[
                ['京','沪','浙','苏','粤','鲁','晋','冀','豫'],
                ['川','渝','辽','吉','黑','皖','鄂','津','贵'],
                ['云','桂','琼','青','新','藏','蒙','宁','甘'],
                ['陕','闽','赣','湘','武钢', {txt:'删除',class:'kb-picker-btn'}]
            ],
            chartxt:[
                ['0','1','2','3','4','5','6','7','8','9'],
                ['Q','W','E','R','T','Y','U','P'],
                ['A','S','D','F','G','H','J','K','L'],
                [{txt:'清除',class:'kb-picker-btn'}, 'Z','X','C','V','B','N','M', {txt:'删除',class:'kb-picker-btn'}]
            ]
        }
    },
    props:{
        propshowing:{
            type: Boolean,
            default: true
        },
        value:String
    },
    created(){
        this.showing = this.propshowing
    },
    watch:{
        propshowing(nv){
            this.showing = nv
            this.values = this.value.split('')
            this.isCartTmodel = this.values.length === 0
        },
        values(nv){
            let len = nv.join('').length
            this.warningmsg = len == 7 ? '车牌号长度正确' : '请输入7位车牌号'
            this.warncolor = len == 7 ? '#4dab43' : '#fb0000'
        }
    },
    computed:{
        pickerclass(){
            return this.showing ? 'kb-picker-showing' : 'kb-picker-hide'
        },
        citems(){
            return this.isCartTmodel ? this.cartxt : this.chartxt
        }
    },
    methods:{
        close(){
            this.showing = false
            this.$emit('close', false)
        },
        tapinput(da){
            if(da.txt){
                if(da.txt === '删除'){
                    this.values.pop()
                    this.isCartTmodel = this.values.length === 0
                }else if(da.txt == '清除'){
                    this.values = []
                    this.isCartTmodel = true
                }
            }else{
                if(this.isCartTmodel){
                    this.values = []
                }
                if(this.values.join('').length < 7){
                    this.values.push(da)
                }
                this.isCartTmodel = false
            }
            // this.checkno()
            this.$emit('input', this.values.join(''))
        },
        checkno(){
            let len = this.values.join('').length
            this.warningmsg = len == 7 ? '车牌号正确' : '请输入7位车牌号'
            this.warncolor = len == 7 ? '#4dab43' : '#fb0000'
        }
    }
}
</script>

<style lang="stylus" scoped>
    .weui-picker__bd
        display inherit
    .kb-picker-showing
        box-shadow 0px 0px 20px 0px #2a2e5a
        animation slideUp ease .3s forwards
    .kb-picker-hide
        box-shadow none
        animation slideDown ease .3s forwards
    .kb-picker-body
        background-color #d5dade
    .kb-picker__bd 
        display flex
        justify-content center
        align-items center
        margin .2rem
        list-style none
        text-align left 
        position relative
        max-width: 25.4rem;
        li
            display inline-block
            margin .15rem
            width 2.5rem
            height 2.5rem
            line-height 2.5rem
            text-align center
            box-shadow 1px 1px 3px 0px #9a9a9a
            border-radius .2rem
            background-color #fff
        .kb-picker-btn
            border-radius .3rem
            width 4rem
            background-color #949fb7
        li:active
            background-color #b1c4d8
</style>


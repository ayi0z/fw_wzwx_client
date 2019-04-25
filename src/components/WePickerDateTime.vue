<template>
    <div class="weui-select" style="box-sizing:border-box;" @click="doClick">
        {{displaytext}}
    </div>
</template>

<script>
import weuiExt from '@/plugins/weuiExt/weuiExt.js'
export default {
    name:'WePickerDatTime',
    data(){
        return{
            PICKER:null,
            today: new Date()
        }
    },
    computed:{
        displaytext(){
            return this.value ? this.value : this.placeholder
        }
    },
    model:{
        prop:"value",
        event:"change"
    },
    props:{
        value:String,
        placeholder:String
    },
    methods:{
        doClick(){
            var dvalue = new Date(this.value)
            const toyear = this.today.getFullYear()
            this.Picker = weuiExt.datetimePicker({
                start: toyear-1,
                end: toyear,
                defaultValue: [dvalue.getFullYear(), dvalue.getMonth()+1, dvalue.getDate(), 
                               dvalue.getHours(), dvalue.getMinutes(), dvalue.getSeconds()],
                onChange: result => {
                    this.doChange(result)
                },
                onClose:()=>{
                    this.Picker = null
                },
                id: 'wepickerdatetime'
            })
        },
        doChange(result){
            this.$emit("change", `${result[0].value}-${result[1].value}-${result[2].value} ${result[3].value}:${result[4].value}:${result[5].value}`)
        }
    }
}
</script>
<style lang="stylus">
    .wpis-loading
        position absolute
        width 100%
        height 100%
        background-color rgba(0, 0, 0, 0.62)
        z-index 99999
        text-align center
    .weui-icon_toast.weui-loading
        margin-top 25%
    .wpis-loading-hide
        display none
</style>

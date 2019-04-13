<template>
    <div class="weui-select" style="box-sizing:border-box;" @click="doClick">
        {{displaytext}}
    </div>
</template>

<script>
import weuiExt from '@/plugins/weuiExt/weuiExt.js'
export default {
    name:'WePickerInputSelect',
    data(){
        return{
            inputext:'',
            PICKER:null 
        }
    },
    computed:{
        displaytext(){
            const nopts = this._doFormatOptions()
            const copt = nopts.find(c=>c.value == this.value)
            return copt ? copt.label : this.placeholder
        }
    },
    model:{
        prop:"value",
        event:"change"
    },
    props:{
        options:{
            type:Array,
            default(){
                return []
            }
        },
        value:String,
        placeholder:String
    },
    watch:{
        options(){
            if(this.PICKER){
                this.PICKER.ReLoadDatas(this.options)
            }else{
                this.inputext = ''
            }

            const nopts = this._doFormatOptions()
            const copt = nopts.find(c=>c.value == this.value)
            if(!copt){ this.doChange() }
        }
    },
    methods:{
        _doFormatOptions(){
            const tpl = {label:'', value:''}
            const otype = ['[object String]','[object Number]','[object Date]']
            const nopts = this.options.map(c=>{
                const dtype = Object.prototype.toString.call(c)
                if(otype.indexOf(dtype)>-1){
                    return {label:c, value:c}
                }else if(dtype == '[object Object]'){
                    return {...tpl, ...c}
                }
                return c
            })
            return nopts
        },
        doClick(){
            this.PICKER = weuiExt.inputPicker(this.options, {
                    onConfirm: result => {
                        this.doChange(result)
                    },
                    onInputChange:exp=>{
                        this.inputext = exp
                        if(this.$listeners.inputchange){
                            this.PICKER.loading(true)
                            this.$emit("inputchange", exp)
                        }
                    },
                    onClose:()=>{
                        this.PICKER = false
                    }
                });
            
            this.PICKER.RenderInputText(this.inputext)
        },
        doChange(value){
            const nvalue = value ? (value[0] ? value[0].value : value) : ''
            if(this.value != nvalue){
                this.$emit("change", nvalue)
            }
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

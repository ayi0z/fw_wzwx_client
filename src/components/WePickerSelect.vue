<template>
    <div class="weui-select" style="box-sizing:border-box;" @click="doClick">
        {{displaytext}}
    </div>
</template>

<script>
export default {
    name:'WePickerSelect',
    computed:{
        displaytext(){
            const nopts = this._doFormatOptions()
            const copt = nopts.find(c=>c.value == this.value)
            if(!copt){ this.doConfirm() }
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
                return [{label:'选择我', value:''}]
            }
        },
        value:String,
        placeholder:String
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
            this.$weui.picker(this.options, {
                onConfirm: result => {
                    this.doConfirm(result)
                }
            });
        },
        doConfirm(value){
            const nvalue = value ? (value[0] ? value[0].value : value) : ''
            if(this.value != nvalue){
                this.$emit("change", nvalue)
            }
        }
    }
}
</script>

<template>
    <div class="page">
        <div class="page__bd">
            <template v-for="(data,index) in datas">
                <div class="weui-cells__title" :key="index+'c'">车牌号【{{data.车号}}】：</div>
                <div class="weui-cells weui-cells_checkbox" :key="index">
                    <label class="weui-cell weui-check__label" v-for="unit in data.units"  :key="'ch'+unit.id+unit.业务单位" :for="'ch'+unit.id+unit.业务单位">
                        <div class="weui-cell__hd">
                            <input type="checkbox" class="weui-check" :value="unit.id" v-model="checkedvalues" :id="'ch'+unit.id+unit.业务单位"/>
                            <i class="weui-icon-checked"></i>
                        </div>
                        <div class="weui-cell__bd">
                            <p>{{unit.业务单位}}</p>
                        </div>
                    </label> 
                </div>
            </template>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="doUnbind">立即解绑</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'bindlist',
    components:{
    },
    data: function(){
        return{
            checkedvalues:[],
            datas:[]
        }
    },
    created(){
        this.$axios.get(this.$api.vehicle_bindlist)
            .then((res) => {
                console.log(res)
                if(res.data.code == 0){
                    this.datas = res.data.content
                }
            })
    },
    methods:{
        doUnbind(){
            console.log(...this.checkedvalues)
            if(!this.checkedvalues.length){
                this.$weui.topTips('请选择解绑单位')
                return
            }
            this.$axios.post(this.$api.vehicle_unbind)
            .then((res) => {
                console.log(res)
                this.$store.dispatch('success', true)
            })
        }
    }
}
</script>

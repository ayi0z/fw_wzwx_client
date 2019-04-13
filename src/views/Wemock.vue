<template>
    <div>
        <div class="weui-cells__title">微信菜单如果模拟</div>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;"
               v-for="(value,key,index) in menus" :key="index"  @click="gourl(value)">
                <div class="weui-cell__bd">
                    <p>{{key}}</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
        </div>
    </div>
</template>
<script>
import { menu_targets } from '@/config.js'
export default {
    data(){
       return { menus:menu_targets }
    },
    methods:{
        gourl(url){
            this.$router.replace({path:url})
        }
    }
}
</script>


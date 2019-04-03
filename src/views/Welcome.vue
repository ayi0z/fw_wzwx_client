<template>
    <div>正在初始化界面,请稍后...</div>
</template>

<script>
import Vue from 'vue'
export default {
    name:'welcome',
    created(){
        this.$axios.get('config.json',{baseURL:'./'})
            .then(res=>{
                const { api, menu_targets } = res.data
                this.$axios.defaults.baseURL = api.baseurl
                Vue.prototype.$api = api
                Vue.prototype.$menu_targets = menu_targets
                Vue.prototype.$hasInit = true
                this.$router.replace(this.$route.query.redirect_url || '/mock')
            })
    }
}
</script>

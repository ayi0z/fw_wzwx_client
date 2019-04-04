<template>
    <div>
        <img src="@/assets/logo.png" alt="">
        <div class="init">正在初始化...</div>
    </div>
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
<style lang="stylus" scoped>
    img
        width 100%
    .init
        bottom: 0;
        position: absolute;
        margin: auto auto 50% auto;
        width: 100%;
        text-align: center;
        color: #98a5a5;
        font-size: 18px;
        text-shadow: 0px 19px 20px #47c5ff;
</style>

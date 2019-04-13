<template>
    <div>
        <img src="@/assets/logo.png" alt="">
        <div class="init">{{msg}}</div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    name:'welcome',
    data(){
        return {
            msg:'正在初始化...'
        }
    },
    created(){
        this.$axios.get('config.json',{baseURL:'./'})
                    .then(res=>{
                        const { api } = res.data
                        this.$axios.defaults.baseURL = api.baseurl
                        Vue.prototype.$api = api
                        Vue.prototype.$hasInit = true
                        this.msg = "初始化成功"
                        this.$router.replace(this.$route.query.redirect_url || '/warn/404/页面不存在')
                    })
                    .catch(()=>{
                        this.msg = "初始化配置读取失败"
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

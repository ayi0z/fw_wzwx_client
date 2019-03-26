<template>
 <div class="page">
    <div class="page__bd">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">身份证</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-re-valid="{regexp:/^\d{17}[0-9Xx]|\d{15}$/}" v-model="form.身份证" placeholder="请输入身份证"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">邮箱</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-re-valid="{regexp:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-])+\.([a-zA-Z]{2,4})$/}" v-model="form.邮箱" placeholder="请输入邮箱"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机号</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" v-re-valid="{regexp:/^1[34578]\d{9}$/}" v-model="form.手机号" placeholder="请输入手机号"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">用户类型</label>
                </div>
                <div class="weui-cell__bd">
                   <select v-re-valid="{regexp:/^1|2|3$/}" v-model="form.用户类型" class="weui-select" v-empty-class="'weui-empty'">
                        <option selected value=''>请选择用户类型</option>
                        <option value="1">司机</option>
                        <option value="2">物流管理员</option>
                        <option value="3">计量管理员</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="weui-cells weui-cells_form" v-if="isNeedPwd">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">用户名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-re-valid required v-model="form.user_account" placeholder="请输入用户名"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" v-re-valid="{regexp: /^[0-9a-zA-Z_\-]{4,16}$/ }" v-model="form.user_pwd" placeholder="请输入密码"/>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="doregister">注册</a>
        </div>
    </div>
</div>
</template>

<script>
import { api } from '@/config'
export default {
  name: 'reg',
  data: function () {
    return {
      form:{
        user_account: '',
        user_pwd: '',
        身份证:'',
        邮箱:'',
        手机号:'',
        用户类型:''
      }
    }
  },
  computed:{
    isNeedPwd(){
      return this.form.用户类型 == '2' || this.form.用户类型 == '3'
    }
  },
  methods: {
    doregister: function(){
      // if(!this.isReValidPassed()){
      //   this.$weui.topTips('请检查红色标记数据是否正确')
      //   return
      // }
      this.$axios.post(api.user_reg, { ...this.form })
        .then((res) => {
          if(res.data.code == 0){
            this.$store.dispatch('update_user', res.data.content)
            let tourl = this.$route.query.redirect_url || '/'
            this.$router.replace(tourl)
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .weui-input{
    border-radius : 0
  }
  .weui-select
    padding-left:0
    height: auto
    line-height: initial
    border-radius: 0
</style>


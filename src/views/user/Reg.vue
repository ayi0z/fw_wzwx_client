<template>
 <div class="page">
    <div class="page__bd">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机号</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" v-re-valid="{regexp:/^1[34578]\d{9}$/}" v-model="form.手机号" placeholder="请输入手机号"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">用户类型</label>
                </div>
                <div class="weui-cell__bd">
                   <select v-re-valid required v-model="form.类型" class="weui-select" v-empty-class="'weui-empty'">
                        <option selected value=''>请选择用户类型</option>
                        <option v-for="role in datas.roles" :key="role.id" :value="role.name">{{role.name}}</option>
                    </select>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">身份证</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="form.身份证" placeholder="请输入身份证"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">邮箱</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="email" v-model="form.邮箱" placeholder="请输入邮箱"/>
                </div>
            </div>
        </div>
        <div class="weui-cells weui-cells_form" v-if="isNeedPwd">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">用户名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-re-valid required v-model="form.用户名" placeholder="请输入用户名"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" v-re-valid="{regexp: /^[0-9a-zA-Z_\-]{4,16}$/ }" v-model="form.密码" placeholder="请输入密码"/>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="doregister">提交</a>
            <a class="weui-btn weui-btn_warn" v-if="this.layot.utype" href="javascript:" @click="dologoff">注销</a>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'reg',
  data: function () {
    return {
      form:{
        身份证:'',
        邮箱:'',
        手机号:'',
        类型:'',
        用户名: '',
        密码: ''
      },
      datas:{
        roles:[]
      },
      layot:{
        utype:''
      }
    }
  },
  computed:{
    isNeedPwd(){
      return this.form.类型 == '物流管理员' || this.form.类型 == '计量管理员'
    }
  },
  created(){
    this.$axios.get(this.$api.wechat_tags).then(res=>{
          if(res.data.code == 0){
            if(res.data.content){
              this.datas.roles = res.data.content.tags.filter(c=>c.name != "星标组")
            }
          }
        })
    this.$axios.get(this.$api.user+'/'+this.$store.state.userToken.openid).then(res=>{
          if(res.data.code == 0){
            if(res.data.content){
              this.form = res.data.content
              this.layot.utype = this.form.类型
            }
          }
        })
  },
  methods: {
    doregister: function(){
      if(!this.isReValidPassed()){
        this.$weui.topTips('请检查红色标记数据是否正确')
        return
      }
      this.$axios.post(this.$api.user, { 
          ...this.form
        }).then((res) => {
            if(res.data.code == 0){
              this.$store.dispatch('success', true)
              this.$store.dispatch('update_usertoken', res.data.content)
              let tourl = this.$route.query.redirect_url || '/user/reg'
              this.$router.replace(tourl)
            }
          })
    },
    dologoff: function(){
      this.$axios.delete(this.$api.user).then((res) => {
            if(res.data.code == 0){
              this.$store.dispatch('success', true)
              this.$store.dispatch('clear_usertoken')
              this.layot.utype = ''
              this.$router.replace('/user/reg')
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


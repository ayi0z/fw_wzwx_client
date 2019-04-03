<template>
<div class="page">
    <div class="page__bd">
        <article class="weui-article">
            <section>
                <p v-for="(value,key,index) in da" :key="index">
                    <span>{{key}}：</span>{{value}}
                </p>
            </section>
        </article>
    </div>
    <div class="weui-msg">
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
                <a href="javascript:;" class="weui-btn weui-btn_warn" @click="doDel(da.过磅申请号)">删除</a>
                <a href="javascript:history.back();" class="weui-btn weui-btn_primary">返回</a>
            </p>
        </div>
    </div>
    <dialog-confirm :showing="dialog.showing" :title="dialog.title" :msg="dialog.msg" @cancel="dialog.cancel" @confirm="dialog.confirm"></dialog-confirm>
</div>
</template>
<script>
import DialogConfirm from '@/components/Dialog-Confirm'
import { tasktype } from "@/config";
export default {
  name: 'PlanDetail',
  components:{
    'dialog-confirm': DialogConfirm
  },
  props:['id'],
  data(){
      return {
            a:null,
            dialog:{
                showing:false,
                title:'郑重提醒',
                msg:'',
                cancel:() => this.dialog.showing = false,
                confirm:()=>console.log('confirm')
            }
      }
  },
  created(){
      this.da = this.$store.state.carplan_detail
      this.da.任务类型 = this.seeVal(tasktype, this.da.任务类型)
  },
  methods:{
        seeVal(obj, key){
            try {
                return new Function('da', 'return da.'+key)(obj)
            } catch (error) {
                return undefined
            }
        },
        doConfirmDel(id){
            this.$axios.delete(this.$api.ws_carplan,{data:{PlanId:id}})
                .then((res) => {
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        history.back()
                    }
                })
            this.dialog.showing = false
        },
        doDel(id){
          if(id){
                this.dialog.msg = '此操作将删除该过磅委托，且不可恢复。是否确认删除？'
                this.dialog.confirm = () => { this.doConfirmDel(id) } 
                this.dialog.showing = true
          }
      }
  }
}
</script>

<style lang="stylus" scoped>
    .weui-msg
        text-align : left 
</style>

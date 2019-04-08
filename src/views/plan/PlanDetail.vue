<template>
<div class="page">
    <div class="page__bd">
        <table>
            <tr v-for="(value,key,index) in da" :key="index">
                <td>{{key}}</td>
                <td>{{value}}</td>
            </tr>
        </table>
    </div>
    <p class="weui-btn-area">
        <a href="javascript:;" class="weui-btn weui-btn_warn" @click="doDel(da.过磅申请号)">删除</a>
        <a href="javascript:history.back();" class="weui-btn weui-btn_primary">返回</a>
    </p>
    <dialog-confirm :showing="dialog.showing" :title="dialog.title" :msg="dialog.msg" @cancel="dialog.cancel" @confirm="dialog.confirm"></dialog-confirm>
</div>
</template>
<script>
import DialogConfirm from '@/components/Dialog-Confirm'
import { tasktype, weightype, plantype } from "@/config";
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
      if(this.da){
        this.da.任务类型 = tasktype[this.da.任务类型]
        this.da.过磅类型 = weightype[`C${this.da.过磅类型}`]
        this.da.委托类型 = plantype[`C${this.da.委托类型}`]
        this.da.处理标识 = this.da.处理标识 ? "已处理" : "未处理"
        this.da.长期有效 = this.da.长期有效 ? "是" : "否"
      }
  },
  methods:{
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
    table
        font-size:12px
        padding:5px
        width: 100%
    table
        tr 
            td
                background-color: #e8e8e8;
                padding: 0px 5px;
</style>

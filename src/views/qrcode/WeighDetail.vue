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
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="doQrCode(da.车号, da.过磅申请号)">生成二维码</a>
        <a href="javascript:history.back();" class="weui-btn weui-btn_primary">返回</a>
    </p>
    <qr-dialog v-show="qrcode.showing" :url="qrcode.url" :alt="qrcode.alt" @close="(va) => {qrcode.showing=va}"></qr-dialog>
</div>
</template>
<script>
import QrDialog from '@/components/Dialog-Img'
import { tasktype, weightype } from "@/config";
export default {
  name: 'WeighDetail',
  components:{
    'qr-dialog': QrDialog
  },
  data(){
      return {
            da:null,
            dialog:{
                showing:false,
                title:'郑重提醒',
                msg:'',
                cancel:() => this.dialog.showing = false,
                confirm:()=>console.log('confirm')
            },
            qrcode:{
                showing:false,
                url:'',
                alt:''
            }
      }
  },
  created(){
      this.da = this.$store.state.weigh_detail
      this.da.任务类型 = tasktype[this.da.任务类型]
      this.da.过磅类型 = weightype[`C${this.da.过磅类型}`]
      this.da.是否缴款 = this.da.处理标识 ? "已缴款" : "未缴款"
      this.da.是否开票 = this.da.是否开票 ? "已开票" : "未开票"
  },
  methods:{
        doQrCode(cno, id){
            this.$axios.post(this.$api.ws_qrcode, {enstr:`${cno}^^^${id}`})
                .then(res=>{
                    if(res.data.code == 0){
                        this.qrcode.showing = true
                        this.qrcode.alt = `${cno} ${id}`
                        this.qrcode.url = `data:image/jpeg;base64,${res.data.content}`
                    }
                })
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

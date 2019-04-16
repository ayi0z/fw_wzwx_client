<template>
    <div class="page">
            <div class="page__bd">
                <div class="weui-panel search-bar" :class="searchBar.focus_searchBar ? 'search-bar-focus':''">
                    <div class="weui-panel__bd">
                        <div class="weui-search-bar" :class="searchBar.focus_searchBar ? 'weui-search-bar_focusing':''">
                            <form class="weui-search-bar__form">
                                <div class="weui-search-bar__box">
                                    <a href="javascript:;" class="weui-btn weui-btn_default weui-search-bar__input" @click="doSearch">点击搜索</a>
                                </div>
                                <label class="weui-search-bar__label" @click="searchBar.focus_searchBar = !searchBar.focus_searchBar">
                                    <i class="weui-icon-search"></i>
                                    <span>点击设置搜索条件</span>
                                </label>
                            </form>
                            <a href="javascript:" class="weui-search-bar__cancel-btn" @click="searchBar.focus_searchBar = false">取消</a>
                        </div>
                        <div class="weui-cells searchbar-result" v-show="searchBar.focus_searchBar">
                            <div class="weui-cells">
                                <div class="weui-cell">
                                    <div class="weui-cell__hd"><label class="weui-label">单位类型</label></div>
                                    <div class="weui-cell__bd">
                                        <we-select v-empty-class="'weui-empty'" placeholder="请选择业务单位类型"
                                            v-model="query.DptType" :options="searchBar.unittypes.map(c=>c.text)" @change="doUTypeChange"></we-select>
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cells">
                                <div class="weui-cell">
                                    <div class="weui-cell__hd"><label class="weui-label">业务单位</label></div>
                                    <div class="weui-cell__bd">
                                        <select class="weui-select" v-empty-class="'weui-empty'" v-model="query.Dpt">
                                            <option selected value=''>请选择业务单位</option>
                                            <option v-for="(dpt,index) in dptsoptions" :key="index" :value="dpt.单位">{{dpt.单位}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    <label class="weui-label">开始时间</label>
                                </div>
                                <div class="weui-cell__bd">
                                    <input class="weui-input" v-empty-class="'weui-empty'" type="date" v-model="query.BgDT"/>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    <label class="weui-label">结束时间</label>
                                </div>
                                <div class="weui-cell__bd">
                                    <input class="weui-input" v-empty-class="'weui-empty'" type="date" v-model="query.EdDT"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="search-result">
                    <div class="weui-cells" v-for="da in datas" :key="da.过磅申请号">
                        <div class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">过磅申请号</label></div>
                            <div class="weui-cell__bd">
                            {{da.过磅申请号}}    
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">过磅品名</label></div>
                            <div class="weui-cell__bd">
                            {{da.品名}}    
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">发货单位</label>
                            </div>
                            <div class="weui-cell__bd">
                                {{da.发货单位}}
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <label class="weui-label">收货单位</label>
                            </div>
                            <div class="weui-cell__bd">
                                {{da.收货单位}}
                            </div>
                        </div>
                        <div class="weui-panel__ft">
                            <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link"
                                @click="doViewDetail(da)">
                                <div class="weui-cell__bd">点击查看详情</div>
                                <span class="weui-cell__ft"></span>
                            </a>
                        </div>
                        <div class="weui-panel__ft">
                            <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link"
                                @click="doSetCarNo(da)">
                                <div class="weui-cell__bd">点击设置车号</div>
                                <span class="weui-cell__ft">当前车号:{{da.车号 || '无'}}</span>
                            </a>
                        </div>
                        <div class="weui-panel__ft">
                            <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link"
                                @click="doQrCode(da)">
                                <div class="weui-cell__bd">生成二维码</div>
                                <span class="weui-cell__ft"></span>
                            </a>
                        </div>
                    </div>
                </div>
                <load-tip :datas="datas"></load-tip>
                <qr-dialog v-show="qrcode.showing" :url="qrcode.url" :alt="qrcode.alt" @close="(va) => {qrcode.showing=va}"></qr-dialog>
                <detail-dialog  v-show="detail.showing" :data="detail.data" :before="doDialogDetailBefore"  @close="()=>{detail.showing = false}"></detail-dialog>
            </div>
        </div>
</template>

<script>
import QrDialog from '@/components/Dialog-Img'
import DetailDialog from '@/components/Dialog-Detail'
import ListLoadTip from '@/components/ListLoadTip'
import WePickerSelect from '@/components/WePickerSelect'
import { tasktype,unittypes,weightype,plantype } from "@/config";
export default {
    name:'QrPlan',
    components:{
        'qr-dialog': QrDialog,
        "load-tip":ListLoadTip,
        'detail-dialog': DetailDialog,
        'we-select':WePickerSelect
    },
    data(){
        return {
            searchBar:{
                focus_searchBar: false,
                unittypes,
                mydpts:[]
            },
            query:{
                querytype: 1,
                Dpt:'',
                DptType:'',
                BgDT:this.$util.DateFilter(new Date(), -2),
                EdDT:this.$util.DateFilter(new Date())
            },
            detail:{
                showing:false,
                data:null
            },
            qrcode:{
                showing:false,
                url:'',
                alt:''
            },
            form:{
                mycarnos:null
            },
            datas:[]
        }
    },
    computed:{
        dptsoptions(){
            return this.query.DptType ? this.searchBar.mydpts.filter(c=>c.单位类型 === this.query.DptType) : []
        }
    },
    created(){
        this.$axios.get(this.$api.ws_mydpts)
            .then(res=>{
                if(res.data.code == 0){
                    this.searchBar.mydpts = res.data.content
                }
            })
    },
    methods: {
        doUTypeChange(){
            this.query.Dpt = ''
        },
        doSearch(){
            if(!this.query.DptType){
                this.$weui.topTips('请设置单位类型') 
                return
            }
            if(!this.query.Dpt){
                this.$weui.topTips('请设置单位')
                return
            }
            this.$axios.get(this.$api.ws_carplan, {params:this.query})
                .then(res=>{
                    if(res.data.code == 0){
                        this.searchBar.focus_searchBar = false
                        this.datas = res.data.content
                    }
                })
        },
        doDialogDetailBefore(da){
            if(da){
                da.任务类型 = tasktype[da.任务类型] || da.任务类型
                da.过磅类型 = weightype[`C${da.过磅类型}`] || da.过磅类型
                da.委托类型 = plantype[`C${da.委托类型}`] || da.委托类型 
                da.处理标识 = da.处理标识 ? "已处理" : "未处理"
                da.长期有效 = da.长期有效 ? "是" : "否"
            }
        },
        doViewDetail(da){
            this.detail.showing = true
            this.detail.data = da
        },
        doSetCarNo(da, callback){
            if(!this.form.mycarnos || this.form.mycarnos.length == 0){
                this.$axios.get(this.$api.ws_mycars)
                    .then((res)=>{
                        if(res.data.code == 0){
                            this.form.mycarnos = res.data.content
                            this._doShowCarNoPicker(da, callback)
                        }
                    })
            }else{
                this._doShowCarNoPicker(da, callback)
            }
        },
        _doShowCarNoPicker(da, callback){
            this.$weui.picker(this.form.mycarnos,{
                onConfirm: result =>{
                    da.车号 = result ? (result[0] ? result[0].value : da.车号) : da.车号
                    if(callback){
                        callback(da)
                    }
                }
            })
        },
        doQrCode(da){
            const cno = da.车号, id = da.过磅申请号
            if(!id){
                this.$weui.topTips('缺少过磅申请号')
                return
            }
            if(!cno){
                this.doSetCarNo(da, this.doQrCode)
                return
            }
            this.$axios.post(this.$api.ws_qrcode, {enstr:`${cno}^^^${id}`})
                .then(res=>{
                    if(res.data.code == 0){
                        this.qrcode.showing = true
                        this.qrcode.alt = `${cno}\n${id}`
                        this.qrcode.url = `data:image/jpeg;base64,${res.data.content}`
                    }
                })
        }
    }
}
</script>


<style lang="stylus" scoped>
    .search-bar
        position: fixed;
        z-index: 100;
        width: 100%;
        top:0
    .search-bar-focus
        box-shadow: 0 0 17px 0px #4a4a4a;
    .weui-select
        padding-left:0
        height: auto
        line-height: initial
    .search-result-panel
        margin-top: 45px
        z-index:1
    .weui-search-bar__input
        text-align:center
    .weui-search-bar__box
        padding:0
    .weui-tab__panel
        padding-bottom:0
    .page__bd
        margin-top:45px
    .searchbar-result
        margin-top:0
        padding-bottom:30px
    .searchbar-result .weui-cells
        margin-top:0
    .search-result
        .weui-cells
            font-size:12px
            line-height 1em
            .weui-cell .weui-cell__hd
                width 7em
        
</style>
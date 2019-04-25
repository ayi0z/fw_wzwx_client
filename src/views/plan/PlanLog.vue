<template>
    <div class="page">
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
                    <div class="weui-tab" v-if="isQueryByCarNoOrDpt">
                        <div class="weui-navbar">
                            <div class="weui-navbar__item" @click="doChangeQueryType(0)"
                                :class="query.querytype==0 ? 'weui-bar__item_on':''">
                                按车牌
                            </div>
                            <div class="weui-navbar__item" @click="doChangeQueryType(1)"
                                :class="query.querytype==1 ? 'weui-bar__item_on':''">
                                按单位
                            </div>
                        </div>
                        <div class="weui-tab__panel">
                            <div class="weui-cells" v-show="query.querytype == 0">
                                <div class="weui-cell">
                                    <div class="weui-cell__hd"><label class="weui-label">车牌号</label></div>
                                    <div class="weui-cell__bd">
                                        <select class="weui-select" v-empty-class="'weui-empty'" v-model="query.CarNo">
                                            <option selected value=''>请选择车牌号</option>
                                            <option v-for="car in carnos" :key="car" :value="car">{{car}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cells" v-show="query.querytype == 1">
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        <label class="weui-label">单位类型</label>
                                    </div>
                                    <div class="weui-cell__bd">
                                        <select class="weui-select" v-empty-class="'weui-empty'" v-model="query.DptType">
                                            <option selected value=''>请选择单位类型</option>
                                            <option v-for="type in searchBar.unittypes" :key="type.value" :value="type.text">{{type.text}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        <label class="weui-label">业务单位</label>
                                    </div>
                                    <div class="weui-cell__bd">
                                        <select class="weui-select" v-empty-class="'weui-empty'" v-model="query.Dpt">
                                            <option selected value=''>请选择业务单位</option>
                                            <option v-for="unit in dpts" :key="unit.单位" :value="unit.单位">{{unit.单位}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="weui-cell" v-else>
                        <div class="weui-cell__hd">
                            <label class="weui-label">车牌号</label>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" placeholder="请输入车牌号" type="text" v-model="query.CarNo"/>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">开始时间</label>
                        </div>
                        <div class="weui-cell__bd">
                            <we-picker-datetime v-model="query.BgDT" id='planlogbgdt'></we-picker-datetime>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">结束时间</label>
                        </div>
                        <div class="weui-cell__bd">
                            <we-picker-datetime v-model="query.EdDT" id='planlogeddt'></we-picker-datetime>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_switch">
                        <div class="weui-cell__bd">仅查询未使用计划</div>
                        <div class="weui-cell__ft">
                            <input class="weui-switch" v-model="query.filter" type="checkbox"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page__bd">
            <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:;"
                    v-for="da in datas" :key="da.过磅申请号" @click="doViewDetail(da)">
                    <div class="weui-cell__bd">
                        <p>{{da.过磅申请时间}}</p>
                    </div>
                    <div class="weui-cell__ft">{{da.车号}}</div>
                </a>
            </div>
            <load-tip :datas="datas"></load-tip>
        </div>
        <detail-dialog  v-show="detail.showing" :data="detail.data" :btns="detail.btns" :before="doDialogDetailBefore" @close="()=>{detail.showing = false;dialogcfm.showing = false}"></detail-dialog>
        <dialog-confirm :showing="dialogcfm.showing" :title="dialogcfm.title" :msg="dialogcfm.msg" @cancel="dialogcfm.cancel" @confirm="dialogcfm.confirm"></dialog-confirm>
    </div>
</template>

<script>
import DetailDialog from '@/components/Dialog-Detail'
import DialogConfirm from '@/components/Dialog-Confirm'
import ListLoadTip from '@/components/ListLoadTip'
import WePickerDateTime from '@/components/WePickerDateTime'
import { unittypes, tasktype, weightype, plantype } from '@/config'
export default {
    name: 'PlanLog',
    components:{
        "load-tip":ListLoadTip,
        'detail-dialog': DetailDialog,
        'dialog-confirm': DialogConfirm,
        'we-picker-datetime': WePickerDateTime
    },
    data(){
        return {
            searchBar:{
                focus_searchBar: false,
                unittypes: unittypes,
                units:[]
            },
            query:{
                querytype: 0,
                CarNo:'',
                BgDT:`${this.$util.DateFilter(new Date(), -2)} 00:00:00`,
                EdDT:`${this.$util.DateFilter(new Date())} 23:59:59`,
                Dpt:'',
                DptType:'',
                IsAll: true,
                filter: true
            },
            detail:{
                showing:false,
                data:null,
                btns:[
                    {
                        text:'删除',
                        class:'weui-btn_warn',
                        onclick:this.doDelPlan
                    }
                ]
            },
            dialogcfm:{
                showing:false,
                title:'郑重提醒',
                msg:'',
                cancel:() => this.dialogcfm.showing = false,
                confirm:()=>console.log('confirm')
            },
            datas:[]
        }
    },
    created(){
        if(this.isQueryByCarNoOrDpt){
            if(!this.$store.state.mycarnos || this.$store.state.mycarnos.length == 0){
                this.$axios.get(this.$api.ws_mycars)
                    .then((res)=>{
                        if(res.data.code == 0){
                            this.$store.dispatch("mycarnos", res.data.content)
                        }
                    })
            }
            if(!this.$store.state.mydpts || this.$store.state.mydpts.length == 0){
                this.$axios.get(this.$api.ws_mydpts)
                    .then((res)=>{
                        if(res.data.code == 0){
                            this.$store.dispatch("mydpts", res.data.content)
                        }
                    })
            }
        }
    },
    computed:{
        isQueryByCarNoOrDpt(){
            return !(this.$attrs.isWithCusCarNo || false)
        },
        carnos(){
            return this.$store.state.mycarnos;
        },
        dpts(){
            return this.$store.state.mydpts ? this.$store.state.mydpts.filter(c=>c.单位类型 == this.query.DptType) : []
        }
    },
    methods:{
        doDelPlan(){
            if(this.detail.data){
                this.dialogcfm.msg = '此操作将删除该计量委托，且不可恢复。是否确认删除？'
                this.dialogcfm.confirm = () => { this.doConfirmDel(this.detail.data) } 
                this.dialogcfm.showing = true
            }
        },
        doConfirmDel(da){
            this.$axios.delete(this.$api.ws_carplan,{data:{PlanId:da.过磅申请号}})
                .then((res) => {
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.detail.showing = false
                        this.detail.data = null
                        this.dialogcfm.showing = false
                        this.doSearch()
                    }
                })
        },
        doChangeQueryType(type){
            this.query.querytype = type
        },
        doSearch(){
            this.query.IsAll = !this.query.filter
            this.$axios.get(this.$api.ws_carplan, {params: this.query})
                .then((res)=>{
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
    .page__bd
        margin-top: 2.7em;
        z-index:1
    .searchbar-result
        margin-top:0
        padding-bottom:30px
    .weui-search-bar__input
        text-align:center
    .weui-search-bar__box
        padding:0
    .weui-tab__panel
        padding-bottom:0
    .searchbar-result .weui-cells
        margin-top:0
</style>

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
                            <div class="weui-cell weui-cell_switch">
                                <div class="weui-cell__bd">只显示未开票记录</div>
                                <div class="weui-cell__ft">
                                    <input class="weui-switch" v-model="query.filter" type="checkbox"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="weui-cells">
                    <a class="weui-cell weui-cell_access" href="javascript:;"
                        v-for="da in datas" :key="da.Id" @click="doViewDetail(da)">
                        <div class="weui-cell__bd">
                            <p>{{da.No}} {{da.业务状态}}</p>
                        </div>
                        <div class="weui-cell__ft">{{da.执行状态}}</div>
                    </a>
                </div>
                <load-tip :datas="datas"></load-tip>
                <detail-dialog  v-show="detail.showing" :data="detail.data" :before="doDialogDetailBefore" :btns="detail.btns" @close="()=>{detail.showing = false}"></detail-dialog>
            </div>
        </div>
</template>

<script>
import DetailDialog from '@/components/Dialog-Detail'
import ListLoadTip from '@/components/ListLoadTip'
import { tasktype } from "@/config";
export default {
    name:'WeighLogWithCar',
    components:{
        "load-tip":ListLoadTip,
        'detail-dialog': DetailDialog
    },
    data(){
        return {
            searchBar:{
                focus_searchBar: false
            },
            query:{
                BgDT:this.$util.DateFilter(new Date(), -2),
                EdDT:this.$util.DateFilter(new Date()),
                IsAll: true,
                filter: true
            },
            detail:{
                showing:false,
                data:null,
                btns:[
                    {
                        text:'不通过',
                        class:'weui-btn_warn',
                        onclick: this.doTaskConfirm
                    },{
                        text:'通过',
                        onclick: this.doTaskConfirm
                    }
                ]
            },
            datas:[]
        }
    },
    methods: {
        doSearch(){
            this.query.IsAll = !this.query.filter
            this.$axios.get(this.$api.ws_task, {params:this.query})
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
                da.是否缴款 = da.是否缴款 ? "已缴款" : "未缴款"
                da.是否开票 = da.是否开票 ? "已开票" : "未开票"
            }
        },
        doViewDetail(da){
            this.detail.showing = true
            this.detail.data = da
        },
        doTaskConfirm(){
            console.log(this.detail.data)
            this.$weui.topTips('此功能即将上线')
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
</style>
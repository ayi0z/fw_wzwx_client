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
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">开始时间</label>
                        </div>
                        <div class="weui-cell__bd">
                            <we-picker-datetime v-model="query.BgDT" id='paydetailbgdt'></we-picker-datetime>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">结束时间</label>
                        </div>
                        <div class="weui-cell__bd">
                            <we-picker-datetime v-model="query.EdDT" id='paydetaileddt'></we-picker-datetime>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page__bd">
            <div class="weui-panel search-result-panel">
                <div class="weui-panel__bd">
                    <div class="weui-footer" v-if="!form.datas || form.datas.length===0">
                        <p class="weui-footer__text">未检索到数据</p>
                    </div>
                    <div class="weui-cells__title" v-if="form.datas && form.datas.length>0">我的缴费记录：</div>
                    <div class="weui-cells">
                        <label class="weui-cell weui-check__label" v-for="da in form.datas" :key="da.Id" :for="da.Id" @click="doShowDetail(da)">
                            <div class="weui-cell__bd">
                                <p class="money">{{da.金额}}</p>
                                <p class="dadesc">{{da.时间}}</p>
                            </div>
                            <div class="weui-cell__ft">
                                <p>{{desc(da)}}</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <detail-dialog v-show="detail.showing" :data="detail.data" @close="()=>{detail.showing = false;}"></detail-dialog>
    </div>
</template>

<script>
import DetailDialog from '@/components/Dialog-Detail'
import WePickerDateTime from '@/components/WePickerDateTime'
export default {
    name:'einvoice',
    components:{
        'detail-dialog': DetailDialog,
        'we-picker-datetime': WePickerDateTime
    },
    data(){
        return {
            searchBar:{
                focus_searchBar: false
            },
            query:{
                BgDT:`${this.$util.DateFilter(new Date(), -2)} 00:00:00`,
                EdDT:`${this.$util.DateFilter(new Date())} 23:59:59`
            },
            form:{
                datas:[]
            },
            detail:{
                showing:false,
                data:null
            }
        }
    },
    mounted(){
        console.log('asdasd')
        this.doSearch()
    },
    methods:{
        desc(da){
            if(da.是否开票){
                return "已开票"
            } else {
                return "未开票"
            }
        },
        doSearch(){
            this.$axios.get(this.$api.ws_einvoice, {params:this.query})
                .then(res=>{
                    if(res.data.code == 0){
                        this.searchBar.focus_searchBar = false
                        this.form.datas = res.data.content
                    }
                })
            
        },
        doShowDetail(da){
            this.detail.showing = true
            this.detail.data = da
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
    .searchbar-result
        margin-top:0
        padding-bottom:30px
    .weui-search-bar__input
        text-align:center
    .weui-search-bar__box
        padding:0
    .weui-dialog__bd
        .weui-cell__bd
            text-align: left
        .weui-cells
            font-size: 12px
            line-height: .8
    .money
        color #c33a3a
    .dadesc
        font-size 0.7rem
        color grey
</style>
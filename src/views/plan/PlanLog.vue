<template>
    <div class="page">
        <div class="weui-panel search-bar" :class="searchBar.focus_searchBar ? 'search-bar-focus':''">
            <div class="weui-panel__bd">
                <div class="weui-search-bar" :class="searchBar.focus_searchBar ? 'weui-search-bar_focusing':''">
                    <form class="weui-search-bar__form">
                        <div class="weui-search-bar__box">
                            <a href="javascript:;" class="weui-btn weui-btn_default weui-search-bar__input" @click="doSearch">搜索</a>
                        </div>
                        <label class="weui-search-bar__label" @click="searchBar.focus_searchBar = !searchBar.focus_searchBar">
                            <i class="weui-icon-search"></i>
                            <span>搜索</span>
                        </label>
                    </form>
                    <a href="javascript:" class="weui-search-bar__cancel-btn" @click="searchBar.focus_searchBar = false">取消</a>
                </div>
                <div class="weui-cells searchbar-result" v-show="searchBar.focus_searchBar">
                    <div class="weui-tab">
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
                                        <select class="weui-select" v-empty-class="'weui-empty'" v-model="query.DptType" @change="doLoadUnits">
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
                                            <option v-for="unit in searchBar.units" :key="unit.value" :value="unit.名称">{{unit.名称}}</option>
                                        </select>
                                    </div>
                                </div>
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
            <div class="weui-panel search-result-panel">
                <div class="weui-panel__bd">

                    <div class="weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;"
                           v-for="da in datas" :key="da.过磅申请号" @click="doViewDetail(da)">
                            <div class="weui-cell__bd">
                                <p>{{da.过磅申请号}}</p>
                            </div>
                            <div class="weui-cell__ft">{{da.车号}}</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { unittypes } from '@/config'
export default {
    name: 'veno',
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
                BgDT:'',
                EdDT:'',
                Dpt:'',
                DptType:'',
                IsAll: true,
                filter: true
            },
            datas:[]
        }
    },
    created(){
        if(!this.$store.state.mycarnos || this.$store.state.mycarnos.length == 0){
            this.$axios.get(this.$api.ws_cars)
                .then((res)=>{
                    if(res.data.code == 0){
                        this.$store.dispatch("mycarnos", res.data.content)
                    }
                })
        }
        
        this.datas = this.$store.state.planlog_datas
    },
    computed:{
        carnos(){
            return this.$store.state.mycarnos;
        }
    },
    methods:{
        doChangeQueryType(type){
            this.query.querytype = type
        },
        doLoadUnits(){
            if(this.query.DptType){
                this.$axios.get(this.$api.ws_units, {params: {utype:this.query.DptType}})
                    .then((res)=>{
                        if(res.data.code == 0){
                            this.searchBar.units = res.data.content
                        }
                    })
            }
        },
        doSearch(){
            this.query.IsAll = !this.query.filter
            this.$axios.get(this.$api.ws_carplan, {params: this.query})
                .then((res)=>{
                    if(res.data.code == 0){
                        this.searchBar.focus_searchBar = false
                        this.datas = res.data.content
                        this.$store.dispatch("planlog_datas", res.data.content)
                    }
                })
        },
        doViewDetail(da){
            this.$store.dispatch("carplan_detail", da)
            this.$router.push({name:'plandetail', params:{id: da.过磅申请号}})
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
    .weui-tab__panel
        padding-bottom:0
    .searchbar-result .weui-cells
        margin-top:0
</style>

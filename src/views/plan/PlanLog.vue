<template>
    <div class="page">
        <div class="weui-panel search-bar" :class="searchBar.focus_searchBar ? 'search-bar-focus':''">
            <div class="weui-panel__bd">
                <div class="weui-search-bar" :class="searchBar.focus_searchBar ? 'weui-search-bar_focusing':''">
                    <form class="weui-search-bar__form">
                        <div class="weui-search-bar__box">
                            <!-- <i class="weui-icon-search"></i> -->
                            <a href="javascript:;" class="weui-btn weui-btn_default weui-search-bar__input" @click="doSearch">搜索</a>
                            <!-- <a href="javascript:" class="weui-icon-clear"></a> -->
                        </div>
                        <label class="weui-search-bar__label" @click="searchBar.focus_searchBar = !searchBar.focus_searchBar">
                            <i class="weui-icon-search"></i>
                            <span>搜索</span>
                        </label>
                    </form>
                    <a href="javascript:" class="weui-search-bar__cancel-btn" @click="searchBar.focus_searchBar = false">取消</a>
                </div>
                <div class="weui-cells searchbar-result" v-show="searchBar.focus_searchBar">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">品名</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" v-model="query.proname" placeholder="输入品名查询"/>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">收货单位</label>
                        </div>
                        <div class="weui-cell__bd">
                        <select class="weui-select" v-empty-class="'weui-empty'" v-model="query.aunit">
                                <option selected value=''>请选择收货单位</option>
                                <option v-for="unit in searchBar.units" :key="unit.value" :value="unit.value">{{unit.text}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">发货单位</label>
                        </div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" v-empty-class="'weui-empty'" v-model="query.bunit">
                                <option selected value=''>请选择发货单位</option>
                                <option v-for="unit in searchBar.units" :key="unit.value" :value="unit.value">{{unit.text}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">开始时间</label>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-empty-class="'weui-empty'" type="date" v-model="query.bdate"/>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">结束时间</label>
                        </div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-empty-class="'weui-empty'" type="date" v-model="query.edate"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page__bd">
            <div class="weui-panel search-result-panel">
                <div class="weui-panel__bd">
                    <div class="weui-media-box weui-media-box_text">
                        <p class="weui-media-box__desc">【品名】收货单位名称</p>
                        <ul class="weui-media-box__info">
                            <li class="weui-media-box__info__meta">2019年3月22日</li>
                            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra weui-cell__ft" @click.self="doViewDetail(1)">查看更多</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'veno',
    data(){
        return {
            searchBar:{
                focus_searchBar: false,
                units:[]
            },
            query:{
                proname:'',
                bdate:'',
                edate:'',
                aunit:'',
                bunit:''
            },
            datas:[]
        }
    },
    created(){
        this.$axios.get(this.$api.ws_unit)
            .then((res)=>{
                if(res.data.code == 0){
                    this.searchBar.units = res.data.content
                }
            })
    },
    methods:{
        doSearch(){
            console.log(this.query)
        },
        doViewDetail(id){
            console.log(id)
            this.$router.push({name:'plandetail', params:{id:'1'}})
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
</style>

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
                        <div class="weui-cell__bd">仅查询未开票记录</div>
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
                    <div class="weui-footer" v-if="!form.datas || form.datas.length===0">
                        <p class="weui-footer__text">未检索到数据</p>
                    </div>
                    <div class="weui-cells__title" v-if="form.datas && form.datas.length>0">选择将要开票的支付记录：</div>
                    <div class="weui-cells weui-cells_checkbox">
                        <label class="weui-cell weui-check__label" v-for="da in form.datas" :key="da.Id" :for="da.Id">
                            <div class="weui-cell__hd">
                                <input type="checkbox" class="weui-check" :value="da.Id" v-model="form.checkedvalues" :id="da.Id"/>
                                <i class="weui-icon-checked"></i>
                            </div>
                            <div class="weui-cell__bd">
                                <p>{{da.过磅申请号}}</p>
                            </div>
                            <div class="weui-cell__ft">
                                <p>{{desc(da)}}</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="js_dialog" v-show="dialogShowing">
                <div class="weui-mask"></div>
                <div class="weui-dialog">
                    <div class="weui-dialog__hd"><strong class="weui-dialog__title">确认开具以下发票？</strong></div>
                    <div class="weui-dialog__bd">
                        <div class="weui-cells">
                            <div class="weui-cell">
                                <div class="weui-cell__bd">
                                    <p>京A88888</p>
                                </div>
                                <div class="weui-cell__ft">2019年3月22日</div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__bd">
                                    <p>京A66666</p>
                                </div>
                                <div class="weui-cell__ft">2019年3月22日</div>
                            </div>
                        </div>
                    </div>
                    <div class="weui-dialog__ft">
                        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="dialogShowing = false">取消</a>
                        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="doSubmit">去开票</a>
                    </div>
                </div>
            </div>
            <div class="weui-btn-area" v-show="form.checkedvalues && form.checkedvalues.length>0">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="dialogShowing = true">提交</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'einvoice',
    data(){
        return {
            searchBar:{
                focus_searchBar: false
            },
            query:{
                IsAll:true,
                BgDT:this.$util.DateFilter(new Date(), -2),
                EdDT:this.$util.DateFilter(new Date()),
                filter: true
            },
            form:{
                checkedvalues:[],
                datas:[]
            },
            dialogShowing:false
        }
    },
    methods:{
        desc(da){
            if(!da.是否缴款){
                return "未缴款"
            } else if(da.是否开票){
                return "已开票"
            } else {
                return "点击开票"
            }
        },
        doSearch(){
            this.query.IsAll = !this.query.filter
            this.$axios.get(this.$api.ws_einvoice, {params:this.query})
                .then(res=>{
                    if(res.data.code == 0){
                        this.searchBar.focus_searchBar = false
                        this.form.datas = res.data.content
                    }
                })
            
        },
        doSubmit(){
            console.log(this.form.checkedvalues)
            // this.$router.push({name:'plandetail', params:{id:'1'}})
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
    .weui-dialog__bd
        .weui-cell__bd
            text-align: left
        .weui-cells
            font-size: 12px
            line-height: .8
</style>
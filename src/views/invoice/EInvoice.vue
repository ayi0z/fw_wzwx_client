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
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">车牌号</label>
                        </div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" v-empty-class="'weui-empty'" v-model="query.No">
                                <option selected value=''>请选择绑定的车辆</option>
                                <option v-for="no in searchBar.Nos" :key="no.Id" :value="no.Id">{{no.车号}}</option>
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
                    <div class="weui-cells__title">选择将要开票的支付记录：</div>
                    <div class="weui-cells weui-cells_checkbox">
                        <label class="weui-cell weui-check__label" for="s11">
                            <div class="weui-cell__hd">
                                <input type="checkbox" class="weui-check" :value="1" v-model="form.checkedvalues" id="s11"/>
                                <i class="weui-icon-checked"></i>
                            </div>
                            <div class="weui-cell__bd">
                                <p>京A88888</p>
                            </div>
                            <div class="weui-cell__ft">
                                <p>2019年3月22日</p>
                            </div>
                        </label>
                        <label class="weui-cell weui-check__label" for="s12">
                            <div class="weui-cell__hd">
                                <input type="checkbox" class="weui-check" :value="2" v-model="form.checkedvalues" id="s12"/>
                                <i class="weui-icon-checked"></i>
                            </div>
                            <div class="weui-cell__bd">
                                <p>京A66666</p>
                            </div>
                            <div class="weui-cell__ft">
                                <p>2019年3月22日</p>
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
                        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="doSave">去开票</a>
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
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
                focus_searchBar: false,
                Nos:[]
            },
            query:{
                No:'',
                bdate:'',
                edate:''
            },
            form:{
                checkedvalues:[]
            },
            dialogShowing:false
        }
    },
    created(){
        this.$axios.get(this.$api.vehicle_nos)
            .then((res)=>{
                if(res.data.code == 0){
                    this.searchBar.Nos = res.data.content
                }
            })
    },
    methods:{
        doSearch(){
            console.log(this.query)
        },
        doSave(){
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
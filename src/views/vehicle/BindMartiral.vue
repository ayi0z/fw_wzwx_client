<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-search-bar search-bar" :class="searchBar.focus_searchBar ? 'weui-search-bar_focusing':''">
                <form class="weui-search-bar__form">
                    <div class="weui-search-bar__box">
                        <i class="weui-icon-search"></i>
                        <input type="search" ref="searchinput" class="weui-search-bar__input" placeholder="在此输入首字母检索" required
                            v-model="searchBar.py" @change="doLoadMartirals"/>
                        <a href="javascript:" class="weui-icon-clear" @click="doSearchBarClear"></a>
                    </div>
                    <label class="weui-search-bar__label" @click="doSearchBarFocus">
                        <i class="weui-icon-search"></i>
                        <span>点击输入首字母检索品名</span>
                    </label>
                </form>
                <a href="javascript:" class="weui-search-bar__cancel-btn" @click="doLoadMartirals">搜索</a>
                <a href="javascript:" class="weui-search-bar__cancel-btn" @click="doSearchBarCancel">取消</a>
            </div>
            <div class="weui-cells weui-cells_checkbox search-result">
                <label class="weui-cell weui-check__label" v-for="da in datas"  :key="da.id" :for="'ch'+da.Id">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" :value="da" v-model="checkedmartirals" :id="'ch'+da.Id"/>
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>{{da.名称}}</p>
                    </div>
                    <div class="weui-cell__ft">
                        <p>{{da.秤量点}}</p>
                    </div>
                </label> 
            </div>
            <load-tip v-show="!hasDatas" :datas="hasDatas" emptymsg="为检索到可绑定品名"></load-tip>
            <div class="weui-btn-area" v-show="hasDatas">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="doSave">立即绑定</a>
            </div>
        </div>
        <bind-martirals-list ref="bindmartirallistpanel"></bind-martirals-list>
    </div>
</template>

<script>
import ListLoadTip from '@/components/ListLoadTip'
// import BtnTabBar from '@/components/BtnTabBar'
import BindMartiralListSlot from '@/views/vehicle/BindMartiralListSlot'
export default {
    name: "BindMartiral",
    components:{
        "load-tip":ListLoadTip,
        //  "btn-tab-bar":BtnTabBar,
         "bind-martirals-list":BindMartiralListSlot
    },
    data: function(){
        return {
            datas:[],
            checkedmartirals:[],
            searchBar:{
                focus_searchBar: false,
                py:''
            }//,
            // btns:[
            //     {
            //         text:'立即绑定',
            //         action:()=>{
            //             this.doSave()
            //         }
            //     }
            // ]
        }
    },
    computed:{
        hasDatas(){
            return this.datas ? this.datas.length > 0 : false
        }
    },
    mounted(){
        this.doLoadMartirals()
    },
    methods:{
        doSearchBarCancel(){
            this.searchBar.focus_searchBar =false
            this.searchBar.py = ''
        },
        doSearchBarFocus(){
            this.searchBar.focus_searchBar = true
            this.$refs.searchinput.focus()
        },
        doSearchBarClear(){
            this.searchBar.py = ''
            this.$refs.searchinput.focus()
        },
        doLoadMartirals(){
            this.checkedmartirals = []
            this.$axios.get(this.$api.ws_martiral, { params:{py: this.searchBar.py}})
                .then((res) => {
                    if(res.data.code == 0){
                        this.datas = res.data.content
                    }
                })
        },
        doSave(){
            if(!this.checkedmartirals || this.checkedmartirals.length==0){
              this.$weui.topTips('请选择绑定的品名')
              return
            }
            this.$axios.post(this.$api.ws_martiral, { 
                martiral: this.checkedmartirals.map(c=>c.名称) 
             }).then((res) => {
                    if(res.data.code == 0){
                        this.$store.dispatch('success', true)
                        this.checkedmartirals = []
                        this.$refs.bindmartirallistpanel.doLoadMartirals()
                    }
                })
        }
    }
};
</script>
<style lang="stylus" scoped>
    .search-bar
        position: fixed;
        z-index: 100;
        width: 100%;
        top:0
    .search-result
        margin-top: 45px
        z-index:1
    .weui-tabbar
        position: fixed
    .weui-btn_primary
        margin .5em auto
        line-height 2em
    .weui-tabbar__item
        padding auto
    .weui-tabbar
        background-color #fff
    .search-result .weui-cell
        padding-top 7px
        padding-bottom 7px
        font-size 14px
</style>

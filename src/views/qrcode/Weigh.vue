<template>
    <div class="page">
            <div class="page__bd">
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
                            <div class="weui-cells">
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
                <div class="weui-footer"  v-if="!datas || datas.length===0">
                    <p class="weui-footer__text">未检索到数据</p>
                </div>
                <div class="weui-cells" v-for="da in datas" :key="da.Id">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">过磅申请号</label></div>
                        <div class="weui-cell__bd">
                          {{da.过磅申请号}}    
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd">
                            <label class="weui-label">车牌号</label>
                        </div>
                        <div class="weui-cell__bd">
                           {{da.车号}}
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
                            @click="doQrCode(da.车号, da.过磅申请号)">
                            <div class="weui-cell__bd">生成二维码</div>
                            <span class="weui-cell__ft"></span>
                        </a>
                    </div>
                </div>
                <qr-dialog v-show="qrcode.showing" :url="qrcode.url" :alt="qrcode.alt" @close="(va) => {qrcode.showing=va}"></qr-dialog>
            </div>
        </div>
</template>

<script>
import QrDialog from '@/components/Dialog-Img'
export default {
    name:'qrweigh',
    data(){
        return {
            searchBar:{
                focus_searchBar: false
            },
            query:{
                CarNo:'',
                BgDT:'',
                EdDT:''
            },
            qrcode:{
                showing:false,
                url:'',
                alt:''
            },
            datas:[]
        }
    },
    components:{
        'qr-dialog': QrDialog
    },
    computed:{
        carnos(){
            return this.$store.state.mycarnos   
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
        this.datas = this.$store.state.myweighs
    },
    methods: {
        doSearch(){
            this.$axios.get(this.$api.ws_mycarplan, {params:this.query})
                .then(res=>{
                    if(res.data.code == 0){
                        this.searchBar.focus_searchBar = false
                        this.$store.dispatch("myweighs", res.data.content)
                        this.datas = res.data.content
                    }
                })
        },
        doQrCode(cno, id){
            this.$axios.post(this.$api.ws_qrcode, {enstr:`${cno}^^^${id}`})
                .then(res=>{
                    if(res.data.code == 0){
                        this.qrcode.showing = true
                        this.qrcode.alt = `${cno} ${id}`
                        this.qrcode.url = `data:image/jpeg;base64,${res.data.content}`
                    }
                })
        },
        doViewDetail(da){
            this.$store.dispatch("weigh_detail", da)
            this.$router.push({name:'weighdetail'})
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
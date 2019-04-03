<template>
    <div>
        <div class="weui-cells__title">微信菜单如果模拟</div>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('userreg')">
                <div class="weui-cell__bd">
                    <p>用户注册</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('bind')">
                <div class="weui-cell__bd">
                    <p>绑定车牌号</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('bindlist')">
                <div class="weui-cell__bd">
                    <p>车号绑定列表</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('veno')">
                <div class="weui-cell__bd">
                    <p>车号二维码</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('weigh')">
                <div class="weui-cell__bd">
                    <p>计量委托二维码</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('planlog')">
                <div class="weui-cell__bd">
                    <p>委托计划查询</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('planreport')">
                <div class="weui-cell__bd">
                    <p>委托申请</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('einvoice')">
                <div class="weui-cell__bd">
                    <p>电子发票</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="gourl('menugroup')">
                <div class="weui-cell__bd">
                    <p>微信菜单管理</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        gourl(url){
            this.$router.replace({name:url})
        }
    }
}
</script>


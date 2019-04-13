<template>
    <div class="js_dialog" v-show="showing">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__bd">
                <div class="weui-cells__title">一级菜单【{{title}}】</div>
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" v-re-valid required minlength="1" maxlength="16" v-model="form.name" placeholder="请输入主菜单名"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_select">
                        <div class="weui-cell__bd">
                            <select class="weui-select" v-re-valid required v-empty-class="'weui-empty'" v-model="form.url">
                                <option value="">请选择链接目标</option>
                                <option v-for="(tar, key) in menu_targets" :key="key" :value="lochref + tar">{{key}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="$emit('del', btn)">删除</a>
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="doConfirm">确定</a>
            </div>
        </div>
    </div>
</template>

<script>
import { menu_targets } from '@/config.js'
export default {
    name:'DialogMenuEdit',
    data(){
        return{
            menu_targets,
            lochref: window.location.origin,
            form:{
                type:'view',
                name:'',
                url:''
            }
        }
    },
    watch:{
        btn(){
            this.form = this.btn
        }
    },
    props:['showing', 'title', 'btn'],
    methods:{
        doConfirm(){
            if(!this.isReValidPassed()){
                this.$weui.topTips('请检查红色标记数据是否正确')
                return
            }
            this.$emit('confirm', this.form, this.btn)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .weui-cells__title
        margin-top: 0
</style>


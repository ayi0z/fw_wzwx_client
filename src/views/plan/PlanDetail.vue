<template>
<div class="page">
    <div class="weui-msg">
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">过磅记录详细信息</h2>
            <p class="weui-msg__desc">
                <article class="weui-article">
                    <h1>大标题</h1>
                    <section>
                        <h2 class="title">章标题</h2>
                        <section>
                            <h3>1.1 节标题</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                        </section>
                    </section>
                </article>
        </div>
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
                <a href="javascript:history.back();" class="weui-btn weui-btn_primary">返回</a>
            </p>
        </div>
    </div>
</div>
</template>
<script>

export default {
  name: 'PlanDetail',
  props:['id']
}
</script>
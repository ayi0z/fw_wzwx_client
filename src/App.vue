<template>
  <div id="app">
    <router-view/>
    <loading></loading>
    <success></success>
  </div>

</template>
<script>
import loading from '@/components/Loading.vue'
import success from '@/components/Success.vue'
export default {
  name:'app',
  components:{
    loading,
    success
  }
}
</script>

<style lang="stylus">

</style>

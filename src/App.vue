<template>
  <div id="app">
    <router-view/>
    <loading></loading>
    <success></success>
    <div>
    </div>
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
  },
  computed:{
    debugs(){
      return this.$store.state.debugs
    }
  }
}
</script>

<style lang="stylus">

</style>

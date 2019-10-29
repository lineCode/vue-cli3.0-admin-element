<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
  import ThisJs from './Log'
  export default {
    data() {
      return {
        msg: '系统日志'
      }
    },
    created () {
      this.ThisJs = new ThisJs(this)
      // this.ThisJs.initSocket()
    },
    mounted () {
    },
  }
</script>

<style lang="scss" scoped>

</style>
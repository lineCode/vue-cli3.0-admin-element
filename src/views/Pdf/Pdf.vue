<template>
  <div>
    <pdf :src="pdfUrl"></pdf>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'
  export default {
    components: {
      pdf
    },
    data() {
      return {
        msg: '预览Pdf',
        pdfUrl: 'https://daishengloda.github.io/review/dist/static/pdf/b1.pdf'
      }
    },
  }
</script>

<style lang="less" scoped>

</style>
<template>
  <div>
    <div class="tinymce-editor">
      <textarea id="init_1" v-model="content_1" />
    </div>
    
    <div>
      <a href="http://tinymce.ax-z.cn/general/basic-setup.php" target="brank">tinymce中文文档</a>
    </div>
    <div>
      <a href="https://www.tiny.cloud/" target="brank">tinymce英文官网</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content_1: 'Tinymce富文本编辑器-基础设置',
        init_1: null
      }
    },
    created () {
      window.tinymce.remove() // 进入之前销毁实例
    },
    mounted () {
      this.init_1 = {
        selector: '#init_1',
        language: 'zh_CN',
        plugins: 'image',
        toolbar: [
          'undo  redo | styleselect | bold italic | align | image'
        ],
        width: '100%',
        height: 500
      }
      window.tinymce.init(this.init_1)
      
    },
    destroyed () {
    }
  }
</script>

<style lang="less" scoped>
  .tinymce-editor{
    margin-bottom: 20px;
  }
</style>
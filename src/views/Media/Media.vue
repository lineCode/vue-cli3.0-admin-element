<template>
  <div>
    <!--开启摄像头-->
    <img @click="callCamera" :src="headImgSrc" alt="摄像头">
    <!--canvas截取流-->
    <canvas id="canvas" ref="canvas" width="640" height="480"></canvas>
    <!--图片展示-->
    <video ref="video" width="640" height="480" autoplay></video>
    <!--确认-->
    <el-button size="mini" type="primary" @click="photograph">拍照</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headImgSrc: ''
      }
    },
    mounted () {
      this.callCamera()
    },
    methods: {
      // 调用摄像头
      callCamera () {
        // H5调用电脑摄像头API
        navigator.mediaDevices.getUserMedia({
          video: true
        }).then(success => {
          // 摄像头开启成功
          this.$refs['video'].srcObject = success
          // 实时拍照效果
          this.$refs['video'].play()
        }).catch(() => {
          window.console.error('摄像头开启失败，请检查摄像头是否可用！')
        })
      },
      // 拍照
      photograph () {
        let ctx = this.$refs['canvas'].getContext('2d')
        // 把当前视频帧内容渲染到canvas上
        ctx.drawImage(this.$refs['video'], 0, 0, 640, 480)
        // 转base64格式、图片格式转换、图片质量压缩
        let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7)

        // 由字节转换为KB 判断大小
        // let str = imgBase64.replace('data:image/jpeg;base64,', '')
        // let strLength = str.length
        // let fileLength = parseInt(strLength - (strLength / 8) * 2)
        // 图片尺寸  用于判断
        // let size = (fileLength / 1024).toFixed(2)
        // 保存到本地
        let ADOM = document.createElement('a')
        ADOM.href = imgBase64
        ADOM.download = new Date().getTime() + '.jpeg'
        ADOM.click()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
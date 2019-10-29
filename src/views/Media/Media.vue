<template>
  <div>
    <!--确认-->
    <div>
      <el-button size="mini" type="primary" @click="star">开始</el-button>
      <el-button size="mini" type="primary" @click="suspend">暂停</el-button>
      <el-button size="mini" type="primary" @click="photograph">拍照</el-button>
    </div>
    <!--canvas截取流-->
    <canvas id="canvas" ref="canvas" width="640" height="480"></canvas>
    <!--图片展示-->
    <video style="display: none;" ref="video" width="640" height="480" autoplay></video>

    <img v-for="item in urlList" :key="item" :src="item" alt="">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headImgSrc: '',
        timer: null,
        urlList: []
      }
    },
    mounted () {
      this.callCamera()
    },
    methods: {
      // 调用摄像头
      callCamera () {
        // H5调用摄像头API
        navigator.mediaDevices.getUserMedia({
          video: true
        }).then(success => {
          // 摄像头开启成功
          this.$refs['video'].srcObject = success
          this.star()
        }).catch(() => {
          window.console.error('摄像头开启失败，请检查摄像头是否可用！')
        })
      },
      star () {
        let ctx = this.$refs['canvas'].getContext('2d')
        this.timer = setInterval(() => {
          ctx.drawImage(this.$refs['video'], 0, 0, 640, 480)
        }, (20));
        this.$refs['video'].play()
      },
      suspend () {
        this.$refs['video'].pause()
        clearInterval(this.timer)
      },
      // 拍照
      photograph () {
        // let ctx = this.$refs['canvas'].getContext('2d')
        // // 把当前视频帧内容渲染到canvas上
        // ctx.drawImage(this.$refs['video'], 0, 0, 640, 480)
        // 转base64格式、图片格式转换、图片质量压缩
        let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7)
        this.urlList.push(imgBase64)
        window.console.log(imgBase64)
        // 由字节转换为KB 判断大小
        // let str = imgBase64.replace('data:image/jpeg;base64,', '')
        // let strLength = str.length
        // let fileLength = parseInt(strLength - (strLength / 8) * 2)
        // 图片尺寸  用于判断
        // let size = (fileLength / 1024).toFixed(2)
        // 保存到本地
        // let ADOM = document.createElement('a')
        // ADOM.href = imgBase64
        // ADOM.download = new Date().getTime() + '.jpeg'
        // ADOM.click()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
<template>
  <div class="home">
    <el-container class="body-box">
      <el-aside class="aside-box">
        <Aside :menus="menus"></Aside>
      </el-aside>
      <el-container class="main-box">
        <el-header class="header-box">
          <Header></Header>
        </el-header>
        <div class="tag-box">
          <span :class="['tag-list', e.link === base.nowRoute ? 'active' : '']" v-for="(e, i) in base.clickRoute" :key="i" :index="i" @click.stop="clickTags(e)">
            {{ e.name }}
            <i v-if="i !== 0" class="close-icon el-icon-close" @click.stop="clickClose(e, i)"></i>
          </span>
        </div>
        <el-main>
          <transition name="slide-fade" mode="out-in">
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
let self = {}
import Header from '@/components/Layout/Header' // 导入头部
import Aside from '@/components/Layout/Aside' // 导入 侧边栏
import "driver.js/dist/driver.min.css" // import driver.js css
import Driver from 'driver.js'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    Header,
    Aside
  },
  data () {
    return {
      // 侧边栏
      menus: [],
			driver: null
    }
  },
  computed: {
    ...mapState([
      'base'
    ]),
    key () {
      return this.$route.path
    }
  },
  mounted () {
    self = this
    self.$set(self, 'menus', self.base.limit)
    this.driver = new Driver({
			className: 'scoped-class',
			animate: true, // Animate while changing highlighted element
      opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
      padding: 10, // Distance of element from around the edges
      allowClose: true, // Whether clicking on overlay should close or not
      overlayClickNext: false, // Should it move to next step on overlay click
      doneBtnText: '完成', // Text on the final button
      closeBtnText: '关闭', // Text on the close button for this step
      nextBtnText: '下一步', // Next button text for this step
      prevBtnText: '上一步' // Previous button text for this step
		})
		setTimeout(() => {
			this.driver.defineSteps([
				{
					element: '#header-title',
					popover: {
						title: '首页',
						description: '点击返回首页',
						position: 'right'
					}
				}
			])
			this.driver.start()
		}, 400)
  },
  methods: {
    clickTags (e) {
      self.$router.push({
        path: e.link
      })
    },
    clickClose (e, i) {
      self.base.clickRoute.splice(i, 1)
      if (e.link === self.base.nowRoute) {
        self.$router.push({
          path: self.base.clickRoute[i-1].link
        })
      }
    }
  }
}
</script>

<style lang="less">
@base: #f2f2f2;
.home,
.body-box{
  height: 100%;
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: @base;
}
.aside-box{
  width: 200px !important;
}
.el-main{
  color: #333;
}
.el-header{
  background: #fff;
  height: 50px !important;
  box-shadow: 0 1px 4px rgba(0,21,41,.08) !important;
  z-index: 1000 !important;
}
.el-aside{
  background-color: #383D40;
}
.tag-box{
  padding: 6px 20px;
  background: #fff;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid rgba(0,21,41,.08);
  .tag-list{
    display: inline-block;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
    background-color: #ecf5ff;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    margin-left: 10px;
    cursor: pointer;
    .close-icon{
      font-size: 0;
      transition: all 0.1s;
    }
    &:hover{
      color: #fff;
      border-color: #E6A23C;
      background: #E6A23C;
      .close-icon{
        font-size: 14px;
      }
    }
    &.active{
      color: #fff;
      border-color: #E6A23C;
      background: #E6A23C;
    }
  }
  .tag-list:first-child{
    margin-left: 0;
  }
}
.el-footer{
  height: 40px !important;
  line-height: 40px;
  text-align: center;
  font-size: 12px;
}
.slide-fade-enter-active {
  transition: all .8s cubic-bezier(.55,0,.1,1);
}
.slide-fade-enter {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(.55,0,.1,1);
}
.slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
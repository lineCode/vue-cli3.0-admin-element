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
        <el-container>
          <div class="tag-box">
            <span class="tag-list" v-for="(e, i) in base.clickRoute" :key="i" :index="i" @click.stop="clickTags(e)">
              {{ e.name }}
              <i v-if="i !== 0" class="close-icon el-icon-close" @click.stop="clickClose(e, i)"></i>
            </span>
          </div>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer>
            ©2019 xxxxxx号
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
let self = {}
import Header from '@/components/Layout/Header' // 导入头部
import Aside from '@/components/Layout/Aside' // 导入 侧边栏
import { mapState } from 'vuex'
// import api from '@/api/api'
export default {
  name: 'home',
  components: {
    Header,
    Aside
  },
  data () {
    return {
      // 侧边栏
      menus: []
    }
  },
  computed: {
    ...mapState([
      'base'
    ])
  },
  mounted () {
    self = this
    self.$set(self, 'menus', self.base.limit)
    // api.queryUser({})
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
}
.el-aside{
  background-color: #383D40;
}
.tag-box{
  padding: 6px 20px;
  background: #fff;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
  .tag-list{
    display: inline-block;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
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
</style>
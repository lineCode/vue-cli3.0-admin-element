# vue-cli3

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目插件

1. vue-router
2. vuex
3. less
4. element.ui
5. 

## 项目进展

1. App.vue                              整体模块
2. Header.vue                           头部模块
3. Aside.vue                            侧边模块
4. Footer.vue                           底部模块
5. Login.vue                            登陆模块


## 项目中的问题
1. props 接收一个Number类型时会提示
解决：npm install --save core-js   yarn add core-js@2.6.9 --save

2. 解决vuex刷新数据丢失(安装持久化插件，原理利用浏览器自带存储库来保存数据)
npm install vuex-persistedstate --save

3. 打包之后 空白页面(资源加载错误)
添加一个 vue.config.js(可选配置,详情查看官网)
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static'
}

4. 切换用户之后久的路由未清除,暂未解决
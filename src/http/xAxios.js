// 封装axios拦截器
import axios from 'axios'
import unit from '@/unit/unit'
import { Loading, Notification } from 'element-ui'

let loading
// 开启全局加载动画
function showLoading () {
	loading = Loading.service({
		lock: true,
		text: '加载中...',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.5)'
	})
}
// 请求时间
axios.defaults.timeout = 5000

// 请求拦截器
axios.interceptors.request.use(config => {
	showLoading()
	return config
}, err => {
	loading.close()
	Notification.error({
		title: '错误',
		message: '请求超时，请刷新页面重试!'
	})
	return Promise.reject(err)
})

// 请求响应拦截器
axios.interceptors.response.use(data => {
	loading.close()
	return data
}, err => {
	loading.close()
	Notification.error({ // 判断状态码 给出对应的提示
		title: '错误',
		message: unit.errorParse(err.response.status).msg
	})
})
export default axios
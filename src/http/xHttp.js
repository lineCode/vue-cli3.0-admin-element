import axios from './xAxios'
let ip = 'http://byu6999740001.my3w.com/vueAdmin/public/Index/'
// http://byu6999740001.my3w.com/vueAdmin/public/Index/User/Index?name=&pageSize=10&pageCount=1

export default{
	getHttp (url) {
		return new Promise((resolve, reject) => {
			axios.get(ip + url, '')
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
		})
	},
	postHttp (url, params) {
		return new Promise((resolve, reject) => {
			axios.post(ip + url, params)
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
		})
	}
}
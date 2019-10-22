import axios from './xAxios'
// let ip = 'http://localhost/'
let ip = 'http://byu6999740001.my3w.com/vueAdmin/public/Index/'
// http://byu6999740001.my3w.com/vueAdmin/public/Index/User/Index?name=&pageSize=10&pageCount=1

export default{
	getHttp (url, header) {
		return new Promise((resolve, reject) => {
			axios.get(ip + url, { headers: header || {}})
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
		})
	},
	postHttp (url, params, header) {
		return new Promise((resolve, reject) => {
			axios.post(ip + url, params, { headers: header || {
				'Content-Type': 'application/json, text/plain, */*'
			}})
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
		})
	}
}
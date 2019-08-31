import axios from './xAxios'
let ip = 'http://127.0.0.1'

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
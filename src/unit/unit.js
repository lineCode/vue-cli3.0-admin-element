// 工具类 存放公共 js
export default {
	/**
	 * http响应错误处理
	 * @param {错误数据} err 
	 */
	errorParse (err) {
		switch (err) {
			case 401:
				return { code: err, msg: '用户授权过期,请重试!' } // 用户授权过期
			case 400:
				return { code: err, msg: '请求语法错误,请联系开发者' } // 请求语法错误
			case 404:
				return { code: err, msg: '请求参数错误,请联系开发者!' } // 请求参数错误
			case 500:
				return { code: err, msg: '内部服务器错误,请联系开发者' } // 内部服务器错误
			default:
				return { code: err, msg: '其他错误,请联系开发者' } // 其它
		}
	},
	/**
	 * 设置字段默认值（）
	 * @param {字段} ops 
	 * @param {默认数据} def 
	 */
	defaultParam (ops, def) {
		return ops && ops !== '' ? ops : def
	},
	
	/**
	 * 筛选路由表
	 * @param {*} list 
	 * @param {*} pary 
	 */
	filterRouter (list, pary) {
		// 使用路由按需加载(官方推荐)
		const _import = (r) => file => require.ensure([], () => file(require(`@/views${ r }.vue`)))
		list.forEach(e => {
			if (!e.children.length) {
				if (e.link !== '/' && e.link !== '/Home') {
					pary.push({
						path: e.link,
						name: e.linkName,
						meta: {
							parentName: e.parentName ? e.parentName : '',
							name: e.name,
							requiresAuth: true
						},
						component: _import(`${ e.link }`)
					})
				}
			} else {
				this.filterRouter(e.children, pary)
			}
		})
	}
}
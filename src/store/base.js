export default {
	state: {
		// 登录token
		token: '',
		limit: [],
		// 登录账号密码
		formLogin: {},
		// 记住密码
		rememberPass: false,
		// 当前路由
		nowRoute: '',
		// 上个路由
		lastRoute: '',
		// 点击过的路由
		clickRoute: []
	},
	mutations: {
		// 改变token
		CHANGE_TOKEN_MUT (state, value) {
			state.token = value.token
		},
		// 改变路由表
		CHANGE_LIMIT_MUT (state, value) {
			state.limit = value
		},
		// 改变登录字段
		CHANGE_FORMlOGIN_MUT (state, value) {
			state.formLogin = value
		},
		// 改变记住密码
		CHANGE_REMEMBERPASS_MUT (state, value) {
			state.rememberPass = value
		},
		// 改变当前路由
		CHANGE_NOWROUTE_MUT (state, value) {
			state.nowRoute = value
		},
		// 改变上个路由
		CHANGE_LASTROUTE_MUT (state, value) {
			state.lastRoute = value
		},
		// 改变点击列表
		CHANGE_CLICKROUTE_MUT (state, value) {
			state.clickRoute = state.clickRoute.concat(value)
			let obj = {}
			state.clickRoute = state.clickRoute.reduce((cur,next) => {
				obj[next.link] ? "" : obj[next.link] = true && cur.push(next)
				return cur
			},[])
		}
	},
	actions: {
		CHANGE_TOKEN_ACT ({commit}, value) {
			commit('CHANGE_TOKEN_MUT', value)
		},
		CHANGE_LIMIT_ACT ({commit}, value) {
			commit('CHANGE_LIMIT_MUT', value)
		},
		CHANGE_FORMlOGIN_ACT ({commit}, value) {
			commit('CHANGE_FORMlOGIN_MUT', value)
		},
		CHANGE_REMEMBERPASS_ACT ({commit}, value) {
			commit('CHANGE_REMEMBERPASS_MUT', value)
		},
		CHANGE_NOWROUTE_ACT ({commit}, value) {
			commit('CHANGE_NOWROUTE_MUT', value)
		},
		CHANGE_LASTROUTE_ACT ({commit}, value) {
			commit('CHANGE_LASTROUTE_MUT', value)
		},
		CHANGE_CLICKROUTE_ACT ({commit}, value) {
			commit('CHANGE_CLICKROUTE_MUT', value)
		}
	}
}
<template>
	<div id="header">
		<div class="header-box">
			<div id="header-title" class="header-title">
				后台管理系统
			</div>
			<ul class="header-move">
				<li class="header-icon home" @click="goHome">
					<i class="iconfont">&#xe6a2;</i>
				</li>
				<li class="user-avata">
					<img src="@/assets/logo.png" alt="">
					<span>{{ base.formLogin.username }}</span>
				</li>
				<li class="header-icon exit" @click="exit">
					<i class="iconfont">&#xe650;</i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router, { resetRouter } from '@/router.js'
export default {
	data () {
		return {
		}
	},
	computed: {
		...mapState([
			'base'
		])
	},
	mounted () {
		window.console.log(this.base)
	},
	methods: {
		...mapActions([
			'CHANGE_LIMIT_ACT',
			'CHANGE_CLICKROUTE_ACT'
		]),
		goHome () {
			this.$router.push({
				path: '/Index/Index'
			})
		},
		exit () {
			resetRouter()
			this.CHANGE_LIMIT_ACT([]) // 清空路由表
			this.CHANGE_CLICKROUTE_ACT([]) // 清空点击过的列表
			let routers = []
			const _import = (r) => file => require.ensure([], () => file(require(`@/views${ r }.vue`)))
			let allRouters = [
				{
					path: '/Home',
					name: 'Home',
					component: _import('/Home'),
					mtea: {
						parentName: '',
						name: '',
						requiresAuth: true,
					},
					children: routers
				},
				{ path: '*', redirect: '/NoFind/NoFind' },
			]
			router.addRoutes(allRouters)
			this.$router.push({
				path: '/'
			})
		}
	}
}
</script>

<style scoped lang="less">
#header{
	height: 100%;
	.header-box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		.header-title{
			line-height: 50px;
			font-weight: 600;
		}
		.header-move{
			display: flex;
			align-items: center;
			li{
				margin-left: 24px;
				&.header-icon{
					cursor: pointer;
					i{
						font-size: 18px;
					}
				}
			}
			.user-avata{
				display: flex;
				align-items: center;
				font-size: 12px;
				img{
					width: 28px;
					height: 28px;
					border-radius: 50%;
					margin-right: 4px;
				}
			}
		}
	}
}
</style>
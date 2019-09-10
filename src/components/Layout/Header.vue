<template>
	<div id="header">
		<div class="header-box">
			<div class="header-title">
				后台管理系统
			</div>
			<ul class="header-move">
				<li class="header-icon home">
					<i class="iconfont">&#xe6a2;</i>
				</li>
				<li class="user-avata">
					<img src="@/assets/logo.png" alt="">
					<span>管理员</span>
				</li>
				<li class="header-icon exit">
					<i class="iconfont">&#xe650;</i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	methods: {
		exit () {
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
<template>
	<div id="aside">
		<div class="aside-box">
			<div class="aside-logo">
				logo
			</div>
			<div class="aside-mens">
				<el-menu
					unique-opened
					@select="selectMenus"
					:default-active="base.nowRoute"
					class="el-menu-vertical-demo"
					background-color="#383D40"
					text-color="#fff"
					router
					active-text-color="#ffd04b">
					<!-- 图标-icon、图标大小-iconSize、目录等级-level、目录排序-sort、状态-state(0 隐藏 1 显示) -->
					<div v-for="(e, i) in menus" :key="i" :index="i">
						<div v-if="e.state"> <!-- 是否需要展示-->
							<el-submenu v-if="e.children.length" :index="e.link"> <!-- 循环一级 有子集 -->
								<!-- 一级标题 开始-->
								<template slot="title">
									<i class="iconfont" :style="{ marginRight: '5px', fontSize: e.iconSize + 'px' }" v-html="e.icon"></i>
									<span slot="title">{{ e.name }}</span>
								</template>
								<!-- 一级标题 结束-->
								<div v-for="(eC, iC) in e.children" :key="iC" :index="iC"> <!-- 循环二级 -->
									<div v-if="eC.state"> <!-- 是否需要展示-->
										<el-submenu v-if="eC.children.length" :index="eC.link"> <!-- 二级有子集-->
											<span slot="title">{{ eC.name }}</span>
											<div v-for="(eCC, iCC) in eC.children" :key="iCC" :index="iCC"> <!-- 循环三级-->
												<el-menu-item :index="eCC.link">{{ eCC.name }}</el-menu-item>
											</div>
										</el-submenu>
										<el-menu-item v-else :index="eC.link">{{ eC.name }}</el-menu-item> <!-- 二级无子集-->
									</div>
								</div>
							</el-submenu>
							<el-menu-item v-else :index="e.link"> <!-- 循环一级 无子集 -->
								<i class="iconfont" :style="{ marginRight: '5px', fontSize: e.iconSize + 'px' }" v-html="e.icon"></i>
								<span slot="title">{{ e.name }}</span>
							</el-menu-item>
						</div>
					</div>
				</el-menu>
			</div>
		</div>
	</div>
</template>

<script>
let self = {}
import { mapState, mapActions } from 'vuex'
export default {
	props: {
		menus: {
			type: Array,
			default: null
		}
	},
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
		self = this
	},
	methods: {
		...mapActions([
			'CHANGE_CLICKROUTE_ACT'
		]),
		exit () {},
		selectMenus (index, indexPath, ev) {
			self.CHANGE_CLICKROUTE_ACT({ link: index, name: ev.$el.children.length ? ev.$el.children[1].innerHTML : ev.$el.innerHTML })
		}
	}
}
</script>

<style lang="less">
@logoColor: #1CB2CB;
@whiteColor: #ffffff;
#aside{
	height: 100%;
	.aside-logo{
		width: 100%;
		height: 60px;
		line-height: 60px;
		text-align: center;
		background: @logoColor;
		color: @whiteColor;
	}
	.el-menu{
		border-right: 0px !important;
	}
}
</style>
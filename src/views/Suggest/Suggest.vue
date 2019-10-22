<template>
	<div id="Suggest">
		<div class="box-bottom operated">
			<el-form class="paginations-search" :model="paginations" label-width="0px" label-position="left">
				<el-form-item label="">
					<el-input v-model="paginations.queryName" placeholder="输入账号关键字" @input.native="ThisJs.queryList"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="showDrawer(1, 0, {})" type="primary">添加</el-button>
					<el-button @click="deleteList" type="danger">一键删除</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div ref="table" class="box-bottom table-box">
			<m-table :list="list" :operate="operate" :paginations="paginations" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" @handleSelectionChange="handleSelectionChange"></m-table>
		</div>
		<el-drawer
			:title="innerDrawer.title"
			:visible.sync="innerDrawer.show"
			@close="drawerClose"
			size="50%">
			<div class="innerDrawer-box">
				<div class="demo-drawer__body">
					<el-form :model="innerDrawer.list" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="用户昵称" prop="name">
						<el-input v-if="!innerDrawer.operateType" v-model="innerDrawer.list.name"></el-input>
						<span v-else>{{ innerDrawer.list.name }}</span>
					</el-form-item>
					<el-form-item label="用户手机" prop="tel">
						<el-input v-if="!innerDrawer.operateType" v-model="innerDrawer.list.tel"></el-input>
						<span v-else>{{ innerDrawer.list.tel }}</span>
					</el-form-item>
					<el-form-item label="用户位置" prop="position">
						<el-input v-if="!innerDrawer.operateType" v-model="innerDrawer.list.position"></el-input>
						<span v-else>{{ innerDrawer.list.position }}</span>
					</el-form-item>
					<el-form-item label="申请类型">
						<el-select v-if="!innerDrawer.operateType" style="width: 100%;" v-model="innerDrawer.list.type" placeholder="请选择申请类型">
							<el-option label="诉求" value="1"></el-option>
							<el-option label="咨询" value="2"></el-option>
						</el-select>
						<span v-else>{{ innerDrawer.list.status }}</span>
					</el-form-item>
					<el-form-item label="留言标题" prop="title">
						<el-input v-if="!innerDrawer.operateType" v-model="innerDrawer.list.title"></el-input>
						<span v-else>{{ innerDrawer.list.title }}</span>
					</el-form-item>
					<el-form-item label="留言内容" prop="message">
						<el-input v-if="!innerDrawer.operateType" v-model="innerDrawer.list.message"></el-input>
						<span v-else>{{ innerDrawer.list.message }}</span>
					</el-form-item>
				</el-form>
				</div>
				<div class="demo-drawer__footer" v-if="!innerDrawer.operateType">
					<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
					<el-button @click="resetForm('ruleForm')">重 置</el-button>
				</div>
				<div class="demo-drawer__footer" v-else>
					<el-button @click="innerDrawer.show = false">关 闭</el-button>
				</div>
			</div>
		</el-drawer>
	</div>
</template>
<script>
import mTable from '@/components/mTable/mTable'
import ThisJs from './Suggest'
import { Notification } from 'element-ui'
export default {
	name: 'Suggest',
	components: {
		mTable
	},
	data () {
		return {
			rules: {
				name: [
					{ required: true, message: '请输入用户昵称!', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				tel: [
					{ required: true, message: '请输入用户手机!', trigger: 'blur' }
				],
				position: [
					{ required: true, message: '请输入用户位置!', trigger: 'blur' }
				]
			},
			// 表格数据配置
			list: {
				border: true,
				selection: {
					show: true,
					align: 'center',
					width: '55'
				},
				data: [],
				options: [
					{
						align: 'center',
						prop: 'id',
						label: '编号',
						width: 100,
						// 筛选的数据
						filters: [{ text: '1', value: '1' }, { text: '2', value: '2' }],
						// 筛选的方法
						filterHandler: (value, row) => {
							if (Number(value) === Number(row.id)) return true
						}
					},
					{
						align: 'center',
						prop: 'name',
						label: '用户昵称'
					},
					{
						align: 'center',
						prop: 'username',
						label: '用户账号'
					},
					{
						align: 'center',
						prop: 'password',
						label: '用户密码'
					},
					{
						align: 'center',
						prop: 'type',
						label: '申请类型',
						width: 120,
						render: (row) => {
							switch (Number(row.status)) {
								case 1:
									return <el-tag type="warning" size="medium">诉求</el-tag>
								case 2:
									return <el-tag type="danger" size="medium">咨询</el-tag>
							}
						}
					},
					{
						align: 'center',
						prop: 'created_time',
						label: '创建时间'
					}
				],
				expand: {
					show: false,
					data: []
				}
			},
			// 表格操作配置
			operate: {
				label: '操作',
				fixed: 'right',
				width: 200,
				align: 'center',
				options: [
					{
						type: 'text',
						label: '查看',
						method: (i, r) => {
							this.showDrawer(2, i, r)
						}
					},
					{
						type: 'text',
						label: '修改',
						method: (i, r) => {
							this.showDrawer(0, i, r)
						}
					}
				]
			},
			// 分页配置
			paginations: {
				queryCode: '',
				pageSize: 10,
				pageCount: 1,
				total: null
			},
			innerDrawer: {
				show: false,					// 弹框显隐
				title: '',						// 弹框标题
				btnTxt: '',						// 按钮名称
				operateType: 0,				// 弹框类型 0 (添加\修改) 1 (查看)
				list: {},							// 弹框数据
				initList: {}					// 初始数据
			},
			deleteId: null,						// 删除数据的id
		}
	},
	created () {
    this.ThisJs = new ThisJs(this)
	},
	mounted () {
		this.ThisJs.queryList()
	},
	methods: {
    /**
		 * 页量改变
		 */
		handleSizeChange (val) {
			window.console.log(val)
		},
    /**
		 * 页码改变
		 */
		handleCurrentChange (val) {
			this.paginations.pageCount = val
			this.ThisJs.queryList()
		},
		/**
		 * 表格选择 回调
		 */
		handleSelectionChange (val) {
			let arr = []
			val.forEach(e => {
				arr.push(e.id)
			})
			this.deleteId = arr
		},
		/**
		 * 打开 添加/修改 弹框
		 */
		showDrawer (param, i, r) {
			this.innerDrawer.show = true
			if (!param) {
				this.$set(this.innerDrawer, 'title', '修改弹框')
				this.$set(this.innerDrawer, 'list', JSON.parse(JSON.stringify(r)))
				this.$set(this.innerDrawer, 'operateType', 0)
			} else if (param === 1) {
				this.$set(this.innerDrawer, 'title', '添加弹框')
				this.$set(this.innerDrawer, 'list', {
					type: '1'
				})
				this.$set(this.innerDrawer, 'operateType', 0)
			} else {
				this.$set(this.innerDrawer, 'title', '查看弹框')
				this.$set(this.innerDrawer, 'list', JSON.parse(JSON.stringify(r)))
				this.$set(this.innerDrawer, 'operateType', 1)
			}
			this.$set(this.innerDrawer, 'initList', JSON.parse(JSON.stringify(r)))
		},
		/**
		 * 添加/修改 弹框 关闭回调
		 */
		drawerClose () {
			this.$refs['ruleForm'].clearValidate()
		},
		/**
		 * 添加/修改 确认
		 */
		submitForm (param) {
			this.$refs[param].validate((valid) => {
				if (valid) {
					this.ThisJs.updateList(this.innerDrawer.list)
				} else {
					return false
				}
			})
		},
		/**
		 * 添加/修改 重置
		 */
		resetForm (param) {
			this.$refs[param].clearValidate()
			if (this.innerDrawer.title === '添加弹框') {
				this.innerDrawer.initList.status = '2'
			}
			this.$set(this.innerDrawer, 'list', JSON.parse(JSON.stringify(this.innerDrawer.initList)))
		},
		/**
		 * 删除
		 */
		deleteList () {
			let self = this
			if (self.deleteId) {
				self.ThisJs.deleteList({
					id: self.deleteId
				})
			} else {
				Notification({
					type: 'error',
					title: '失败',
					message: '请选择至少一个操作对象!'
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
	#Suggest{
		height: 100%;
		.table-box{
			height: calc(~'100% - 60px');
		}
		.paginations-search{
			display: flex;
			justify-content: space-between;
			.el-form-item{
				margin-bottom: 0;
			}
		}
	}
</style>
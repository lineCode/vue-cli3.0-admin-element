<template>
	<div id="User">
		<div class="box-bottom operated">
			<el-form class="paginations-search" :model="paginations" label-width="50px" label-position="left">
				<el-form-item label="名 字">
					<el-input v-model="paginations.query_name" placeholder="输入关键字" @input.native="ThisJs.queryUser"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">添加</el-button>
					<el-button type="danger">一键删除</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div ref="table" class="box-bottom table-box">
			<m-table :list="list" :operate="operate" :paginations="paginations" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></m-table>
		</div>
	</div>
</template>
<script>
import mTable from '@/components/mTable/mTable'
import ThisJs from './User'
export default {
	components: {
		mTable
	},
	data () {
		return {
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
						prop: 'username',
						label: '名字'
					},
					{
						align: 'center',
						prop: 'status',
						label: '状态',
						width: 120,
						render: (row) => {
							switch (Number(row.status)) {
								case 0:
									return <el-tag type="success" size="medium">审核中</el-tag>
								case 1:
									return <el-tag type="warning" size="medium">审核通过</el-tag>
								case 2:
									return <el-tag type="danger" size="medium">审核驳回</el-tag>
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
							window.console.log(i, r)
						}
					}
				]
			},
			// 分页配置
			paginations: {
				query_name: '',
				pageSize: 10,
				pageCount: 1,
				total: null
			}
		}
	},
	created () {
    this.ThisJs = new ThisJs(this)
	},
	mounted () {
		this.ThisJs.queryUser()
	},
	methods: {
    // 页量改变
		handleSizeChange (val) {
			window.console.log(val)
		},
    // 页码改变
		handleCurrentChange (val) {
			this.paginations.pageCount = val
			this.ThisJs.queryUser()
		}
	}
}
</script>

<style lang="less" scoped>
	#User{
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
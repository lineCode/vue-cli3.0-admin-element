<template>
  <div class="mTable">
    <!-- 表格 -->
    <div ref="table" class="table-box box-top">
      <el-table :data="list.data" :border="list.border" :height="tableH" @selection-change="handleSelectionChange">>
        <!-- 展开隐藏信息 -->
        <el-table-column v-if="list.expand.show" type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item v-for="(e, i) in list.expand.data" :key="i" :index="i" :label="e.label">
                <span>{{ scope.row[e.prop] }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column v-if="list.selection.show" type="selection" :width="list.selection.width" :align="list.selection.align"></el-table-column>
        <el-table-column
          v-for="(e, i) in list.options"
          :index="i"
          :key="i"
          :align="e.align"
          :type="e.type"
          :prop="e.prop"
          :label="e.label"
          :width="e.width"
          :sortable="e.sortable"
          :filters="e.filters"
          :filter-method="e.filterHandler">
          <template slot-scope="scope">
            <template v-if="!e.render">
              <span>{{ scope.row[e.prop] }}</span>
            </template>
            <!-- render函数部分 -->
            <template v-else>
              <render-dom :cols="e" :rows="scope.row"></render-dom>
            </template>
          </template>
        </el-table-column>
        <!-- 操作按钮部分 -->
        <el-table-column :label="operate.label" :fixed="operate.fixed" :align="operate.align" :width="operate.width">
          <template slot-scope="scope">
            <el-button
              v-for="(e, i) in operate.options"
              :key="i"
              :index="i"
              :type="e.type"
              :size="e.size"
              @click="e.method(scope.$index, scope.row)">
              {{ e.label }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page-box box-top">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :small="paginations.small || false"
        :background="paginations.background || true"
        :pager-count="paginations.pagerCount || 7"
        :page-sizes="paginations.pageSizes || [10, 20, 30, 40]"
        :page-size="paginations.pageSize"
        :total="paginations.total"
        :layout="paginations.layout || 'total, prev, pager, next, jumper'">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    renderDom: {
      props: {
        cols: {
          type: Object,
          required: true
        },
        rows: {
          type: Object,
          required: true
        }
      },
      render (h) {
        return h('div', [this.cols.render(this.rows)])
      }
    }
  },
  props: {
    // 表格配置
    list: {
      type: Object
    },
    // 表格操作
    operate: {
      type: Object
    },
    // 分页配置
    paginations: {
      type: Object
    },
  },
  data () {
    return {
      // 表格高度 需要设置一个初始值
      tableH: '100'
    }
  },
  methods: {
    // 动态修改表格高度
		setTableH () {
      this.tableH = this.$refs['table'].offsetHeight
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    // 页量改变
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    // 页码改变
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    }
  },
	mounted () {
		this.$nextTick(() => {
			this.setTableH()
		})
	}
}

</script>
<style lang="less" scoped>
  .mTable{
    height: 100%;
    .table-box{
      height: calc(~'100% - 52px');
    }
    .page-box{}
  }
</style>
<template>
  <div class="index">
    <div class="index-message">
      <el-row :gutter="24">
        <el-col :span="6" v-for="(e, i) in cardList" :key="i" :index="i">
          <el-card shadow="always">
            <div class="card-box">
              <div class="icon-box">
                <svg class="icon index-icon" aria-hidden="true">
                  <use :xlink:href="`#${ e.icon }`"></use>
                </svg>
              </div>
              <div class="msg-box">
                <p class="msg-title">{{ e.name }}</p>
                <span class="msg-num">{{ filterMoney(e.num, e.filterNum) }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="index-line">
      <div id="line-echart" style="width: 50%;height: 300px;"></div>
    </div>
  </div>
</template>

<script>
let echarts = require('echarts')
export default {
  name: 'index',
  data () {
    return {
      // 卡片
      cardList: [
        {
          name: '文章数量',
          icon: 'icon-liebiao',
          num: 1205.224,
          filterNum: 0
        },
        {
          name: '阅读数量',
          icon: 'icon-chenwuribao-',
          num: 1203565.224,
          filterNum: 2
        },
        {
          name: '素材数量',
          icon: 'icon-tupian',
          num: 1203565.224,
          filterNum: 2
        },
        {
          name: '综合统计',
          icon: 'icon-zonghetongji-',
          num: 1203565.224,
          filterNum: 2
        }
      ],
      lineOption: {
        grid: {},
        title: { text: '文章详细' },
        tooltip: {},
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  computed: {
    /**
     * 计算金额
     */
    filterMoney () {
      return function (val, num) {
        let reg = /(?=(\B)(\d{3})+$)/g,
            value = Number(val).toFixed(num),
            arr = value.split('.'),
            beforePoint = arr[0],
            afterPoint = arr[1]
        return afterPoint ? (beforePoint.replace(reg, ',') + '.' + afterPoint) : beforePoint.replace(reg, ',')
      }
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myLine = echarts.init(document.getElementById('line-echart'))
      window.console.log(myLine)
      myLine.setOption(this.lineOption)
    }
  }
}
</script>
<style lang="less">
  .index{
    height: 100%;
    .index-icon{
      width: 3em;
      height: 3em;
    }
    .card-box{
      display: flex;
      padding: 8px 0;
      align-items: center;
      justify-content: space-between;
    }
    .msg-box{
      font-weight: 700;
      text-align: right;
      .msg-title{
        color: rgba(0,0,0,.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .msg-num{
        color: #666;
        display: block;
        width: 100%;
        font-size: 20px;
      }
    }
  }
</style>
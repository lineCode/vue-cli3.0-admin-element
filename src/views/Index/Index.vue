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
    <div class="index-echars">
      <div class="index-title">
        文章数据
      </div>
      <div class="index-chart">
        <div class="bar-box">
          <div id="bar-echart" style="width: 100%;height: 100%;"></div>
        </div>
        <div class="pie-box">
          <div id="pie-echart" style="width: 100%;height: 100%;"></div>
        </div>
      </div>
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
      // 折线图数据
      lineOption: {
        grid: {
          letf: '8%',
          right: '8%',
          top: '8%',
          bottom: '8%',
          width: '84%',
          height: '84%'
        },
        title: {},
        tooltip: {},
        legend: {},
        xAxis: {
          show: true,
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          // 坐标轴刻度线
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {}
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            barGap: 0,
            barWidth: '15px',
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name: '销量2',
            type: 'bar',
            barGap: 0,
            barWidth: '15px',
            data: [5, 20, 106, 10, 10, 20]
          },
          {
            name: '销量3',
            type: 'bar',
            barGap: 0,
            barWidth: '15px',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      // 饼图
      pieOption: {
        title: {},
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            top: 0,
            left: 'center',
            data: ['西凉', '益州','兖州','荆州','幽州']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '60%',
            center: ['50%', '55%'],
            data: [
              {value:335, name:'西凉'},
              {value:310, name:'益州'},
              {value:274, name:'兖州'},
              {value:235, name:'荆州'},
              {value:400, name:'幽州'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
    this.drawBar()
    this.drawPie()
  },
  methods: {
    // 绘画柱状图
    drawBar () {
      let myLine = echarts.init(document.getElementById('bar-echart'))
      myLine.setOption(this.lineOption)
    },
    // 绘画饼图
    drawPie () {
      let myPie = echarts.init(document.getElementById('pie-echart'))
      myPie.setOption(this.pieOption)
    }
  }
}
</script>
<style lang="less">
  .index{
    height: 100%;
    .index-icon{
      width: 4em;
      height: 4em;
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
    .index-echars{
      background: #fff;
      margin-top: 20px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      .index-title{
        color: #888;
        line-height: 60px;
        padding-left: 20px;
        font-size: 18px;
        font-weight: 600;
      }
      .index-chart{
        display: flex;
        .bar-box{
          width: 60%;
          height: 350px;
        }
        .pie-box{
          width: 40%;
          height: 350px;
        }
      }
    }
  }
</style>
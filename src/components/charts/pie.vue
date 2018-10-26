<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import resize from './mixins/resize.js'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartPie',
  mixins: [resize],
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  mounted () {
    this.$nextTick(() => {
      let legend = this.value.map(_ => _.name)
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legend
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.value,
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
      this.charts = echarts.init(this.$refs.dom, 'tdTheme')
      this.charts.setOption(option)
    })
  },
  beforeDestroy() {
    if (!this.charts) return
    this.charts.dispose()
    this.charts = null
  }
}
</script>

<style lang="less">
.charts{
  //
}
</style>

<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from "echarts"
import tdTheme from "./theme.json"
import resize from './mixins/resize.js'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: "ChartBar",
  mixins: [resize],
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.charts) return
    this.charts.dispose()
    this.charts = null
  },
  methods: {
    initChart() {
      this.$nextTick(() => {
        let xAxisData = Object.keys(this.value)
        let seriesData = Object.values(this.value)
        let option = {
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'center'
          },
          xAxis: {
            type: 'category',
            data: xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: seriesData,
              type: 'bar'
            }
          ]
        }
        this.charts = echarts.init(this.$refs.dom, 'tdTheme')
        this.charts.setOption(option)
      })
    }
  }
}
</script>

<style scoped lang="less">
.charts {
  width: 100%;
  height: 100%;
}
</style>

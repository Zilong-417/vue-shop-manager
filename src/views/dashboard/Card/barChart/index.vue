<template>
    <div class="echarts" ref="charts">

    </div>
</template>

<script>
//引入echarts
import echarts from 'echarts'
export default {
    name: '',
    mounted() {
        //初始化echarts实例
        let lineCharts = echarts.init(this.$refs.charts)
        //配置数据
        lineCharts.setOption({
            xAxis: {
                show: false,
                type: "category",
                boundaryGap: false,
            },
            yAxis: {
                //隐藏y周
                show: false
            },
            //系列
            series: [
                {
                    type: 'bar',
                    data: [10, 37, 36, 19, 44, 9, 10, 47, 33, 12, 44, 9],
                    color: 'yellowgreen'
                }
            ],
            //布局调试
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            tooltip: {}

        })
    }
}
</script>

<style>
.echarts {
    width: 100%;
    height: 100%;
}
</style>
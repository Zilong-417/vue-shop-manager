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
                    type: 'line',
                    smooth: true,
                    data: [10, 47, 33, 82, 44, 9],
                    //拐点的样式
                    itemStyle: {
                        opacity: 0
                    },
                    //线条的样式
                    lineStyle: {
                        color: "#DDAA00"
                    },
                    //填充颜色
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "	#DDAA00"
                                },
                                {
                                    offset: 1,
                                    color: "#fff"
                                }
                            ],
                            global: false,
                        }
                    }
                }
            ],
            //布局调试
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }

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
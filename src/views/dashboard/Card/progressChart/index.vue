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
                boundaryGap: false,
                min: 0,
                max: 100
            },
            yAxis: {
                //隐藏y周
                show: false,
                //均分
                type: "category",
            },
            //系列
            series: [
                {
                    type: 'bar',
                    data: [78],
                    color: 'skyblue',
                    //柱状图宽度
                    barWidth: 20,
                    //背景颜色设置
                    showBackground: true,
                    //设置背景颜色
                    backgroundStyle: {
                        color: "#eee",
                    },
                    //文本
                    label: {
                        show: true,
                        //改变文本内容
                        formatter: "|",
                        //文本位置
                        position: 'right'
                    }

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
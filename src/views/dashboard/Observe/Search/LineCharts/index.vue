<template>
    <div>
        <div class="header">
            <span class="search-header">搜索用户</span>
            <i class="el-icon-warning-outline"></i>
        </div>
        <div class="main">
            <span class="main-title">12345</span>
            <span class="main-content">99.9</span>
            <i class="el-icon-caret-top" style="color: greenyellow"></i>
            <i class="el-icon-caret-bottom" style="color: red"></i>
        </div>
        <div class="echarts" ref="charts"></div>
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
                    data: [10, 47, 33, 92, 44, 9],
                    //拐点的样式
                    itemStyle: {
                        opacity: 0
                    },
                    //线条的样式
                    lineStyle: {
                        color: "skyblue"
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
                                    color: "skyblue"
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

<style scoped>
.header {
    display: flex;
    align-items: center;
}

.search-header {
    margin-right: 10px;
}

.main {
    margin: 10px 0;
}

.main-title {
    margin-right: 30px;
}

.main-content {
    margin-right: 10px;
}

.echarts {
    width: 100%;
    height: 50px;
}
</style>
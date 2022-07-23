<template>
    <div>
        <el-card>
            <div slot="header" class="header">
                <div class="category-header">
                    <span>销售额类别占比</span>
                    <el-radio-group v-model="value">
                        <el-radio-button label="全部渠道"></el-radio-button>
                        <el-radio-button label="线上"></el-radio-button>
                        <el-radio-button label="门店"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div>
                <div class="charts" ref="charts"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
//引入echarts
import echarts from 'echarts'
export default {
    name: '',
    data() {
        return {
            value: '全部渠道'
        }

    },
    mounted() {
        //初始化echarts实例
        let lineCharts = echarts.init(this.$refs.charts)
        //配置数据
        lineCharts.setOption({
            title: {
                text: '酒类',
                subtext: '10%',
                left: 'center',
                top: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: '销售额',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: "#fff",
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'outsize'
                    },

                    labelLine: {
                        show: true
                    },
                    data: [
                        { value: 1048, name: '酒类' },
                        { value: 735, name: '粮油调料' },
                        { value: 580, name: '冷冻品' },
                        { value: 484, name: '方便食品' },
                        { value: 300, name: '其他' }
                    ]
                }
            ]
        })
        lineCharts.on("mouseover", (params) => {
            //获取鼠标一上去那条数据
            const { name, value } = params.data
            //重新设置标题
            lineCharts.setOption({
                title: {
                    text: name,
                    subtext: value
                }
            })
        })
    }
}
</script>
<style scoped>
.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header {
    border-bottom: 1px solid #eee;
}

.charts {
    width: 100%;
    height: 393px;
}
</style>
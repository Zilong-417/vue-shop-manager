<template>
    <el-card class="box-card" style="margin:10px 0;">
        <div slot="header" class="clearfix">
            <!--@tab-click="handleClick"-->
            <el-tabs class="tab" v-model="activeName">
                <el-tab-pane label="销售额" name="first"></el-tab-pane>
                <el-tab-pane label="访问量" name="second"></el-tab-pane>
            </el-tabs>
            <div class="right">
                <span @click="setDay">今日</span>
                <span @click="setWeek">本周</span>
                <span @click="setMonth">本月</span>
                <span @click="setYear">本年</span>
                <!--v-model="value1"-->
                <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    class="date" size="mini" v-model="date" value-format="yyyy--MM--dd">
                </el-date-picker>
            </div>
        </div>
        <div>
            <el-row>
                <el-col :span="16">
                    <!--容器-->
                    <div class="charts" ref="charts"></div>
                </el-col>
                <el-col :span="8" class="right">
                    <h3>门店{{ title }}排名</h3>
                    <ul>
                        <li v-for="(item, index) in listsData" :key="index">
                            <span class="rindex">{{ item.id }}</span>
                            <span>{{ item.name }}</span>
                            <span class="rvalue">{{ item.value }}</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
//引入echarts
import echarts from 'echarts'
import dayjs from 'dayjs'
export default {
    name: '',
    data() {
        return {
            activeName: 'first',
            mycharts: null,
            //日历事件
            date: [],
            listsData: [{
                id: 0,
                name: '茶百道',
                value: 12345
            },
            {
                id: 2,
                name: '茶百道',
                value: 12345
            }, {
                id: 3,
                name: '茶百道',
                value: 12345
            }, {
                id: 4,
                name: '茶百道',
                value: 12345
            }, {
                id: 5,
                name: '茶百道',
                value: 12345
            }, {
                id: 6,
                name: '茶百道',
                value: 12345
            }]
        }
    },
    mounted() {
        //初始化echarts实例
        this.mycharts = echarts.init(this.$refs.charts)
        //配置数据
        this.mycharts.setOption({
            title: {
                text: '销售额趋势'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390],
                    color: 'skyblue'
                }
            ]
        })
    },
    computed: {
        title() {

            if (this.activeName == 'first') {
                return '销售额'
            } else {
                return '访问量'
            }
        }
    },
    watch: {
        title() {
            //重新修改图标的配置数据
            //图标配置数据可以再次修改，遇到新的则改
            if (this.activeName == 'first') {
                this.mycharts.setOption({
                    title: {
                        text: this.title
                    },

                    series: [
                        {
                            name: 'Direct',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390],
                            color: 'skyblue'
                        }
                    ]
                })
                this.listsData = [{
                    id: 0,
                    name: '茶百道',
                    value: 12345
                },
                {
                    id: 2,
                    name: '茶百道',
                    value: 12345
                }, {
                    id: 3,
                    name: '茶百道',
                    value: 12345
                }, {
                    id: 4,
                    name: '茶百道',
                    value: 12345
                }, {
                    id: 5,
                    name: '茶百道',
                    value: 12345
                }, {
                    id: 6,
                    name: '茶百道',
                    value: 12345
                }]
            } else {
                this.mycharts.setOption({
                    title: {
                        text: this.title
                    },
                    series: [
                        {
                            name: 'Direct',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 152, 300, 330, 340, 130, 320, 100, 152, 200, 334, 390],
                            color: '#00AA00'
                        }
                    ]
                })
                this.listsData = [{
                    id: 0,
                    name: '一点点',
                    value: 67890
                },
                {
                    id: 2,
                    name: '一点点',
                    value: 67890
                }, {
                    id: 3,
                    name: '一点点',
                    value: 67890
                }, {
                    id: 4,
                    name: '一点点',
                    value: 67890
                }, {
                    id: 5,
                    name: '一点点',
                    value: 67890
                }, {
                    id: 6,
                    name: '一点点',
                    value: 67890
                }]
            }
        }
    },
    methods: {
        setDay() {
            const day = dayjs().format('YYYY--MM--DD')
            this.date = [day, day]
        },
        setWeek() {
            const start = dayjs().day(1).format('YYYY--MM--DD')
            const end = dayjs().day(7).format('YYYY--MM--DD')
            this.date = [start, end]
        },
        setMonth() {
            const start = dayjs().startOf('month').format('YYYY--MM--DD')
            const end = dayjs().endOf('month').format('YYYY--MM--DD')
            this.date = [start, end]
        },
        setYear() {
            const start = dayjs().startOf('year').format('YYYY--MM--DD')
            const end = dayjs().endOf('year').format('YYYY--MM--DD')
            this.date = [start, end]
        }

    }
}
</script>

<style scoped>
.clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
}

.tab {
    width: 100%;
}

.right {
    position: absolute;
    right: 0;
}

.right span {
    margin: 0 15px 0 15px;
    cursor: pointer;
}

.date {
    width: 200px;
    margin-left: 20px;
}

.charts {
    width: 100%;
    height: 300px;
}

ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
}

ul li {
    height: 8%;
    margin: 10px 0;
}

.rindex {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: black;
    color: white;
    text-align: center;
}

.rindex2 {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    color: black;
    text-align: center;
}

.rvalue {
    float: right;
}
</style>
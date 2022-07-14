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
                    class="date" size="mini" v-model="date" value-format="yyyy-MM--dd">
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
                        <li>
                            <span class="rindex">0</span>
                            <span>茶百道</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span class="rindex">1</span>
                            <span>茶百道</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span class="rindex">2</span>
                            <span>茶百道</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span class="rindex">3</span>
                            <span>茶百道</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span class="rindex2">4</span>
                            <span>茶百道</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span class="rindex2">5</span>
                            <span>茶百道</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li>
                            <span class="rindex2">6</span>
                            <span>茶百道</span>
                            <span class="rvalue">123456</span>
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
            date: []
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
            return this.activeName == 'first' ? '销售额' : '访问量'
        }
    },
    watch: {
        title() {
            //重新修改图标的配置数据
            //图标配置数据可以再次修改，遇到新的则该
            this.mycharts.setOption({
                title: {
                    text: this.title
                }
            })
        }
    },
    methods: {
        setDay() {
            const day = dayjs().format('YYYY-MM--DD')
            this.date = [day, day]
        },
        setWeek() {
            const start = dayjs().day(1).format('YYYY-MM--DD')
            const end = dayjs().day(7).format('YYYY-MM--DD')
            this.date = [start, end]
        },
        setMonth() {
            const start = dayjs().startOf('month').format('YYYY-MM--DD')
            const end = dayjs().endOf('month').format('YYYY-MM--DD')
            this.date = [start, end]
        },
        setYear() {
            const start = dayjs().startOf('year').format('YYYY-MM--DD')
            const end = dayjs().endOf('year').format('YYYY-MM--DD')
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
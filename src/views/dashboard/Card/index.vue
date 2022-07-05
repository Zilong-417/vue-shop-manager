<template>
    <div>
        <el-row :gutter="10">
            <!--总销售额-->
            <el-col :span="6">
                <el-card>
                    <Detail title="总销售额" count="￥126560">
                        <template slot="charts">
                            <span>周同比&nbsp;&nbsp;56.67%&nbsp;&nbsp;&nbsp;<svg t="1657004143263" class="icon"
                                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1325"
                                    width="16" height="16">
                                    <path
                                        d="M896 768l-80.896 0-131.072 0-155.648 0-159.744 0-141.312 0-100.352 0q-24.576 0-39.936-11.264t-20.992-28.672-0.512-38.4 22.528-41.472q37.888-40.96 79.872-86.016t86.016-91.136l86.016-92.16q44.032-46.08 83.968-89.088 18.432-19.456 44.032-28.672t52.736-8.704 53.248 11.776 45.568 31.744q70.656 73.728 147.456 159.744t160.768 184.32q19.456 23.552 26.624 46.592t2.56 40.96-20.48 29.184-40.448 11.264z"
                                        p-id="1326" fill="#d81e06"></path>
                                </svg>
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span>日同比&nbsp;&nbsp;19.16&nbsp;&nbsp;&nbsp;<svg t="1657004702474" class="icon"
                                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2458"
                                    width="16" height="16">
                                    <path d="M325.456471 862.280661" p-id="2459" fill="#32CD32"></path>
                                    <path d="M882.057788 862.280661" p-id="2460" fill="#32CD32"></path>
                                    <path d="M236.028491 877.160382" p-id="2461" fill="#32CD32"></path>
                                    <path d="M960.132455 877.160382" p-id="2462" fill="#32CD32"></path>
                                    <path d="M63.683483 788.736998" p-id="2463" fill="#32CD32"></path>
                                    <path d="M958.469023 788.736998" p-id="2464" fill="#32CD32"></path>
                                    <path d="M64.77753 858.792098" p-id="2465" fill="#32CD32"></path>
                                    <path
                                        d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z"
                                        p-id="2466" fill="#32CD32"></path>
                                    <path d="M959.523505 858.792098" p-id="2467" fill="#32CD32"></path>
                                </svg></span>
                        </template>
                        <template slot="footer">
                            <span>日销售额 ￥45678</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <!--访问量-->
            <el-col :span="6">
                <el-card>
                    <Detail title="访问量" count="126560">
                        <template slot="charts">
                            <lineCharts></lineCharts>
                        </template>
                        <template slot="footer">
                            <span>日访问量 7894</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <!--销售笔数-->
            <el-col :span="6">
                <el-card>
                    <Detail title="销售笔数" count="126560">
                        <template slot="charts">
                            <barCharts></barCharts>
                        </template>
                        <template slot="footer">
                            <span>转化率 78%</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <!--运营活动效果-->
            <el-col :span="6">
                <el-card>
                    <Detail title="运营活动效果" count="126560">
                        <template slot="charts">
                            <progressCharts></progressCharts>
                        </template>
                        <template slot="footer">
                            <span>周同比&nbsp;&nbsp;56.67%&nbsp;&nbsp;&nbsp;<svg t="1657004143263" class="icon"
                                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1325"
                                    width="16" height="16">
                                    <path
                                        d="M896 768l-80.896 0-131.072 0-155.648 0-159.744 0-141.312 0-100.352 0q-24.576 0-39.936-11.264t-20.992-28.672-0.512-38.4 22.528-41.472q37.888-40.96 79.872-86.016t86.016-91.136l86.016-92.16q44.032-46.08 83.968-89.088 18.432-19.456 44.032-28.672t52.736-8.704 53.248 11.776 45.568 31.744q70.656 73.728 147.456 159.744t160.768 184.32q19.456 23.552 26.624 46.592t2.56 40.96-20.48 29.184-40.448 11.264z"
                                        p-id="1326" fill="#d81e06"></path>
                                </svg>
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span>日同比&nbsp;&nbsp;19.16&nbsp;&nbsp;&nbsp;<svg t="1657004702474" class="icon"
                                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2458"
                                    width="16" height="16">
                                    <path d="M325.456471 862.280661" p-id="2459" fill="#32CD32"></path>
                                    <path d="M882.057788 862.280661" p-id="2460" fill="#32CD32"></path>
                                    <path d="M236.028491 877.160382" p-id="2461" fill="#32CD32"></path>
                                    <path d="M960.132455 877.160382" p-id="2462" fill="#32CD32"></path>
                                    <path d="M63.683483 788.736998" p-id="2463" fill="#32CD32"></path>
                                    <path d="M958.469023 788.736998" p-id="2464" fill="#32CD32"></path>
                                    <path d="M64.77753 858.792098" p-id="2465" fill="#32CD32"></path>
                                    <path
                                        d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z"
                                        p-id="2466" fill="#32CD32"></path>
                                    <path d="M959.523505 858.792098" p-id="2467" fill="#32CD32"></path>
                                </svg></span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import lineCharts from './lineChart'
import barCharts from './barChart'
import progressCharts from './progressChart'
import Detail from './Detail'
export default {
    name: '',
    components: {
        Detail,
        lineCharts,
        barCharts,
        progressCharts
    }
}
</script>

<style>
</style>
<template>
    <div class="content">
        <el-card>
            <div class="header" slot="header">
                <div class="search-header">
                    <span>线上热门搜索</span>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" style="width: 100px;">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div>
                <el-row gutter="10">
                    <el-col :span="12">
                        <LineCharts></LineCharts>
                    </el-col>
                    <el-col :span="12">
                        <LineCharts></LineCharts>
                    </el-col>
                </el-row>
                <!--table表格-->
                <el-table :data="tableData" style="width: 100%," border>
                    <el-table-column label="排名" width="80" type="index">
                    </el-table-column>
                    <el-table-column label="搜索关键字">
                    </el-table-column>
                    <el-table-column label="用户数" sortable>
                    </el-table-column>
                    <el-table-column label="周涨幅" sortable>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="1000"
                    style="height: 50px;margin-top:45px ;">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import LineCharts from './LineCharts'
export default {
    name: '',
    data() {
        return {
            tableData: [{}]
        }
    },
    components: {
        LineCharts
    }
}
</script>

<style >
.header {
    border-bottom: 1px solid #eee;
    padding: 5px 0;
}

.search-header {
    display: flex;
    justify-content: space-between;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>
<template>
    <div>
        <!--按钮-->
        <el-button type="primary" icon="el-icon-plus" round style="margin: 0 0 15px 0;">提交</el-button>
        <!--表格组件
            data:表格组件将来需要展示的数据----数据类型
            border：边框
            el-table-column：列
            label：显示标题
            width:对应列的宽度
            align：标题的对齐方式
        -->
        <el-table style="width: 100%" border>
            <el-table-column prop="date" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="name" label="品牌名称" align="center">
            </el-table-column>
            <el-table-column prop="address" label="品牌LOGO" align="center">
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center">
            </el-table-column>
        </el-table>
        <!--
            分页器：
            当前第几页，数据总条数，每一页展示条数，连续页码数
            current-page:代表的是当前第几页
            total:代表分页器一共需要展示数据条数
            page-size:代表的是每一页需要展示多少条数据
            page-sizes:代表可以设置每一页展示多少条数据
            layout：可以实现分页器布局
            pager-count:按钮的数量
        -->
        <el-pagination style="margin-top: 30px;text-align: center;" :total="99" :current-page="6" :page-size="3"
            :page-count="9" :page-sizes="[3, 5, 10]" layout="prev, pager, next,jumper,->,sizes,total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'tradeMark',
    data() {
        return {
            //代表的分页器第几页
            page: 1,
            //当前页面展示数据条数
            limit: 3,
            //总共数据条数
            total: 0,
            //列表展示的数量
            list: []
        }
    },
    //组件挂载完毕发请求
    mounted() {
        //console.log(this.$API)
        //获取列表数据方法
        this.getPageList();
    },
    methods: {
        //获取品牌列表的数据
        async getPageList() {
            //解构出参数
            const { page, limit } = this;
            //获取品牌列表的接口
            //当你向浏览器发请求的时候，这个函数需要带参数，因此在
            //data当中初始化两个字段，代表给服务器传递参数
            let result = await this.$API.trademark.reqTradeMarkList(page, limit);
            console.log(result)
            //console.log(this.$API)
            // if (result.code == 200) {
            //     //分别是展示数据的总条数与列表展示的数据
            //     this.total = result.data.total;
            //     this.list = result.data.records;
            // }
        }
    }
}
</script>

<style>
</style>
<template>
    <div>
        <el-card style="margin: 20px 0;">
            <!--三级联动已经是全局组件了-->
            <CategorySelect @getCategoryId="getCategoryId" :show="!show"></CategorySelect>
        </el-card>
        <el-card>
            <el-button type="primary" icon="el-icon-plus" round>添加SPU</el-button>
            <el-table style="width:100%" border>
                <el-table-column label="序号" type="index" width="80" align="center">
                </el-table-column>
                <el-table-column label="SPU名称" prop="prop" width="width">
                </el-table-column>
                <el-table-column label="SPU描述" prop="prop" width="width">
                </el-table-column>
                <el-table-column label="操作" prop="prop" width="width">
                    <template slot-scope="{row,$index}">
                        <el-button type="success" icon="el-icon-plus" size="mini"></el-button>
                        <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="info" icon="el-icon-info" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 30px;text-align: center;" background :total="total" :current-page="page"
                :page-size="limit" :page-count="8" :page-sizes="[3, 5, 10]"
                layout="prev, pager, next,jumper,->,sizes,total" @current-change="handleCurrentChange"
                @size-change="handleSizeChange">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'spu',
    data() {
        return {
            //分别是分类的id
            category1Id: '',
            category2Id: '',
            category3Id: '',
            //控制三级联动的可操作性
            show: true
        }
    },
    methods: {
        //三级联动的自定义事件，可以把子组件的响应id传递给父组件
        getCategoryId({ categoryId, level }) {
            //categoryId:获取到一二三级分类的ID level:为了区分是几级Id
            if (level == 1) {
                this.category1Id = categoryId;
                //清除第二三级分类的iD
                this.category2Id = '';
                this.category3Id = '';
            } else if (level == 2) {
                //清除第三级分类的iD
                this.category2Id = categoryId;
                this.category3Id = '';
            } else {
                this.category3Id = categoryId;
                //获取SPU列表数据进行展示
                this.getSpuList();
            }
        },
        //获取SPU列表数据的方法
        getSpuList() {

        }
    }
}
</script>

<style>
</style>
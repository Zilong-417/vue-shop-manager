<template>
    <div>
        <el-card style="margin: 20px 0;">
            <!--三级联动已经是全局组件了-->
            <CategorySelect @getCategoryId="getCategoryId" :show="scence != 0"></CategorySelect>
        </el-card>
        <el-card>
            <div v-show="scence == 0">
                <!--展示SPU列表的结构-->
                <el-button type="primary" icon="el-icon-plus" round @click="addSpu" :disabled="!category3Id">添加SPU
                </el-button>
                <el-table style="width:100%;margin-top: 10px;" border :data="records">
                    <el-table-column label="序号" type="index" width="80" align="center">
                    </el-table-column>
                    <el-table-column label="SPU名称" prop="spuName" width="width">
                    </el-table-column>
                    <el-table-column label="SPU描述" prop="description" width="width">
                    </el-table-column>
                    <el-table-column label="操作" prop="prop" width="width">
                        <template slot-scope="{row,$index}">
                            <!--这里用hintbutton替换-->
                            <hint-button type="success" icon="el-icon-plus" size="mini" title="添加Sku"></hint-button>
                            <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改Spu"
                                @click="updateSpu(row)"></hint-button>
                            <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前Spu全部Sku列表">
                            </hint-button>
                            <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除Spu"></hint-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination style="margin-top: 30px;text-align: center;" background :total="total"
                    :current-page="page" :page-size="limit" :page-count="8" :page-sizes="[3, 5, 10]"
                    layout="prev, pager, next,jumper,->,sizes,total" @current-change="getSpuList"
                    @size-change="handleSizeChange">
                </el-pagination>
            </div>
            <SpuForm v-show="scence == 1" @changeScence="changeScence" ref="spu"></SpuForm>
            <SkuForm v-show="scence == 2"></SkuForm>
        </el-card>
    </div>
</template>

<script>
//引入子组件
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
    name: 'Spu',
    data() {
        return {
            //分别是分类的id
            category1Id: '',
            category2Id: '',
            category3Id: '',
            //控制三级联动的可操作性
            show: true,
            page: 1,//分页器当前第几页
            limit: 3,//每一页需要展示多少条数据
            records: [],//spu列表的数据
            total: 0,//分页器一共需要展示数据的条数
            scence: 0,//0代表展示Spu列表数据 1添加Spu|修改Spu 2:添加Spu
        }
    },
    methods: {
        //点击分页器的第几页按钮的回调
        // handleCurrentChange(page) {
        //     this.page = page;
        //     this.getSpuList();
        // },
        //每一页展示多少条数据
        handleSizeChange(limit) {
            this.limit = limit;
            this.getSpuList()
        },
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
        async getSpuList(pages = 1) {
            this.page = pages
            const { page, limit, category3Id } = this;
            console.log({ page, limit, category3Id })
            //携带三个参数（当前页数，页面数据限制，三级分类ID）
            let result = await this.$API.spu.reqSpuList(page, limit, category3Id)
            //console.log(result)
            if (result.code == 200) {
                this.total = result.data.total
                this.records = result.data.records
            }
        },
        //添加SPU按钮的回调
        addSpu() {
            this.scence = 1
            //通知子组件spuForm发请求
            this.$ref.spu.addSpuData();
        },
        //修改Spu按钮的回调
        updateSpu(row) {
            //console.log(row)
            this.scence = 1,
                //获取子组件spuForm
                //在父组件中可以适应$refs获取到子组件
                this.$refs.spu.initSpuData(row)
        },
        //自定义事件回调（SpuForm）
        changeScence(scence) {
            this.scence = scence
            this.getSpuList(this.page)
        }
    },
    components: {
        SpuForm,
        SkuForm
    }

}
</script>

<style>
</style>
<template>
    <div>
        <el-card style="margin: 20px 0;">
            <!--子向父传数据用自定义事件-->
            <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
        </el-card>
        <el-card>
            <div v-show="isShowTable">
                <el-button type="primary" icon="el-type-plus" round style="margin-bottom: 20px" :disabled="!categoryId3"
                    @click="isShowTable = false">添加属性</el-button>
                <el-table style="width: 100%;" :data="attrList" border>
                    <el-table-column type="index" label="序号" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="attrName" label="属性名称" width="150" align="center">
                    </el-table-column>
                    <el-table-column label="属性值列表" width="width" align="center">
                        <!--作用域插槽-->
                        <template slot-scope="{row,$index}">
                            <el-tag type="success" v-for="(attrvalue, index) in row.attrValueList" :key="attrvalue.id"
                                style="margin-right: 10px;">
                                {{ attrvalue.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150" align="center">
                        <el-button type="warning" icon="el-icon-edit" size="mini" @click="isShowTable = false">
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    </el-table-column>
                </el-table>
            </div>
            <!--添加属性|修改属性的结构-->
            <div v-show="!isShowTable">
                <el-form :inline="true" label-width="80px" ref="form">
                    <el-form-item label="属性名">
                        <el-input placeholder="请输入属性名"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
                <el-button @click="isShowTable = true">取消</el-button>
                <el-table style="width: 100%;margin: 20px 0" border>
                    <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
                    <el-table-column label="属性名名称" width="width" align="center" prop="prop"></el-table-column>
                    <el-table-column label="操作" width="80" align="center" prop="prop"></el-table-column>
                </el-table>
                <el-button type="primary">保存</el-button>
                <el-button @click="isShowTable = true">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'Attr',
    data() {
        return {
            categoryId1: '',
            categoryId2: '',
            categoryId3: '',
            //接受平台属性字段
            attrList: [],
            isShowTable: true

        }
    },
    methods: {
        //自定义事件(categoryId是一个对象)
        getCategoryId(categoryId) {
            //console.log(categoryId)
            //区分三级分类ID,以及父组件存储
            if (categoryId.level == 1) {
                this.categoryId1 = categoryId.categoryId
                this.categoryId2 = ''
                this.categoryId3 = ''
            } else if (categoryId.level == 2) {
                this.categoryId2 = categoryId.categoryId
                this.categoryId3 = ''
            } else {
                //代表三级分类有了
                this.categoryId3 = categoryId.categoryId
                this.getAttrList()
            }
        },
        async getAttrList() {
            const { categoryId1, categoryId2, categoryId3 } = this
            let result = await this.$API.attr.reqattrInfoList(categoryId1, categoryId2, categoryId3)
            // console.log(result)
            if (result.code == 200) {
                this.attrList = result.data;
            }
        }
    }
}
</script>

<style>
</style>
<template>
    <div>
        <el-card style="margin: 20px 0;">
            <!--子向父传数据用自定义事件-->
            <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
        </el-card>
        <el-card>
            <!---->
            <div v-show="isShowTable">
                <el-button type="primary" icon="el-type-plus" round style="margin-bottom: 20px" :disabled="!categoryId3"
                    @click="addAttr">添加属性</el-button>
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
                        <template slot-scope="{row,$index}">
                            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)">
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--添加属性|修改属性的结构-->
            <div v-show="!isShowTable">
                <el-form :inline="true" label-width="80px" ref="form" :model="attrInfo">
                    <el-form-item label="属性名">
                        <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" icon="el-icon-plus" @click="addAttrvalue" :disabled="!attrInfo.attrName">添加属性值
                </el-button>
                <el-button @click="isShowTable = true">取消</el-button>
                <el-table style="width: 100%;margin: 20px 0" border :data="attrInfo.attrValueList">
                    <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
                    <el-table-column label="属性名名称" width="width" align="center" prop="prop">
                        <template slot-scope="{row,$index}">
                            <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300" align="center" prop="prop">
                        <template slot-scope="{row,$index}">
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary">保存</el-button>
                <el-button @click="isShowTable = true">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
//按需引用loadash当中的深拷贝
//import cloneDeep from 'loadash/cloneDeep'
export default {
    name: 'Attr',
    data() {
        return {
            categoryId1: '',
            categoryId2: '',
            categoryId3: '',
            //接受平台属性字段
            attrList: [],
            isShowTable: true,
            //收集新增属性|修改属性值
            attrInfo:
            {
                attrName: "",//属性名
                attrValueList: [//属性值，因为可以有多个，用对象数组
                    //属性值，因为属性值可以有多个，因此用数组
                ],
                categoryId: 0,//三级分类ID
                categoryLevel: 3,//因为服务器要区分几级ID
            }


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
        //获取平台属性的数据
        //当用户确定三级分类的数据的时候，可以向服务器发请求获取平台属性进行展示
        async getAttrList() {
            const { categoryId1, categoryId2, categoryId3 } = this
            let result = await this.$API.attr.reqattrInfoList(categoryId1, categoryId2, categoryId3)
            // console.log(result)
            if (result.code == 200) {
                this.attrList = result.data;
            }
        },
        //添加属性值回调
        addAttrvalue() {
            //向属性值的数组添加元素
            //attrId:是你相应的属性ID,目前而言我们是添加属性的操作，还没有相应的属性的Id,
            //valueName:相应的属性值的名称
            this.attrInfo.attrValueList.push({
                attrId: undefined,
                valueName: ''
            })
        },
        //添加属性按钮的回调
        //获取三级分类ID
        addAttr() {
            this.isShowTable = false,
                this.attrInfo = {
                    attrName: "",//属性名
                    attrValueList: [//属性值，因为可以有多个，用对象数组
                        //属性值，因为属性值可以有多个，因此用数组
                    ],
                    categoryId: this.categoryId3,//三级分类ID
                    categoryLevel: 3,//因为服务器要区分几级ID
                }
        },
        //修改某一个属性
        updateAttr(row) {
            this.isShowTable = false
            //将选中的属性赋值给attrInfo
            //由于数据结构中存在对象里面套数组，数组里面有套对象，因此用深拷贝解决这类问题
            this.attrInfo = JSON.parse(JSON.stringify(row))
        }
    }
}
</script>

<style>
</style>
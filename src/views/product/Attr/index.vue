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
                            <!--这里的结构需要input和span来回切换-->
                            <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag"
                                @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
                            <span v-else @click="toEdit(row, $index)" style="display: block;">{{ row.valueName }}</span>
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
                //对于修改某一个属性的时候，可以在已有的属性值的基础之上新增新的属性值（新增属性值的时候，需要已有的属性的id带上）
                attrId: this.attrInfo.id,
                valueName: '',
                flag: true
                //给每一个属性值添加一个标记flag：用于切换；每个属性值都可以控制自己的切换
                //当前的flag为响应式数据（数据变化，视图跟着变化）
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

            //在修改某一属性的时候，将相应的属性值元素添加上flag这个属性
            this.attrInfo.attrValueList.forEach(item => {
                //这样写也可以给属性值添加flag,但是会发现视图不会跟着变化（因为flag不是响应式）
                //因为vue无法探测普通的新增的property,这样的属性并非响应式（数据变化，视图跟着变）
                //item.flag=false;
                //第一个参数：对象 第二个参数：添加新的响应式属性 第三个参数：新的属性的属性值
                this.$set(item, 'flag', false)
            })
        },
        //失去焦点事件，切换为查看模式--span
        toLook(row) {
            //如果属性值为空不能作为新的属性值
            if (row.valueName.trim() == '') {
                this.$message('属性值不能为空')
                return;
            }
            //属性值不能重复
            let isRepat = this.attrInfo.attrValueList.some((item) => {
                //需要将row从数组里面判断的时候去掉
                //row：最新新增的属性值（数组最后一项元素）
                if (row != item) {
                    return row.valueName == item.valueName
                }
            })
            if (isRepat) {
                this.$message('属性值不能重复');
                return;
            }
            //row：形参是当前用户添加的最新的属性值
            //当前编辑模式编程查看模式【input消失，显示span】
            row.flag = false
        },
        //点击span，切换成编辑模式
        toEdit(row, index) {
            row.flag = true
            //获取input节点，实现自动对焦
            //注意事项：点击span的时候，切换为input为编辑模式，但是要注意的是，对于浏览器而言，页面重绘与重排耗时间的
            //点击span的时候，重绘与重排一个input他时耗费事件的，因此我们不可能一点span就获得到input焦点
            //&nextTick,当节点渲染完毕了，会执行一次
            this.$nextTick(() => {
                this.$refs[index].focus()
            })
            //row.flag = true
        }
    }
}
</script>

<style>
</style>
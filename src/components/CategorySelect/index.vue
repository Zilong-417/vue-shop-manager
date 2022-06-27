<!--三级联动公共文件-->
<template>
    <div>
        <!--inline:代表的是行内表单，代表一行可以放置多个表单元素-->
        <el-form :inline="true" v-model="cForm">
            <el-form-item label="一级分类">
                <el-select placeholder="请选择" v-model="cForm.Category1Id" @change="handler1">
                    <el-option :label="c1.name" :value="c1.id" v-for="(c1, index) in list1" :key="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select placeholder="请选择" v-model="cForm.Category2Id" @change="handler2">
                    <el-option :label="c2.name" :value="c2.id" v-for="(c2, index) in list2" :key="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select placeholder="请选择" v-model="cForm.Category3Id" @change="handler3">
                    <el-option :label="c3.name" :value="c3.id" v-for="(c3, index) in list3" :key="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'CategorySelect',
    data() {
        return {
            //一级分类的数据
            list1: [],
            //二级分类数据
            list2: [],
            //三级分类数据
            list3: [],
            //收集一，二，三级分类的ID
            cForm: {
                Category1Id: '',
                Category2Id: '',
                Category3Id: ''
            }
        }
    },
    //组件挂载完毕，向服务器发请求，获取相应的一级分类的数据
    mounted() {
        //获取第一级分类的方法
        this.getCategoryList();
    },
    methods: {
        //获取一类请求的方法
        async getCategoryList() {
            //不需要带参数
            let result = await this.$API.attr.reqCategory1List();
            //console.log(result)
            //result.code不要忘记code
            if (result.code == 200) {
                var arr = result.data.slice(1, 10);
                this.list1 = arr;
            }
        },
        //一级分类的select事件回调（当一级分类的option发生变化时，获取二级分类的数据）
        async handler1() {
            //当重新选择数据时，需要清空二三级数据
            this.list2 = [],
                this.list3 = [],
                this.cForm.Category2Id = ''
            this.cForm.Category3Id = ''
            //解构出Category1Id
            const { Category1Id } = this.cForm

            this.$emit('getCategoryId', { categoryId: Category1Id, level: 1 })
            //通过一级分类的id,获取二级分类的数据
            let result = await this.$API.attr.reqCategory2List(Category1Id);
            console.log(result)
            if (result.code == 200) {
                this.list2 = result.data;
            }
        },
        async handler2() {
            //当二级分类变化时，要清空三级分类数据
            this.list3 = [],
                this.cForm.Category3Id = ''
            //解构出Category2Id
            const { Category2Id } = this.cForm

            this.$emit('getCategoryId', { categoryId: Category2Id, level: 2 })
            let result = await this.$API.attr.reqCategory3List(Category2Id);
            console.log(result)
            if (result.code == 200) {
                this.list3 = result.data;
            }
        },
        handler3() {
            const { Category3Id } = this.cForm
            this.$emit('getCategoryId', { categoryId: Category3Id, level: 3 })
        }
    },
}
</script>

<style>
</style>
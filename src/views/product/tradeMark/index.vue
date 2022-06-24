<template>
    <div>
        <!--按钮-->
        <el-button type="primary" icon="el-icon-plus" round style="margin: 0 0 15px 0;" @click="showDialog">添加
        </el-button>
        <!--表格组件
            data:表格组件将来需要展示的数据----数据类型
            border：边框
            el-table-column：列
            label：显示标题
            width:对应列的宽度
            align：标题的对齐方式
            prop：对应列的字段名
            注意1:elementUI当中的table组件，展示的数据是以一列一列进行展示数据
        -->
        <el-table style="width: 100%" border :data="list">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="tmName" label="品牌名称" align="center">
            </el-table-column>
            <el-table-column prop="logoUrl" label="品牌LOGO" align="center">
                <!--作用域插槽,此处注意-->
                <!--row 就是循环的每一项, 就是table-column 内部写了一个默认的slot <slot :row="item"></slot>-->
                <template slot-scope="{row,$index}">
                    <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center">
                <template slot-scope="{row,$index}">
                    <el-button type="warning" size="mini" icon="el-icon-edit" round @click="updatetradeMark(row)">修改
                    </el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" round @click="deletetradeMark(row)">删除
                    </el-button>
                </template>
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
            @current-change="handleCurrentChange"
        -->
        <el-pagination style="margin-top: 30px;text-align: center;" background :total="total" :current-page="page"
            :page-size="limit" :page-count="8" :page-sizes="[3, 5, 10]" layout="prev, pager, next,jumper,->,sizes,total"
            @current-change="handleCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
        <!--
            对话框
            :visible.sync:控制对话框显示与隐藏
            From组件提供了表单验证的功能，只需要通过rules属性传入约定的验证规则，并将From-item的prop属性设置为需要校验的字段名即可
        -->
        <el-dialog :title="this.tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
            <!--form表单 ：model属性，这个属性的作用是，把表单的数据收集到那个对象的身上，将来表单验证，也需要这个属性-->
            <el-form style="width: 90%;" :model="tmForm" :rules="rules" ref="rulesForm">
                <el-form-item label="品牌名称：" label-width="100px" prop="tmName">
                    <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
                </el-form-item>
                <!--
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                -->
                <el-form-item label="品牌图标：" label-width="100px" prop="logoUrl">
                    <!--
                        这里收集数据，不能使用v-model，因为不是表单元素
                        action:设置图片上传地址
                        :on-success:可以监测到图片上传成功，当图片上传成功，会执行一次
                        :before-upload:可以在上传图片之前，会执行一次
                    -->
                    <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import { message } from 'statuses';

export default {
    name: 'tradeMark',
    data() {
        //自定义事件函数
        var validatetmName = (rule, value, callback) => {
            if (value.length < 3 || value.length > 10) {
                callback(new Error('请输入3到10的字符串'));
            } else {
                callback();//回调
            }
        };
        return {
            //代表的分页器第几页
            page: 1,
            //当前页面展示数据条数
            limit: 3,
            //总共数据条数
            total: 0,
            //列表展示的数量
            list: [],
            //对话框显示与隐藏
            dialogFormVisible: false,
            //表单数据
            tmForm: {
                logoUrl: '',
                tmName: ''
            },

            //表单验证规则
            rules: {
                tmName: [
                    //required必须要校验的信息，message提示信息，trigger：触发时间
                    // { required: true, message: '请输入品牌名称', trigger: 'blur' },
                    // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }

                    //自定义校验规则
                    { validator: validatetmName, trigger: 'blur' }
                ],
                logoUrl: [
                    { required: true, message: '请选择图片' }
                ],
            }
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
            if (result.code == 200) {
                //分别是展示数据的总条数与列表展示的数据
                this.total = result.data.total;
                this.list = result.data.records;
            }
        },
        //当前页事件
        handleCurrentChange(pager) {
            //修改参数
            this.page = pager;
            this.getPageList();
        },
        //每页条数事件(当分页器某一页需要展示的数据条数发生变化时会触发)
        handleSizeChange(limit) {
            //修改参数
            this.limit = limit;
            this.getPageList();
        },
        //点击添加按钮
        showDialog() {
            this.dialogFormVisible = true;
            //清空数据
            this.tmForm = { logoUrl: '', tmName: '' }
        },
        //修改品牌
        updatetradeMark(row) {
            //row,行，表示用户当前选择的品牌信息
            console.log(row)
            //对话框弹出
            this.dialogFormVisible = true;
            //将已有的品牌信息赋值给tmForm进行展示
            //将服务器返回的品牌信息，直接赋值给tmForm进行展示
            //也就是tmForm存储即为服务器返回的品牌信息
            //this.tmForm = row
            //通过浅拷贝的方式赋值给tmForm，不要直接操作服务器数据
            this.tmForm = { ...row }
        },
        //图片上传成功的回调
        handleAvatarSuccess(res, file) {
            //res，file是图片上传成功之后返回前端数据
            this.tmForm.logoUrl = res.data
        },
        //图片上传之前
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //添加与修改品牌数据
        addOrUpdateTradeMark() {
            this.$refs.rulesForm.validate(async (valid) => {
                if (valid) {
                    this.dialogFormVisible = false;
                    //发请求（添加品牌与修改品牌）
                    let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm);
                    if (result.code == 200) {
                        this.$message({
                            message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
                            type: 'success'
                        });
                        //重新获取品牌列表
                        //如果添加品牌，留在第一页，修改品牌，留在当前页
                        this.getPageList();
                        this.handleCurrentChange(this.tmForm.id ? this.page : 1);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                }
            })
        },
        //删除品牌
        deletetradeMark(row) {
            this.$confirm(`你确定要删除${row.tmName}吗`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
                if (result.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getPageList();
                    //this.handleSizeChange(this.list.length > 1 ? this.page : this.page - 1)

                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}

</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

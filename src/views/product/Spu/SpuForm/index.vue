<template>
    <div>
        <el-form label-width="80px" ref="form">
            <el-form-item label="Spu名称">
                <el-input placeholder="请输入Spu名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select placeholder="请选择品牌" value="">
                    <el-option :label="1" value="value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" placeholder="请输入SPU描述" rows="4"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select placeholder="还有3未选择" value="">
                    <el-option label="label" value="1"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
                <el-table style="width: 100%;margin-top: 10px;" border>
                    <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                    <el-table-column label="属性名" prop="prop" width="width"></el-table-column>
                    <el-table-column label="属性值名称列表" prop="prop" width="width"></el-table-column>
                    <el-table-column label="操作" prop="prop" width="width"></el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button @click="$emit('changeScence', 0)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SpuForm',
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //初始化SpuForm数据
        initSpuData(spu) {
            console.log('发请求', spu)
        }
    },

}
</script>

<style>
</style>
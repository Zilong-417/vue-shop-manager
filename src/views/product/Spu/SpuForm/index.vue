<template>
    <div>
        <el-form label-width="80px" ref="form" :model="spu">
            <el-form-item label="Spu名称">
                <el-input placeholder="请输入Spu名称" v-model="spu.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select placeholder="请选择品牌" v-model="spu.tmId">
                    <el-option :label="tm.tmName" :value="tm.id" v-for="(tm, index) in  trademarkList" :key="tm.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" placeholder="请输入SPU描述" rows="4" v-model="spu.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="spuImageList">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrId">
                    <el-option :label="unSelect.name" :value="unSelect.id" v-for="(unSelect, index) in unSelectSaleAttr"
                        :key="unSelect.id"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" style="margin-left: 5px;" :disabled="!attrId">添加销售属性
                </el-button>
                <el-table style="width: 100%;margin-top: 10px;" border :data="spu.spuSaleAttrList">
                    <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                    <el-table-column label="属性名" prop="saleAttrName" width="width"></el-table-column>
                    <el-table-column label="属性值名称列表" prop="prop" width="width">
                        <!--作用域插槽  row销售属性-->
                        <template slot-scope="{row,$index}">
                            <el-tag :key="tag.id" v-for="tag in row.spuSaleAttrValueList" closable
                                :disable-transitions="false">
                                {{ tag.saleAttrValueName }}
                            </el-tag>

                            <!-- @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"-->
                            <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue"
                                ref="saveTagInput" size="small">
                            </el-input>
                            <!--@click="showInput"-->
                            <el-button v-else class="button-new-tag" size="small">+ 添加
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="prop" width="200">
                        <template slot-scope="{row,$index}">
                            <el-button type="danger" icon="el-icon-delete">删除</el-button>

                        </template>
                    </el-table-column>
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
            dialogVisible: false,
            //spu初始化为一个空对象
            spu: {
                "category3Id": 0,
                "description": "string",
                "spuImageList": [
                    // {
                    //     "id": 0,
                    //     "imgName": "string",
                    //     "imgUrl": "string",
                    //     "spuId": 0
                    // }
                ],
                "spuName": "string",
                "tmId": 0,
                "spuSaleAttrList": [
                    // {
                    //     "baseSaleAttrId": 0,
                    //     "id": 0,
                    //     "saleAttrName": "string",
                    //     "spuId": 0,
                    //     "spuSaleAttrValueList": [
                    //         {
                    //             "baseSaleAttrId": 0,
                    //             "id": 0,
                    //             "isChecked": "string",
                    //             "saleAttrName": "string",
                    //             "saleAttrValueName": "string",
                    //             "spuId": 0
                    //         }
                    //     ]
                    // }
                ],
            },//存储spu信息属性
            trademarkList: [],//品牌信息
            spuImageList: [],//存spu图片
            saleAttrList: [],//销售属性的数据
            attrId: '',//收集未选择的销售属性ID
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
        async initSpuData(spu) {
            //获取spu信息的数据
            let SpuResult = await this.$API.spu.reqSpu(spu.id)
            console.log(SpuResult)
            if (SpuResult.code == 200) {
                this.spu = SpuResult.data
            }
            //获取品牌信息
            let trademarkResult = await this.$API.spu.reqTrademarkList();
            if (trademarkResult.code == 200) {
                this.trademarkList = trademarkResult.data
            }
            //获取SPU图片
            let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
            if (spuImageResult.code == 200) {
                let listArr = spuImageResult.data;
                //由于照片墙想爱你是图片需要数组，数组里面要有name与url
                //需要把服务器返回的数据进行修改
                listArr.forEach(item => {
                    item.name = item.imgName;
                    item.url = item.imgUrl
                })
                this.spuImageList = listArr
            }
            //获取平台全部的销售属性
            let saleResult = await this.$API.spu.reqSaleAttrList()
            if (saleResult.code == 200) {
                this.saleAttrList = saleResult.data
            }
        }
    },
    computed: {
        unSelectSaleAttr() {
            //计算出还未选择的销售属性
            //销售属性：尺寸 颜色 版本
            let result = this.saleAttrList.filter(item => {
                return this.spu.spuSaleAttrList.every(item1 => {
                    return item.name != item1.saleAttrName
                })
            })
            return result;
        }
    }

}
</script>

<style>
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
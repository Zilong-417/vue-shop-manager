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
            <!--
                上传图片：action list-type:文件列表的类型 on-preview：图片预览的时候会触发 on-remove：删除的时候会触发
                file-list：上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
                on-success:文件上传成功时的钩子
            -->
            <el-form-item label="SPU图片">
                <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="spuImageList"
                    :on-success="handleSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
                    <el-option :label="unSelect.name" :value="`${unSelect.id}:${unSelect.name}`"
                        v-for="(unSelect, index) in unSelectSaleAttr" :key="unSelect.id"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" style="margin-left: 5px;" :disabled="!attrIdAndAttrName"
                    @click="addSaleAttr">添加销售属性
                </el-button>
                <el-table style="width: 100%;margin-top: 10px;" border :data="spu.spuSaleAttrList">
                    <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                    <el-table-column label="属性名" prop="saleAttrName" width="width"></el-table-column>
                    <el-table-column label="属性值名称列表" prop="prop" width="width">
                        <!--作用域插槽  row销售属性-->
                        <template slot-scope="{row,$index}">
                            <el-tag :key="tag.id" v-for="(tag, index) in row.spuSaleAttrValueList" closable
                                :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)">
                                {{ tag.saleAttrValueName }}
                            </el-tag>

                            <!-- @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"-->
                            <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue"
                                ref="saveTagInput" size="small" @blur="handleInputConfirm(row)">
                            </el-input>
                            <!--@click="showInput"-->
                            <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">+ 添加
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="prop" width="200">
                        <template slot-scope="{row,$index}">
                            <el-button type="danger" icon="el-icon-delete"
                                @click="spu.spuSaleAttrList.splice($index, 1)">删除</el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addOrUptateSpu">保存</el-button>
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
                "description": "",
                "spuImageList": [
                    // {
                    //     "id": 0,
                    //     "imgName": "string",
                    //     "imgUrl": "string",
                    //     "spuId": 0
                    // }
                ],
                "spuName": "",
                "tmId": "",
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
            attrIdAndAttrName: '',//收集未选择的销售属性ID和销售属性
        }
    },
    methods: {
        handleRemove(file, fileList) {
            //file:删除的那张图片
            //fileList：剩余的图片
            //console.log(file, fileList);
            //对于已有的图片【照片中显示的图片，有name，URL】，应为照片显示数据务必要有这两个属性
            //对于服务器而言，不需要name，url，将来对于有的图片的数据在提交给服务器的时候，需要处理的
            this.spuImageList = fileList
        },
        //照片墙图片预览的回调
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //照片墙图片上传成功的回调
        handleSuccess(response, file, fileList) {
            //收集图片的信息
            this.spuImageList = fileList
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
        },
        //添加新的销售属性
        addSaleAttr() {
            //已经收集需要添加的销售属性的信息
            //把收集到的销售属性数据进行分割
            const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':');
            //向SPU对象的spuSaleAttrList属性里面添加新的销售属性
            let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };
            //添加新的销售属性
            this.spu.spuSaleAttrList.push(newSaleAttr)
            this.attrIdAndAttrName = ''
        },
        //添加属性值按钮的回调
        addSaleAttrValue(row) {
            //挂载在销售属性身上的响应数据inputVisible，控制button与input的切换
            this.$set(row, 'inputVisible', true)
            //属性值
            this.$set(row, 'inputValue', '')
        },
        //添加属性值失去焦点事件
        handleInputConfirm(row) {
            //结构出销售属性当中收集数据
            const { baseSaleAttrId, inputValue } = row;
            if (inputValue.trim() == '') {
                this.$message('属性值不能为空')
                return
            }
            let result = row.spuSaleAttrValueList.some(item => item.saleAttrValueName == inputValue);
            if (result) {
                this.$message('属性值不能重复')
                return
            }
            //新增的销售属性
            let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
            row.spuSaleAttrValueList.push(newSaleAttrValue)
            row.inputVisible = false
        },
        //保存按钮回调
        async addOrUptateSpu() {
            this.spu.spuImageList = this.spuImageList.map((item) => {
                return {
                    imgName: item.name,
                    imgUrl: (item.response && item.response.data) || item.url
                }
            })
            //发请求
            let result = await this.$API.spu.reqAddOrUodateSpu(this.spu)
            // console.log(result)
            if (result.code == 200) {
                this.$message({ type: 'success', message: '保存成功' })
                this.$emit('changeScence', 0)
            }
        },
        //点击添加按钮的时候，发请求
        async addSpuData() {
            //获取spu信息的数据
            let SpuResult = await this.$API.spu.reqSpu(spu.id)
            console.log(SpuResult)
            if (SpuResult.code == 200) {
                this.spu = SpuResult.data
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
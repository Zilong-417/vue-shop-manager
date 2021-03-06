import request from '@/utils/request'

//获取SPU列表数据的接口
///admin/product/{page}/{limit} get limit category3Id
export const reqSpuList = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id }
})


//获取SPU信息
///admin/product/getSpuById/{spuId} get
export const reqSpu = (spuId) => request({
    url: `admin/product/getSpuById/${spuId}`, method: 'get'
})

//获取品牌信息
///admin/product/baseTrademark/getTrademarkList  get
export const reqTrademarkList = () => request({
    url: `admin/product/baseTrademark/getTrademarkList`, method: 'get'
})

//获取SPU图片的接口
///admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) => request({
    url: `admin/product/spuImageList/${spuId}`, method: 'get'
})

//获取平台全部销售属性 ----整个平台销售属性一共三个
///admin/product/baseSaleAttrList
export const reqSaleAttrList = () => request({
    url: `admin/product/baseSaleAttrList`, method: 'get'
})

//修改SPU||删除SPU 依据服务器是否携带id进行区分
export const reqAddOrUpdateSpu = (spuInfo) => {
    //修改spu
    if (spuInfo.id) {
        return request({ url: `/admin/product/updateSpuInfo`, method: 'post', data: spuInfo })
    }
    //添加spu
    else {
        return request({ url: `/admin/product/saveSpuInfo`, method: 'post', data: spuInfo })
    }
}

//删除SPU
export const reqdeleteSpu = (spuId) => request({
    url: `/admin/product/deleteSpu/${spuId}`, method: 'delete'
})
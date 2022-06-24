//这个模块主要获取的是品牌管理的数据的模块
import request from '@/utils/request'

//获取品牌列表的接口  get请求  携带两个参数：page当前页数，limit每页记录数
///admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request(
    {
        url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get'
    }
);

//处理添加品牌
//新增品牌：/admin/product/baseTrademark/save post请求 携带两个参数：品牌名称，品牌logo
//切记：对于新增的品牌，给服务器传递数据：不需要传ID，ID由服务器生成

//修改品牌
//修改品牌：/admin/product/baseTrademark/update put请求 携带三个参数：id,品牌名称，品牌logo
//切记：对于修改某一品牌的操作，前端需要携带id，告诉服务器删除的是哪个品牌
export const reqAddOrUpdateTradeMark = (TradeMark) => {
    //带给服务器如果携带id则是修改，否则是新增
    if (TradeMark.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: TradeMark })
    } else {
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: TradeMark })
    }
}


//删除品牌
export const reqDeleteTradeMark = (trademarkId) => request({
    url: `/admin/product/baseTrademark/remove/${trademarkId}`, method: 'delete'
})
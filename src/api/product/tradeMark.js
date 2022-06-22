//这个模块主要获取的是品牌管理的数据的模块
import request from '@/utils/request'
//获取品牌列表的接口get请求，page当前页数，limit每页记录数
///admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request(
    {
        url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get'
    }
);
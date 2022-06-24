//平台属性管理请求文件
import request from '@/utils/request'

//获取一级分类数据接口 get请求
///admin/product/getCategory1
export const reqCategory1List = () => ({
    url: 'admin/product/getCategory1', method: 'get'
})

//获取二级分类数据接口 get请求
///admin/product/getCategory2/{category1Id}
export const reqCategory2List = (Category1Id) => ({
    url: 'admin/product/getCategory2/{category1Id}', method: 'get'
})

//获取三级分类数据接口 get请求
///admin/product/getCategory2/{category1Id}
export const reqCategory3List = (Category2Id) => ({
    url: '/admin/product/getCategory3/{category2Id}', method: 'get'
})
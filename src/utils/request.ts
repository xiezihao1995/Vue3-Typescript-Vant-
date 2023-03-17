import {put,get,post,del} from '@/utils/axios'
// 登入请求
export const LoginApi=(data:any)=>{
    return put({
        url:'/user/login',
        data
    })
}
// 注册请求
export const registerApi=(data:any)=>{
    return put({
        url:'/user/register',
        data
    })
}
// 轮播图请求
export const lunbotu=(data:any)=>{
    return get({
        url:'/goods/list',  
        data
    })
}
export const Search=(data:any)=>{
    return get({
        url:'/goods/list',  
        data
    })
}
// 商品详情
export const getGoodsDetailApi=(data:any)=>{
    return get({
        url:'/goods/detailById',  
        data
    })
}
// 购物车接口
export const getCar=(data:any)=>{
    return get({
        url:'/shopping/listByUserId',  
        data
    })
}
// 添加购物数量接口
export const addCarApi=(data:any)=>{
    return put({
        url:'/shopping/cart',  
        data
    })
}
// 添加地址请求
export const getAddressApi=(data:any)=>{
    return get({
        url:'/address/listByUserId',  
        data
    })
}
// 新增地址请求
export const addAddressApi=(data:any)=>{
    return put({
        url:'/address/add',  
        data
    })
}
// 订单生成
export const addOrderApi=(data:any)=>{
    return put({
        url:'/order/add',  
        data
    })
}
// 订单查询
export const orderListApi=(data:any)=>{
    return get({
        url:'/order/list',  
        data
    })
}


import axios from 'axios';
import { showLoadingToast, closeToast, showToast } from 'vant';
// 创建axios实列
const instance = axios.create({
  baseURL: "/api",
  timeout: 8000,
  headers: { 'Content-type': 'application/json;charset:utf-8' }
});
// 请求拦截
instance.interceptors.request.use((config) => {
  // 请求数据时加载提示
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,//forbidClick 选项可以禁用背景点击
    type: 'loading'
  });
  return config
}, () => {
  return
})
// 响应拦截
instance.interceptors.response.use(res => {
  closeToast();
  if (res.data.code == 200) {
    return res.data
  } else {
    // 用户名已存在或者账号密码错误，注册失败都显示此弹框
    showToast(res.data.message || '响应失败')
   console.log(res.data.message);
    return res.data
  }
}, err => {
  closeToast();
})

// 暴露实列对象
export default instance
// 暴露请求方法

// 用类接口定义
interface configType {
  url: string,
  data?: any,
  headers?: any
}


// 封装请求方法
export const put = (config: configType) => {
  return instance({
    ...config,
    method: 'put',
    data: JSON.stringify(config.data)

  })
}
export const post = (config: configType) => {
  return instance({
    ...config,
    method: 'post',
    data: config.data

  })
}
export const get = (config: configType) => {
  return instance({
    ...config,
    method: 'get',
    params: config.data

  })
}
// delete请求没有data属性，url?id=1&type=2
export const del = (config: configType) => {
  return instance({
    ...config,
    method: 'delete',


  })
}



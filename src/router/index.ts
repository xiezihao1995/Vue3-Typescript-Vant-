import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store/userinfo' //引入vuex

const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'index',
    component:()=>import('@/views/index.vue')
  },
  // 登入页面
  {
    path: '/login',
    name: 'login',
    component:()=>import('../views/login.vue')
  },
  //商品详情页
  {
    path: '/GoodDec',
    name: 'GoodDec',
    component:()=>import('../views/GoodDec.vue')
  },
  //列表页
  {
    path: '/GoodList',
    name: '/GoodList',
    component:()=>import('../views/GoodList.vue')
  },
   //购物车
   {
    path: '/ShopCar',
    name: '/ShopCar',
    component:()=>import('../views/ShopCar.vue')
  },
   //订单列表
   {
    path: '/orderList',
    name: '/orderList',
    component:()=>import('../views/orderList.vue')
  },
  //我的
  {
    path: '/Me',
    name: '/Me',
    component:()=>import('../views/Me.vue')
  },
   //地址列表
   {
    path: '/Address',
    name: '/Address',
    component:()=>import('../views/Address.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  
})

  // 路由全局守卫
  router.beforeEach((to,from,next)=>{
    if(store.state.id){
      // 用户已登录  
      console.log(1111);
      next()
    }else{
      // 未登录
      if(to.path=="/login"){
        console.log(333);
        next()
        return
      }
      console.log(222);
      next("/login")
    }
   
  })
export default router

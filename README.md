# app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 商城项目实战由 "vue3+TypeScrip+vant"技术栈开发

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### npm add postcss-loader postcss-pxtorem -D
###  npm add autoprefixer@9.8.6 -D
### npm i less --save-dev
### npm i less-loader@7.3.0 --save-dev

### 把vue.config.js改为vue.config.ts

### 下载插件 npm i lib-flexible --save
### main.ts引入 flexible.js

### 安装Vant框架

### 封装axios     axios.ts文件

### 解决跨域  proxy

### 封装请求方式（get,post,put,delete） request.ts文件

### 注册功能 
 ### 1.（在响应拦截判断code==200就return res.data否则弹出提示） 2.注册成功弹框提示客户成功

 ### 登入的步骤：将值保存在本地存储里，用vuex保存登入状态的记录， 路由判断登入页面

 ###  封装tabbar底部组件 安装 npm i vue-property-decorator --save  父传子的值 @Prop() 

 ###  实现顶部导航栏navbar组件 子传父 事件传值 @Emit()    声明一个值private active

 ### 轮播图  点击轮播图片跳转到详情页同时传id过去 

 ### vh,vw指当前屏幕的高和宽，百分比针对与父盒子的高和宽

 ### 列表页  无值显示所有数据，有值显示有值的数据

### 上拉加载，下拉刷新 利用List列表，当组件滚动到底部时触发load事件页面数量增加,loading变为true且异步请求更新数据

### 处理数据：判断输入搜索值就展示搜索值的数据否则就展示第一页和加载的数据

### 列表页点击图片进商品详情(GoodDec)
      点击图片通过query传个id到列表页组件 item.id    
### 购物车 
      1.在列表页组件点击图片跳转到增加数量组件
     2.有存量显示按钮无就不能点击,通过:disabled控制
     3.通过点击事件发送请求添加购物车接口,成功后数据库库量-1
     4.在ShopCar组件点击加减号时也发送请求（同一个接口）
     5.计算总价，利用watch监听数量变化而改变总价

 ### 添加收货地址样式
   1.添加地址请求
   2.新增地址请求，点击确认添加地址成功（手机号码校验）后调用添加地址请求的数据
   3.点击切换里面的地址显示在屏幕上
   
  
 ### 订单提交
   1.用户id和当前选择地址的id
   2.若数量为0则重新请求数据this.init()
   3.提交订单跳转到订单页面
     
 ### 订单列表
      
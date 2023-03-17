<template>
   <van-tabbar  route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/GoodList">列表页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/ShopCar">购物车</van-tabbar-item>
      <van-tabbar-item icon="wap-home-o" to="/Me">我的</van-tabbar-item>
</van-tabbar>
</template>

<script lang="ts">
import { Options,Vue } from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
  @Options({})
export default class tabbar extends Vue{
      // @Prop(Number)
      // // 声明一个值
      // private active;

    
}
</script>
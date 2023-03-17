<template>
    <div class="Me">
          <div class="top">
            <div>
              <span></span>
              <p>{{ uInfo.userName||'匿名' }}</p>
            </div>
          </div>
            <div class="nav">
              <p @click="toOrder">我的订单</p>
              <p @click="toAddress">地址列表  </p>
            </div>
    </div>
    <tabbar />
  </template>
  
  <script lang="ts">
  import {Options,Vue} from 'vue-class-component';
  import tabbar from "../components/tabbar.vue";
  import { useStore } from "vuex";
  import { useRouter, useRoute } from "vue-router";
 
  @Options({
  components: {
    tabbar,
  },
})
  export default class Me extends Vue{
    store=useStore()
    router=useRouter()
    uInfo:any=this.store.state.uInfo
    toOrder():void{
           this.router.push({
            name:'/orderList'
           })
    }
    toAddress():void{
      this.router.push({
            name:'/Address'
           })
    }
  }

  </script>
  <style lang="less" scoped>
  .Me{
    background-color: #eee;
    min-height: 100vh;
   

  }
  .top{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    background: #fff;


  }
     .nav{
      margin-top: 30px;
      font-size: 30px;
      p{
       width: 100%;
      height: 90px;
      background: #fff;
      margin-top: 5px;
        display: flex;
        align-items: center;
        padding-left: 10px;
      }
     

     }
  </style>
  
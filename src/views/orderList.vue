<template>
    <div class="order_Wrap">
                <div v-for="item in orderList" :key="item.id" class="order_List">
                            <p>订单号:{{ item.id }}</p>
                            <p>总价格:{{ item.totalAmount }}</p>
                            <p>收货人:{{item.deliveryUserName  }}</p>
                            <p>收货电话:{{ item.deliveryUserPhone }}</p>
                </div>
    </div>
  </template>
  
  <script lang="ts">
  import {Options,Vue} from 'vue-class-component';
  import { useRouter, useRoute } from "vue-router";
  import { useStore } from 'vuex';
  import{orderListApi} from '../utils/request' 
  export default class orderList extends Vue{
    route=useRoute()
      Router=useRouter()
      store=useStore()
      orderList:any[]=[]
      public async mounted(){
            const res:any=await orderListApi({
                userId:this.store.state.uInfo.id //用户id
            })
            console.log(res);
            if(res.code==200){
                this.orderList=res.body
            }
      }
  }
  </script>
  <style lang="less" scoped>
     .order_Wrap{
        padding: 0 20px;
        background: #eee;
        min-height: 100vh;
        .order_List{
            background: #fff;
            margin-bottom: 20px;
            border-radius: 5px;
            font-size: 30px;
            padding: 0 10px;
            p{
                line-height: 2;
            }
        }
     }
  </style>
  

<template>
    <div class="GoodDec_top">
       <img :src="goodsDetail.goodsPictureName&&require('@/assets/images/goods/'+goodsDetail.goodsPictureName)" alt="">
       <h1>{{goodsDetail.goodsName }}</h1>
       <h2>价格:{{ goodsDetail.goodsPrice }}￥</h2>
       <p>{{ goodsDetail.goodsDesc }}</p>
    </div>
    <van-button type="primary" :disabled="!goodsDetail.goodsNum" @click="handleAddCar">增加商品数量</van-button>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { useRouter,useRoute } from "vue-router";
  import { useStore } from 'vuex';
  import{getGoodsDetailApi,addCarApi} from '../utils/request' 
    // 定义一个对象类型
    type goodsDetail={
      goodsPictureName:string,
      goodsDesc:string,
      goodsName:string,
      goodsPrice:string,
      goodsNum:string,
      id?:number
    }
  @Options({
    components:{
     
    },
  })
  export default class GoodDec extends Vue {
      route=useRoute()
      Router=useRouter()
      store=useStore()
      // 创建一个对象
      goodsDetail:goodsDetail={
        goodsPictureName:'',
      goodsDesc:'',
      goodsName:'',
      goodsPrice:'',
      goodsNum:'',
      }
      // 增加商品数量请求
      handleAddCar=async():Promise<void>=>{
            const res:any= await addCarApi({
                  // 用户id 商品id 商品数量 请求成功后存储数量减1
              "userId":this.store.state.uInfo.id,
          "goodsId":this.goodsDetail.id,
          "goodsNum":1
            })     
            if(res.code==200){
                    this.Router.push({
                      name:'/ShopCar'
                    })
            }
      }
     public async mounted(){
        
        
      if(this.route.query.id){
        const res:any = await getGoodsDetailApi({
                  id:this.route.query.id
            })
            if(res.code==200){
                  const {goodsPictureName,goodsDesc,goodsName,goodsPrice,goodsNum,id}=res.body
              this.goodsDetail={goodsPictureName,goodsDesc,goodsName,goodsPrice,goodsNum,id}
            }
         

      }
          
     }
    
  
  }
  </script>
  <style lang="less" scoped>
        .GoodDec_top{
          img{
            width:300px;
          }
        }
  </style>
  
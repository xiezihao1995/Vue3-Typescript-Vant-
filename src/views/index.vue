<template>
  <div class="index_wrap">
    <navBar @devsearch="devsearch1" />
    <div class="my_pag">
        <!-- :initial-swipe 初始索引值  轮播图-->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="handleSwiper" :initial-swipe="activeIndex">
        <van-swipe-item v-for="item in goodslist" :key="item.id" @click="handleswipe">
    <img :src="require('@/assets/images/goods/'+item.goodsPictureName)" />
  </van-swipe-item>
      </van-swipe>
      <div class="tip">
            女装5折
      </div>
    </div>
    <!-- 推荐 -->
        <div class="goods_list">
            <h3>商品推荐</h3>
            <div class="flex-float"  >
                <div class="item flex" v-for="items in deail" :key="items.id" @click="toDetail(items.id)">
                    <img :src="require('@/assets/images/goods/'+items.goodsPictureName)" alt="">
                    <div>
                        <p>{{items.goodsName}}</p>
                        <p>价格:￥{{items.goodsPrice}}</p>
                    </div>
                    
                </div>  
            </div>  
        </div>
    <tabbar :active="0" />
  </div>
</template>
<script lang="ts">
import tabbar from "../components/tabbar.vue";
import navBar from "../components/navBar.vue";
import { lunbotu } from "../utils/request";
import { Options, Vue } from "vue-class-component";
import {goodslistType} from '../utils/interface'
import { useRouter } from "vue-router";


@Options({
  components: {
    tabbar,
    navBar,
  },
})

export default class index extends Vue {
    searchKey: string = ""; //定义一个值
    goodslist: goodslistType[] = []; //定义一个数组,goodslistType[]类似对象类型
    deail:goodslistType[] = [];
    activeIndex:number=0 //定义索引值
    router=useRouter()

devsearch1 = (val: string): void => {
    this.searchKey = val;
  };
//   请求轮播图数据
  getGoodsData = (): void => {
    lunbotu({
      currentPage: 1,
      size: 10,
    }).then((res: any) => {
      if (res.code == 200) {
        console.log(res);
        const resData=res.body.records
        this.goodslist=resData.slice(0,3)
        this.deail = resData.slice(3)
      }
    });
  };
//   轮播图事件
  handleSwiper(index):void{
    this.activeIndex=index  //轮播图索引(id)
  };
  handleswipe():void{
    this.router.push({
            path:'/GoodList',
            query:{
                id:this.goodslist[this.activeIndex].id
            }
    })
  }
  toDetail(id:number){
    this.router.push({
        path:'/GoodDec',
        query:{
          id
        }
      })
  }
  // 生命周期
  public mounted(): void {
    this.getGoodsData();
  }
}
</script>
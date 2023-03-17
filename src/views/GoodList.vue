<template>
  <div class="home">
    <navBar @devsearch="handleSearch" />
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset=80
      :immediate-check="false"
      class="List"
    >
      <van-cell v-for="item in goodsList" :key="item.id"  >
      <div class="goods_item" @click="handleToDetail(item.id)">
        <img :src="require('@/assets/images/goods/'+item.goodsPictureName)" alt="">
        <div class="good_Num">
          <h1>{{item.goodsName}}</h1>
          <p>价格:{{ item.goodsPrice }}￥</p>
          <p>库存:{{ item.goodsNum }}</p>
        
        </div>
      
      </div>
      </van-cell>
    </van-list>
    <tabbar />
  </div>
</template>
  
  <script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useRouter, useRoute } from "vue-router";
import { Store } from "vuex";
import tabbar from "../components/tabbar.vue";
import navBar from "@/components/navBar.vue";
import { goodslistType } from "../utils/interface";
import { Search } from "../utils/request";

//创建一个对象 type 对象名称={}
type ParamsType = {
  goodsName: string;
  currentPage: number;
  size: number;
};
@Options({
  components: {
    tabbar,
    navBar,
  },
})
export default class GoodList extends Vue {
  route = useRoute();
  router=useRouter()
  loading:boolean=false
  finished:boolean=false
  onLoad():void{
      // 加载下一页
    this.searchParams.currentPage+=1
    this.loading=true
    this.GetgoodList(true)
  }
  searchParams: ParamsType = {
    //定义一个对象
    goodsName: "",
    currentPage: 1,
    size: 10,
  };
  goodsList: goodslistType[] = []; //定义一个数组
  key: string = this.route.params.value as string; //接受传过来的值
  // 搜索事件
  handleSearch(value?: string): void {
    value ? (this.searchParams.goodsName = value) : null;
                this.GetgoodList(false)
    
  }
  // 判断输入是一个值就展示输入的数据，否则就展示整页的数据或者加载的数据
   GetgoodList(type:boolean){
          // 数据请求
          Search(this.searchParams).then((res: any) => {
            console.log(res);
            if(type){
              this.goodsList=[...this.goodsList,...res.body.records] //展示加载累加数据
            }else{
              this.goodsList=res.body.records  //展示搜索值的数据
            } 
              //没有数据展示了 
            if(res.body.total<=this.goodsList.length){
              this.finished=true  //数据加载完了
            }
            this.loading=false
    })
        
   }
  //  点击图片到增加购物数量界面
  handleToDetail(id:number):void{
      this.router.push({
        path:'/GoodDec',
        query:{
          id
        }
      })
  }
  // 生命周期
  public mounted() {
    console.log(this);
    this.searchParams.goodsName = this.key;
    this.handleSearch();
  }
}
</script>
  <style lang="less" scoped>
    .goods_item{
      display: flex;
      align-items: center;
        justify-content: center;
      img{
        width:50%;
      }
      margin-bottom: 16px;
      .good_Num{
          padding-left: 50px;
          .good_Num p{
         font-size: 30px;
      }
       h1{
        color: black;
      }
      }
      

    }
    .List{
      padding-bottom: 80px;
    }
</style>
  
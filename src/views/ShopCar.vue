<template>
  <div class="list_wrap">
    <!-- 添加地址 -->
    <div class="addAdress"  v-if="CarlistType.length">
      <div  v-if="getAddressType.length<=0"  class="add_Adress" @click="handleAddress">
        <van-icon name="plus" />  
               <span> 添加地址</span>
      </div>
      <div v-else>
              <div class="addres_box"  >
                      <p>姓名：{{ checkaddressobj.deliveryUserName }}</p>
                      <p>手机号码：{{checkaddressobj.deliveryUserPhone }}</p>
                      <p>地址：{{ checkaddressobj.deliveryUserAddress }}</p>
              </div>
             
      </div>
      <van-buttom @click="changeAddress">切换</van-buttom>
    </div>
       <!-- 自定义面板 -->
       <van-action-sheet v-model:show="addressShow" title="收货地址">
      <div>
        <div class="addres_box" v-for="item in getAddressType" :key="item.id" @click="checkAddress(item)">
                      <p>姓名：{{ item.deliveryUserName }}</p>
                      <p>手机号码：{{ item.deliveryUserPhone }}</p>
                      <p>地址：{{ item.deliveryUserAddress }}</p>
              </div>
            
      </div>
      <van-button @click="handleAddress">新增按钮</van-button>
    </van-action-sheet>


   <div  v-if="CarlistType.length">
    <div v-for="item in CarlistType" :key="item.id" class="shop_car">
      <img
        :src="require('@/assets/images/goods/' + item.goodsPictureName)"
        alt=""
      />
      <div>
        <p>商品名:{{ item.goodsName }}</p>
        <p>单价:{{ item.goodsPrice }}</p>
      </div>
      <!--数量增减器  -->
      <van-stepper
        v-model="item.goodsNum"
        min="0"
        :before-change="
          (value) => {
            return beforeChange(value, item);
          }
        "
      />
      <p>总价:{{ item.goodsPrice * item.goodsNum }}</p>
    </div>
   </div>
    <p v-else>暂无商品</p>
    <van-submit-bar :price="allprice" button-text="提交订单" @submit="onSubmit" class="submit" />
    <Tabbar />
    <!--添加地址弹框 -->
    <!-- beforeClose 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise -->
    <van-dialog v-model:show="Addressshow" title="添加地址" show-cancel-button  :before-Close="addressSubmit">
            <!-- 表单 -->
            <van-cell-group inset>
            <!-- 输入手机号，调起手机号键盘 -->
            <van-field v-model="formAddressobj.deliveryUserName" type="tel" label="姓名" />
            <van-field v-model="formAddressobj.deliveryUserPhone" type="number" label="手机号" />
            <van-field v-model="formAddressobj.deliveryUserAddress" type="textarea" label="地址"  rows=3 />
          </van-cell-group>
    </van-dialog>
  </div>
</template>
  
  <script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { getCar, addCarApi,getAddressApi,addAddressApi,addOrderApi } from "../utils/request";
import { goodslistType } from "../utils/interface";
import  Tabbar  from "@/components/tabbar.vue";
import { showToast } from 'vant';
@Options({
  components: {
    Tabbar
  },
})
export default class ShopCar extends Vue {
  route = useRoute()
  store = useStore()
  allprice:number=0 //定义总价
  addressShow:boolean=false
  CarlistType: goodslistType[] = []; //定义一个数组
  getAddressType:any[]=[]
  checkaddressobj:any={} //定义切换显示到屏幕上的地址对象
  formAddressobj:any={
        userId:this.store.state.uInfo.id,
      deliveryUserName:'',
      deliveryUserPhone:'',
    deliveryUserAddress:''
      }
  Addressshow:boolean=false
  //@Watch('监控的值',{深度监控,立即执行})
  @Watch('CarlistType',{deep:true,immediate:true})
  onCarlistType(val:goodslistType[],oldval:goodslistType[]){
          this.allprice=this.countPrice()
  }
  // 提交订单事件
  onSubmit=async():Promise<void>=>{
        const res:any= await addOrderApi({
                userId:this.store.state.uInfo.id,
                addressId:this.checkaddressobj.id
        })
       if(res.code==200){
            
       }
        
  }
  // 计算总价
  countPrice=():number=>{
        let price=0
        this.CarlistType.forEach(el=>{
          price=price+(el.goodsNum*el.goodsPrice)
        })
        return price*100
  }
  // 增减库量的请求接口
  beforeChange = async (
    value: string,
    item: goodslistType
  ): Promise<boolean> => {
    const res: any = await addCarApi({
      // 用户id 商品id 商品数量
      userId: this.store.state.uInfo.id,
      goodsId: item.id,
      goodsNum: value,
    });
    console.log(res);

    if (res.code == 200) {
        if(value=='0'){
            this.init()
        }
      return true;
    } else {
      return false;
    }
  };
  // 切换地址事件
  checkAddress=(item:any)=>{
    this.addressShow=false
    this.checkaddressobj=item
    
  }
  // 切换事件
  changeAddress=()=>{
  this.addressShow=true
  }
  // 点击确认提交表单
  addressSubmit= async(action:string):Promise<any>=>{
    // 验证手机号
    if(action=='confirm'){
          if(!/^1[3-9]\d{9}$/.test(this.formAddressobj.deliveryUserPhone)){
              showToast('请输入正确的手机号')
                return false
        }
              const res:any=await addAddressApi(
                this.formAddressobj
              )        
              console.log("新增地址",res);     
              if(res.code==200){
                  this.getAddress()//调用添加收货地址请求,新增的数据已经在getAddressApi接口内了

                 return true
              }
               return false
        }
      
          
  }
  handleAddress=()=>{
   this.Addressshow=true
  }
 // 添加收货地址请求
   getAddress=async():Promise<void>=>{
    const res:any = await getAddressApi({
        userId: this.store.state.uInfo.id,
      });
      if(res.code==200){
        console.log('收货地址',res);
        this.getAddressType=res.body
        this.checkaddressobj=this.getAddressType[0] //默认显示的地址
      }
   }
  init=async():Promise<void>=>{
          // 传用户的id，显示客户购买的东西
    if (this.store.state.uInfo.id) {
      const res: any = await getCar({
        userId: this.store.state.uInfo.id,
      });
      console.log(res);
      if (res.code == 200) {
        this.CarlistType = res.body.records;
        this.allprice=this.countPrice()
      }
    }
   
      this.getAddress()
  }
  // 定义生命周期
  public  mounted() {
      this.init()
    
  }
}
</script>
  <style lang="less" scoped>
.list_wrap {
  padding-bottom: 50px;
  background-color: #eeee;
  .shop_car {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  img {
    width: 300px;
  }
  .submit{
    bottom: 90px;
  }
  .addAdress{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 50px;
    margin-bottom: 30px;
    background-color: #fff;
    border-bottom: 2px solid black;
    .add_Adress{
      font-weight: bold;
      font-size: 30px;
    }
  }
  :deep .van-action-sheet{
    padding:25px ;
  
  .addres_box{
    font-size: 30px;
    border-bottom: 1px solid gray;
  }
  }
}
</style>
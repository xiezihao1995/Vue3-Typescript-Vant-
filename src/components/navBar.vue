<template>
    <van-nav-bar fixed placeholder >
        <template #title>
            <van-search  v-model="searchValue" @search="handleSearch" placeholder="请输入搜索关键词" />
        </template>
        </van-nav-bar>
</template>

<script lang="ts">
import {Options,Vue} from 'vue-class-component'
import { Prop,Emit } from 'vue-property-decorator';
import { useRouter } from 'vue-router';
@Options({})
export default class navBar extends  Vue{
    searchValue:string='';
    router=useRouter()
    // 搜索事件
    handleSearch=():void=>{
            this.devsearch()
            //传值给GoodsList组件
           this.router.push({
            name:'/GoodList',
            params:{
              value:this.searchValue
            }
           })
            
    }
    // 传值给父组件
    @Emit()
    devsearch():string{
            return this.searchValue
    }
}
</script>
<style lang="less" scoped>
  :deep .van-nav-bar__title{
    width: 100%;
    max-width: 100%;
  }
</style>
<template>
    <div class="login_wrap">
        <img src="../assets/img/shuiqiao.png" alt="">
        <div class="dengru">
                <img class="jhua_img"  src="../assets/img/juhua.png" alt=""     >
            <!-- 输入框 -->      
                <van-field v-model="username" class="input_name"  placeholder="请输入用户名" />
                <van-field v-model="password" class="input_name"  placeholder="请输入密码" />
                <van-button v-if="Loginstatus==1" type="primary" @click="hangLogin" >登入</van-button>
                <van-button v-if="Loginstatus==2" type="primary" @click="hangregister" >注册</van-button>
                <p class="sign">
                    <span @click="register">
                        {{Loginstatus==1?"去注册":"去登入"}}
                        </span>
                </p>
         
          
        </div>
    </div>
</template>
<script lang="ts">
import { Options,Vue } from 'vue-class-component';
import{LoginApi,registerApi} from'../utils/request' //引入put请求
import{useStore} from 'vuex'
import { useRouter } from 'vue-router';
import { showSuccessToast } from 'vant';
@Options({})
export default class Login extends Vue{
    // 获取到用户名和密码
    // 1:登入 2：去注册
    username:string=''
    password:string=''
    Loginstatus:number=1
    // 来回切换状态
    register(){
       this.Loginstatus=this.Loginstatus==1?2:1
    }
    store:any=useStore()
    router=useRouter()
    // 登入
    hangLogin(){
        LoginApi({
             "userName":this.username,
            "userPassword":this.password
        }).then((res:any)=>{
            console.log(res);
            // 将登入信息保存到本地存储
            if(res.code==200){
                showSuccessToast(res.message)
                localStorage.setItem('uInfo',JSON.stringify(res.body))
                this.store.commit('uInfo/setUInfo',res.body) //触发userinfo模块的函数
                // 登入成功跳转页面
                this.router.push({path:"/"})
            }
            
        })
           
            
    }
    // 注册
    hangregister(){
        registerApi({
             "userName":this.username,
            "userPassword":this.password
        }).then((res:any)=>{
            console.log(res);
            if(res.code==200){
                // 注册成功
                showSuccessToast(res.message)
                
            }
          
        })
        
    }
}
</script>
<style lang="less" scoped>

</style>
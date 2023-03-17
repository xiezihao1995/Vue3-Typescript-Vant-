const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    host:'localhost',
    port:888,
    proxy:{
      '/api':{
        target:'http://127.0.0.1:1228',//后端接口地址
        changOrigin:true,//是否跨域
        ws:true,//wdbsocke
        pathRewrite:{
          '^/api':''//不需要重复加/api
            // ngnix发现请求地址为http://localhost:8081/api发现带api就会做代理转发，去请求后端资源（当然这需要后端配置好）
        }
      }
    }
  
  }

})

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入flexible.js
import 'lib-flexible/flexible.js'
// 导入vant框架
import Vant from 'vant';
import 'vant/lib/index.css';
// 引入less
import './assets/less/index.less'

createApp(App).use(store).use(router).use(Vant).mount('#app')

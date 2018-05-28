/**
 * 导入App.vue 并且利用Vue框架把App.vue中内容渲染出来
 */
import Vue from 'vue' //相当于Node中 var Vue = require('vue')

//导入App.vue
import App from './App.vue' 
const path = require('path')
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import moment  from 'moment';
import iView from 'iview';
Vue.use(iView);
Vue.use(VueRouter)
import axios from 'axios'
Vue.prototype.$ajax=axios;
axios.defaults.baseURL="http://47.106.148.205:8899/"
Vue.use(ElementUI);

// 路由相关
// 导入定义好的组件
import goodsList from "./components/goods/goodslist.vue"
import goodsinfo from "./components/goods/goodsinfo.vue"
import 'element-ui/lib/theme-chalk/index.css'
import"./statics/site/css/style.css";
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    loading: path.join(__dirname,"src/statics/site/images/01.gif")
})
const router = new VueRouter({
    routes:[
        {path:'/', redirect:"/site/goods"},
        {path:'/site/goods', component:goodsList},
        {path:'/site/goodsinfo/:goodsId', component:goodsinfo},
    ]
})
// 定义全局过滤器

Vue.filter('dateFmt', (value)=>{
    return moment(value).format("YYYY-MM-DD")
  })
new Vue({
    el:"#app",
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    render:(h)=> h(App),
    router
    
})


import Vue from 'vue'; //相当于Node中 var Vue = require('vue')
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import axios from 'axios';
Vue.prototype.$ajax=axios;
axios.defaults.baseURL="http://47.106.148.205:8899/"
axios.defaults.withCredentials = true

// 路由相关
// 导入定义好的组件
import goodsList from "../components/goods/goodslist.vue";
import goodsinfo from "../components/goods/goodsinfo.vue";
// 导入购物车
import shopCar from "../components/shopcar/shopCar.vue";
// 导入订单
import order from "../components/order/order.vue";
//导入提交成功
import paySuccess from "../components/pay/paySuccess.vue";
import payOrder from "../components/pay/payOrder.vue"
import login from "../components/login/login.vue";

const router = new VueRouter({
    routes:[
        {path:'/', redirect:"/site/goods"},
        {path:'/site/goods', component:goodsList},
        {path:'/site/goodsinfo/:goodsId', component:goodsinfo},
        {path:'/site/shopCar',component:shopCar},
        {path:'/site/order/:goodsIds',component:order, meta: { needLogin: true }},
        {path:'/site/login',component:login},
        {path:'/site/payOrder/:orderid',component:payOrder, meta: { needLogin: true }},
        {path:'/site/paySuccess',component:paySuccess, meta: { needLogin: true }},
       
    ],
    
})
router.beforeEach((to, from, next) => {
    // console.log(to);
    
    if(to.path!='/site/login'){
        localStorage.setItem('lastVisitPath',to.path)
    }
    if(to.meta.needLogin){
        axios.get('site/account/islogin').then(res=>{
            if(res.data.code =="nologin"){
                router.push({path:'/site/login'})
            }else{
                next()
            }
        })
    }else{
        next()
    }
    
  });

  export default router
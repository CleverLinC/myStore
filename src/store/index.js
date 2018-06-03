import Vue from 'vue'; //相当于Node中 var Vue = require('vue')
import Vuex from 'vuex';
Vue.use(Vuex);

import {
    addLocalGoods,
    getTotalLocalCount,
    updataLocalGoods,
    deleteLocalGoods
} from '../common/localStorageHelper';

const store = new Vuex.Store({
    state: {
      goodsId:null,
      buyCount:null,
    },
    getters:{
        getTotalGoodsCount(state){

            // 不是第一次
            if(state.buyCount>0){
                return state.buyCount
            }else{
                return getTotalLocalCount()
            }
          
        }
    },
    mutations: {
      addGoods(state,goods){
        state.buyCount = addLocalGoods(goods)
      },
      updataGoods(state,goods){
        state.buyCount = updataLocalGoods(goods)
      },
      deteleGoods(state,goodsId){
        state.buyCount = deleteLocalGoods(goodsId)
      }
    }
    });
    export default store;

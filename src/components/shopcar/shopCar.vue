<template>
    <div>
         <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                  <tr v-for="item in goodsList" :key="item.id">
                                    <td width="48" align="center">
                                            <el-switch
                                                v-model="item.isSelected"
                                                active-color="#409eff"
                                                inactive-color="#555555">
                                          </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo">
                                            <img style="width:50px;height:50px;margin-right: 10px;" :src="item.img_url" alt="">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center"><inputnumber  @goodsCountChange="getChangeGoods"  :goodsCount="item.count" :goodsId="item.id"> </inputnumber></td>
                                    <td width="104" align="left">{{item.count * item.sell_price}}</td>
                                    <td width="54" align="center" @click="deleteGoods(item.id)">删除</td>
                                </tr>
                                <tr v-if="goodsList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="toIndex">继续购物</button>
                            <button class="submit" @click="goToOrder">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>

    </div>
</template>
<style scoped>

</style>

<script>
import inputnumber from "../subcomponents/inputnumber";

import {getLocalGoodsObj,
addLocalGoods} from "../../common/localStorageHelper.js"
   export default{
     data(){
       return{
         goodsList:[]
       }
     },
     components:{
         inputnumber
     },
     created(){
         this.getGoodsList()
     },
     computed:{
       getTotalCount(){
          let totalCount = 0;
          this.goodsList.forEach(item => {
              if(item.isSelected){
                  totalCount += item.count
              }
          });
           
          return  totalCount
       },
       getTotalPrice(){
           let totalPrice = 0;
          this.goodsList.forEach(item => {
              if(item.isSelected){
                  totalPrice += item.count * item.sell_price
              }
          });
          return totalPrice;
       }
     },
     methods:{
        getGoodsList(){
            const localGoodsObj = getLocalGoodsObj();

            const goodsIdArr = []
            for(const key in localGoodsObj){
                 goodsIdArr.push(key)
            };
            const url = `site/comment/getshopcargoods/${goodsIdArr.join(',')}`;

            this.$ajax.get(url).then(res=>{
                // 遍历
                res.data.message.forEach(item => {
                    item.count = localGoodsObj[item.id];
                    item.isSelected = true
                });
                     this.goodsList = res.data.message;
            })
        },
        // 商品数量改变
        getChangeGoods(goods){
            this.goodsList.forEach(item => {
              if(item.id==goods.goodsId){
                  item.count = goods.count
              }
              
          });
          this.$store.commit('updataGoods',goods)
        },
        // 删除商品
        deleteGoods(id){
        this.$confirm(`您确定要删除id为'${id}'的商品吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
         const index = this.goodsList.findIndex((goods)=>{
               return   goods.id == id
          })
          this.goodsList.splice(index,1);
          
          this.$store.commit('deteleGoods',id);
        }).catch(() => {
          console.log("已经取消了");
          
          });          
       
        },
        // 返回首页
        toIndex(){
           this.$router.push({path:"/"})
        },
        goToOrder(){
            
            const goodsArr = [];

            this.goodsList.forEach(item=>{
                if(item.isSelected){
                    goodsArr.push(item.id)
                }
            })

            this.$router.push({path:`/site/order/${goodsArr.join(',')}`})
          
            
        }
     }
} 
</script>

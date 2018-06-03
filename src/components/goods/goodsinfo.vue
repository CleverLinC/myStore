<template>
 <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section" v-if="goods.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                <div class="magnifier-container">
                                 <div class="images-cover"></div>
                                  <!--当前图片显示容器-->
                                 <div class="move-view"></div>
                                  <!--跟随鼠标移动的盒子-->
                                   </div>
                        <div class="magnifier-assembly">
           <div class="magnifier-btn">
        <span class="magnifier-btn-left">&lt;</span>
        <span class="magnifier-btn-right">&gt;</span>
    </div>
    <!--按钮组-->
    <div class="magnifier-line">
        <ul class="clearfix animation03">
            <li v-for="item in goods.imglist" :key="item.id">
                <div class="small-img">
                    <img :src="item.original_path" />
                </div>
            </li>
            
        </ul>
    </div>
    <!--缩略图-->
</div>
<div class="magnifier-view"></div>
<div></div>
</div>
</div>
                            <div class="goods-spec">
                
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                               <el-input-number v-model="num1" @change="handleChange" :min="1" :max="goods.goodsinfo.stock_quantity" ></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addToShopCar" ref="addToShopCartRef" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                
                                <ul>
                                    <li @click="isshow=false">
                                        <a href="javascript:;" :class="isshow?'':'selected'">商品介绍</a>
                                    </li>
                                    <li @click="isshow=true">
                                        <a href="javascript:;" :class="!isshow?'':'selected'">商品评论</a>
                                    </li>
                                </ul>
                             
                            </div>
                               </Affix>
                            <div class="tab-content entry" v-show="!isshow" style="display: block;" v-html="goods.goodsinfo.content">
                             
                            </div>
                            <div class="tab-content" v-show="isshow" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="commentText" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click='postComment' name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);" v-if="totalcount<=0" >暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentInfo" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                           <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalcount">
    </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goods.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time|dateFmt}}</span>
                                        </div>
                                    </li>
                                   
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterLeave"
    >
    <div v-show="imgshow" ref="imgReg" v-if="goods.imglist" class="animateImg">
        <img :src="goods.imglist[0].thumb_path" alt="">
    </div>
  </transition>
    </div>

    
</template>

   <style scoped>
@import "../../statics/site/js/jqimgzoom/css/magnifier.css";
 .animateImg {
        height: 50px;
        width: 50px;
        position: absolute;
        top: 0;
        left: 0;
        transition: all 1s;
    }
     .animateImg img {
        width: 100%;
        height: 100%;
    }
</style>
<script>
    import { Affix } from 'iview'

import "../../statics/site/js/jqimgzoom/js/magnifier.js";

export default {
  data() {
    return {
      goods: {},
      num1:1,
      isshow:false,
      totalcount:null,
      pageIndex:1,
      pageSize:5,
      commentInfo:[],
      imgshow:false,
      addToShopCartOffset:null,
      shoppingCartCountOffset:null,
    };
  },
  created() {
    this.getGoodsinfo();
    this.getGoodsCommet()
  },
  methods: {
    getGoodsinfo() {
      const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`;
      this.$ajax.get(url).then(response => {
        // console.log(response);
        this.goods = response.data.message;
      });
    },
    getGoodsCommet(){
        const url =`site/comment/getbypage/goods/${this.$route.params.goodsId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        this.$ajax.get(url).then(response => {
        console.log(response);
        this.totalcount = response.data.totalcount;
        this.commentInfo=response.data.message;

        setTimeout(()=>{
            this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset();
           $(this.$refs.imgReg).css({
               left:this.addToShopCartOffset.left,
               top:this.addToShopCartOffset.top
           })
            this.shoppingCartCountOffset = $('#shoppingCartCount').offset()
        },200)
      });
    },
     handleChange(value) {
        console.log(value);
      },
    //   页容量
     handleSizeChange(val) {
      this.pageIndex=1;
      this.pageSize=val;
      this.getGoodsCommet()
      },
    //   页码发生改变
      handleCurrentChange(val) {
          this.pageIndex=val
      this.getGoodsCommet()
      },
//    获取评论内容
      postComment(){
            const commenttxt = this.$refs.commentText.value
               if(commenttxt.trim().length==0){
                   return this.$message({
                     message: '请输入评论内容',
                     type: 'warning'
                     });
               }
            const url= `site/validate/comment/post/goods/${this.$route.params.goodsId}`;
            this.$ajax.post(url,{commenttxt}).then((res)=>{
                    if(res.data.status!=0){
                        this.$message({
                     message: '评论失败,请再试一次',
                     type: 'warning'
                     });
                     this.$refs.commentText.value = ""
               }else{
                   this.$message({
                     message: '评论成功了哦',
                     type: 'success'
                     });
                     this.getGoodsCommet();
                     this.$refs.commentText.value = ""
                     
               }
               
                    
            })
      },
      beforeEnter(el){
             el.style.left = this.addToShopCartOffset.left + 'px'
                el.style.top = this.addToShopCartOffset.top + 'px'
                el.style.transform = "scale(1)"
      },
      enter(el,done){
              el.offsetWidth;
              el.style.left = this.shoppingCartCountOffset.left-30 + 'px'
                el.style.top = this.shoppingCartCountOffset.top-10 + 'px'
                el.style.transform = "scale(0.5)";
                done()
      },
      afterLeave(el){
          this.imgshow = false;
      },
      addToShopCar(){
          this.imgshow = true;

          const goods = {
              goodsId:this.$route.params.goodsId,
              count:this.num1
          };
          this.$store.commit("addGoods",goods)
      }
    },


  watch: {
    $route: function(newV, oldv) {
      //  路由发生变化
      // 重新加载
      this.getGoodsinfo();
       this.getGoodsCommet()
    }
  },
  updated() {
    $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
  }
};
</script>

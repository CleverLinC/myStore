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
                                <li class="active">
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
                      <el-form ref="ruleForm" :model="orderInfo" :rules="rules"   label-width="100px" size="mini">
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>   
                      
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                           
                                     <el-form-item label="收货人姓名:" prop="accept_name">
                                     <el-input v-model="orderInfo.accept_name" ></el-input>
                                     </el-form-item>
                                <el-form-item label="所属区域:" prop="area">
                                     <v-distpicker  :province="orderInfo.area.province.value" :city="orderInfo.area.city.value" :area="orderInfo.area.area.value"></v-distpicker>
                                     </el-form-item>
                               
                               <el-form-item label="详细地址:" prop="address">
                                <el-input v-model="orderInfo.address"></el-input>
                                  </el-form-item>
                                <el-form-item label="手机号码:" prop="mobile">
                                <el-input v-model="orderInfo.mobile"></el-input>
                                  </el-form-item>
                              <el-form-item label="电子邮箱:" prop="email">
                                <el-input v-model="orderInfo.email"></el-input>
                                  </el-form-item>
                               <el-form-item label="邮政编码:" prop="post_code">
                                <el-input v-model="orderInfo.post_code"></el-input>
                                  </el-form-item>
                            </div>
                   
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                     <el-radio v-model="orderInfo.payment_id" label="6">在线支付</el-radio>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable -->
                                <li> 
                                    <el-radio-group v-model="orderInfo.express_id" @change='expressChange' >
                                     <el-radio  label="1">顺丰快递(20元)</el-radio>
                                     <el-radio  label="2">圆通快递(10元)</el-radio>
                                     <el-radio  label="3">韵达快递(8元)</el-radio>
                                     </el-radio-group>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody v-if="goodsList.length>0">
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                {{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                               {{item.totalamount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" class="input" v-model='orderInfo.message' style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{orderInfo.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{orderInfo.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getPayAmount}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <a id="btnSubmit" @click="goToOrder" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                          </el-form>
                </div>
            </div>
        </div>
    </div>
        


</template>
<script>
import VDistpicker  from 'v-distpicker';
import {getLocalGoodsObj} from "../../common/localStorageHelper.js";
export default {
  components:{ VDistpicker },
  
  data() {
       var checkMobile = (rule, value, callback) => {
           var reg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
            if (!reg.test(value)) {
              callback(new Error('手机号码非法'));
            } else {
              callback();
          }
        
       };
    return {
        //   商品
     goodsList:[],
    //   总数量
     totalCount:null,
   
    
      orderInfo: {
        accept_name:"赵坚强",
        address:"中粮",
        mobile:"13838438688",
        email:"",
        post_code:"",
        area:{
            province: { code: "440000", value: "广东省" },
            city: { code: "440300", value: "深圳市" },
            area: { code: "440306", value: "宝安区" }
        },
        express_id:'1',
        payment_id:"6",
        expressMoment:20,
        message:"快点发货哟",
        goodsids:"",
        cargoodsobj:{},
        goodsAmount:0,
      },
      
    

      rules: {
           accept_name: [
            { required: true, message: '请输入收货人姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
           address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
         
          ],
          mobile:[
            { required: true,  validator: checkMobile, trigger: 'blur' },
          ],
          area:[{
              required: true, message: '请选择地址', trigger: 'blur'
          }]
      },
    }
   },
      created(){
          this.showGoods()
      },
      computed:{
         getPayAmount(){
             return this.orderInfo.goodsAmount + this.orderInfo.expressMoment
         }
      },
      methods:{
          onSelected(data) {
                this.orderInfo.area = data
            },
          showGoods(){
             this.orderInfo.goodsids =  this.$route.params.goodsIds
              const url =`site/validate/order/getgoodslist/${this.orderInfo.goodsids}`;
                const goodsObj = getLocalGoodsObj()
                this.orderInfo.cargoodsobj = goodsObj;
              this.$ajax.get(url).then(res=>{
                //   临时总数量
                    let totalCount = 0;
            //    临时总价格
                     let totalPrice = 0;
                     res.data.message.forEach(item=>{
                            item.buycount = goodsObj[item.id]
                            totalCount +=item.buycount ;
                            item.totalamount = item.buycount*item.sell_price;
                            totalPrice +=  item.totalamount ;

                     })
                      this.totalCount = totalCount ;
                      this.orderInfo.goodsAmount =totalPrice
                      this.goodsList= res.data.message;;
                     
              })
          },
        //   当切换快递方式之后
          expressChange(label){
              switch (label){
                case "1" :
                    this.orderInfo.expressMoment = 20 ;
                    break;
                case "2" :
                    this.orderInfo.expressMoment = 10 ;
                    break;
                case "3" :
                    this.orderInfo.expressMoment = 8 ;
                    break;
                default:
                    break;
              }
          },
          goToOrder(){
              
                 this.$refs.ruleForm.validate((valid) => {
                if (valid) {
               const url ='site/validate/order/setorder';
               this.$ajax.post(url,this.orderInfo).then(res=>{
                    if(res.data.status==0){
                        const orderid = res.data.message.orderid;

                        this.$router.push({path:`/site/payOrder/${orderid}`})

                        // 删除本地已下过单的商品
                        const tempArr = this.$route.params.goodsIds.split(",")
                        tempArr.forEach(goodsId=>{
                            this.$store.commit('deteleGoods',goodsId)
                        })
                    }
                 
             })
            
          } else {
            
             this.$message.error('请完善订单信息!');
            
          }
        });
       },
    
          
      },
      
    };
  

</script>

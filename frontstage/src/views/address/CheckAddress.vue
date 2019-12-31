<template>
    <div class="checkout">
        <div class="wrap">
            <div class="page-order-checkout">
                <div class="page-order-checkout-wrap">
                    <div class="b1 icon_arrow">
                        <a href="/addresslist" :data="address" v-if="address">
                            <div class="b11"><p><span>{{address.name}}</span><span>{{address.tel}}</span></p></div>
                            <div class="b13"><p>{{address.province+' '+address.city+' '+address.area+' '+address.detail}}</p></div>
                        </a>
                        <a href="/addresslist" v-else>
                            <div class="b11"><p><span>亲，您还没有选择送货地址哦</span></p></div>
                            <div class="b13"><p>请点击这里选择/新建送货地址</p></div>
                        </a>
                    </div>
                    <div class="ui_line"></div>
                    <div class="b2">
                        <ul>
                            <li class="on"><a href="javascript:;" class="alipaywap">微信支付</a></li>
                            <li class=""><a href="javascript:;" class="">货到付款</a></li>
                        </ul>
                    </div>
                    <div class="ui_line"></div>
                    <div class="b8">
                        <div class="b8w" v-for="goods in carts">
                            <div class="b81">
                                <div class="img"><img :src="goods.product.image | checkUrl" >
                                </div>
                            </div>
                            <div class="b82">
                                <div class="name"><p>
                                    <span>{{goods.product.name}}</span></p></div>
                            </div>
                            <div class="b83">
                                <div class="price"><strong>{{goods.product.price}}元</strong></div>
                            </div>
                        </div>
                        </div>
                    <div class="ui_line"></div>
                    <div class="b5">
                        <div class="b51"><p><strong>商品价格：</strong><span>{{checkTotalPrice}}元</span></p></div>
                        <div class="b53"><p><strong>配送费用：</strong><span>0元</span></p></div>
                    </div>
                    <div class="b7">
                        <div class="b71"><span>共{{checkTotalNum}}件 合计: </span><strong>{{checkTotalPrice}}元</strong></div>
                        <div class="b72"><a href="javascript:;" class="ui-button"><span>去付款</span></a></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>


    export default {
        name: "CheckAddress",
        data(){
          return{
              address:{},
              carts:[],

          }
        },
        filters:{
            checkUrl(val) {
                if(val==null){
                    return val='';
                }else{
                    if(val.substr(0,4)=='http'){
                        return val=val;
                    }else {
                        return val='http://images.canon4ever.com/' + val
                    }
                }
                // return val == null || val.match('http://images.canon4ever.com/') ? val : 'http://images.canon4ever.com/' + val
            },
        },
        computed:{
            checkTotalNum(){
                let totalNum =0
                this.carts.map((item)=>{
                    totalNum+=item.num
                })
                return totalNum
            },
            checkTotalPrice(){
                let totalPrice =0
                this.carts.map((item)=>{
                    totalPrice+=item.product.price*item.num
                })
                return totalPrice
            },
        },
        created(){
            this.axios.get(`api/order/checkout`).then(res=>{
                this.address = res.data.address
                this.carts = res.data.carts

                console.log(res)
            })
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="cartList">
        <div id="wrapper">
            <div class="cart-index">
                <div class="cart-index-wrap" >
                    <div class="cart-list">
                        <ul>
                            <li class="item" v-for="(item,index) in carts">
                                <div class="ui-box">
                                    <div class="imgProduct"><a href="/1/#/product/view?product_id=1153200008"><img
                                            :src="item.product.image|checkUrl"></a></div>
                                    <div class="info ui-box-flex">
                                        <div class="name">
                                            <span>{{item.product.name}}</span>
                                        </div>
                                        <div class="price">
                                            <p>
                                                <span>售价：</span><span>{{item.product.price}}元</span>
                                                <span>合计：</span><span>{{Number(item.product.price)*Number(item.num)}}元</span>
                                            </p>
                                            <div class="tip">
                                                <span style="display: none;">请于2016/04/11 00:58前下单，逾期将失效。</span>
                                            </div>
                                        </div>
                                        <div class="num">
                                            <div class="xm-input-number">
                                                <div class="input-sub"  :class="{active: item.num>1}" @click="changeNum(item,'dec')"></div>
                                                <div class="input-num"><span>{{item.num}}</span></div>
                                                <div class="input-add active" @click="changeNum(item,'inc')"></div>
                                            </div>
                                            <div class="delete">
                                                <a href="javascript:;" @click="handleDelete(item,index)" >
                                                    <span class="fa fa-trash-o"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="append"></div>
                            </li>

                        </ul>
                    </div>
                    <div class="pointBox">
                        <div class="point" style="display: none;"><span class="act act_special">包邮</span><span></span></div>
                        <div class="point">
                            <p>温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</p>
                        </div>
                    </div>

                    <!-- Navbar -->
                    <div class="bottom-submit ui-box">
                        <div class="price"><span>共{{checkTotalNum}}件 金额：</span><br><strong>{{checkTotalPrice}}</strong><span>元</span></div>
                        <div class="btn">
                            <a class="ui-button ui-button-disable" href="/about">
                                <span>继续购物</span>
                            </a>
                        </div>
                        <div class="btn"><a class="ui-button"
                                            href="/1/#/order/checkout?address_type=common"><span>去结算</span></a></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "Cartlist",
        data(){
            return{
                carts:[],
                count:{},
                changing:false,
            }
        },
        filters:{
            checkUrl(val){
                if(val==null){
                    return val='';
                }else{
                    if(val.substr(0,4)=='http'){
                        return val=val;
                    }else {
                        return val='http://images.canon4ever.com/' + val
                    }
                    console.log(val)
                }
            },
        },
        created(){
            this.axios.get('/api/cart').then(res=>{
                this.carts=res.data.carts
                console.log(this.carts);
            })
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
        methods:{

            changeNum(goods,type){
                if(type=='dec' && goods.num<=1){
                    // this.changing=false
                    return false
                }else {
                    if (!this.changing){
                        this.changing=true

                        this.axios.patch(`api/cart`, {cart_id: goods.id, type: type}).then(res => {

                            this.changing = false
                            return type == 'inc' ? goods.num++ : goods.num--

                        })
                    }
                }



            },
            handleDelete(goods,index){
                this.axios.delete(`api/cart?cart_id=${goods.id}`).then(res=>{
                    console.log(index)
                    this.carts.splice(index,1)
                    if(this.carts.length==0){
                        this.$router.push({name:'emptycart'})
                    }
                })

            },

        },
    }
</script>

<style scoped>

</style>
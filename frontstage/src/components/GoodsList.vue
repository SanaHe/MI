<template>
    <div class="goodsList">
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
                                    <div class="input-sub"  :class="{active: item.num>1}" @click="changeNum({cart:item,type:'dec'})"></div>
                                    <div class="input-num"><span>{{item.num}}</span></div>
                                    <div class="input-add active" @click="changeNum({cart:item,type:'inc'})"></div>
                                </div>
                                <div class="delete">
                                    <a href="javascript:;" @click="handleDelete({cart:item,index:index})" >
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
    </div>
</template>

<script>
    import { mapState , mapActions } from 'vuex'

    export default {
        name: "GoodsList",
        computed:mapState([
            'carts'
        ]),
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
        methods:{
            ...mapActions([
                'changeNum',
                'handleDelete'
            ])
        }
    }
</script>

<style scoped>

</style>
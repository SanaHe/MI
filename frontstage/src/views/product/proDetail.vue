<template>
    <div class="proDetail">
        <div class="page-product-view" data-log="商品详情">

            <div class="header">
                <div class="left">
                    <a @click="goBack" class="home" data-stat-id="346f31c749f6e40d">
                        <img src="http://s1.mi.com/m/images/m/icon_back_n.png" class="ib">
                    </a><!--vue-if--><!--vue-if--></div><div class="tit"><!--vue-if-->
            </div>
                <div class="right">
                    <a href="javascript:;" data-event="30000000110001001" data-stat-id="6c93ea1c6bb6eb01" onclick="_msq.push(['trackEvent', '8fb4bea51daee8a5-6c93ea1c6bb6eb01', 'javascript:;', 'pcpid']);">
                        <div class="icon icon-search"></div>
                    </a>
                </div>
            </div>

            <div class="product-view" :data="proDetail">
                <div class="b1">
                    <img :src="proDetail.image |checkUrl">
                </div>
                <div class="b2">
                    <div class="b21">
                        <div class="b211">
                            <div class="name"><p>{{proDetail.name}}</p></div>
                            <div class="price"><strong>{{proDetail.price}}元</strong></div>
                        </div>
                        <div class="b212">
                            <div class="icon-fenxiang"></div>
                        </div>
                    </div>
                    <div class="b22">
                        <p>{{proDetail.description}}</p>
                    </div>
                </div>
                <div class="mt20" style="display: none;"></div>

                <!--<ul class="b3">-->
                <!--<li><span class="on">白色</span></li>-->
                <!--</ul>-->

                <ul class="b3" style="display: none;">
                    <li><span>通用</span></li>
                </ul>

                <div class="ui-b7">
                    <h3>为您推荐</h3>
                    <div class="ui-carousel-container">
                        <div class="ui-carousel-viewport">
                            <a v-for="item in recommends" @click="goRecommend(item.id)">-->
                                <img :src="item.image|checkUrl">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="b5">
                    <div class="b51"></div>
                    <div class="b52">
                        <div class="blc">
                            <ul>
                                <li>
                                    <div class="img" v-html="proDetail.markdown_html_code"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="b7">
                    <div class="b70">
                        <a href="/1/#/index">
                            <div class="icon-home"></div>
                        </a>
                    </div>
                    <div class="b72">
                        <!--<a href="javascript:;" class="off">暂时缺货</a>-->
                        <a href="###" @click="addGoods(proDetail.id)">立即购买</a>
                    </div>

                    <div class="b73">
                        <a href="/1/#/cart/index">
                            <div class="icon-gouwuche"></div>
                        </a>
                    </div>
                </div>
                <a href="javascript:;" id="top" style="visibility: visible;">
                    <img src="http://s1.mi.com/m/images/m/top.png">
                </a>
            </div>
            <div class="share-component"></div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "pro_detail",
        data(){
          return{
              proDetail:{},
              recommends:[],
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
            this.getData()
        },
        methods:{
            getData(){
                let id = this.$route.params.id
                this.axios.get(`http://localhost:8000/api/product/view?id=${id}`).then(res=>{
                    console.log(res);
                    this.proDetail=res.data.product
                    this.recommends = res.data.recommends
                })
            },
            goBack(){
                this.$router.go(-1)
            },
            goRecommend(id){
                console.log(id)
                this.$router.push({name:'pro_detail',params:{id:id}})
                this.getData()
            },
            addGoods(id){
                console.log(id)
                this.axios.post(`/api/cart`, {product_id:id}).then(res=>{
                    this.$router.push({name:'shortcart'})
                })
            }
        },
    }
</script>

<style scoped>

</style>
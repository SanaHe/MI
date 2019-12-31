<template>
    <div class="footWrap">
        <div class="footer">
            <a class="row" href="/">
                <i class="fa fa-home" style="font-size:25px;"></i>
                <span>商城</span>
            </a>
            <a class="row" href="/about">
                <i class="fa fa-book" style="font-size:25px;"></i>
                <span>分类</span>
            </a>
            <a class="row" @click="toCart">
                <i class="fa fa-shopping-cart" style="font-size:25px;"></i>
                <span>购物车</span>
            </a>
            <a class="row" href="###">
                <i class="fa fa-user-circle-o" style="font-size:25px;"></i>
                <span>服务</span>
            </a>
        </div>
    </div>
</template>

<script>

    export default {
        name: "ifooter",

        methods:{

            toCart(){
                this.axios.get(`/api/cart`).then(res=>{
                    this.carts = res.data.carts
                    this.count = res.data.count
                    // console.log(res);
                    if(this.carts.length==0){
                        this.$router.push({name:'emptycart'})
                    }else{
                        this.$router.push({name:'shortcart'})
                    }
                })
            }
        }


    }
</script>

<style>
    .footWrap{
        position: fixed;
        z-index: 10;
        bottom: 0;
        width: 100%;
    }
    .footer{
        display: flex;
        flex-direction: row;
        background-color: #ffff;
        padding: 8px 0;
        border-top: 1px solid #cccc;

    }
    .footer .row{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: grey;
        font-size: .87em;
    }
</style>
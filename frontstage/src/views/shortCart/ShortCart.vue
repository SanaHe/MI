<template>
    <div class="shortCart">
        <div id="wrapper">
            <div class="cart-index">
                <div class="cart-index-wrap" >
                    <GoodsList></GoodsList>
                    <div class="pointBox">
                        <div class="point" style="display: none;"><span class="act act_special">包邮</span><span></span></div>
                        <div class="point">
                            <p>温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</p>
                        </div>
                    </div>
                    <CartCount></CartCount>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import GoodsList from '@/components/GoodsList.vue'
    import CartCount from '@/components/CartCount.vue'

    export default {
        name: "ShortCart",
        data(){
          return{
              carts:[]
          }
        },
        components:{
            GoodsList,
            CartCount
        },
        created(){
            return this.$store.dispatch('getAllCarts')
        }
    }
</script>

<style scoped>

</style>
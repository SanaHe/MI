<template>
    <div class="cartCount">
        <div class="bottom-submit ui-box">
            <div class="price"><span>共{{checkTotal.num}}件 金额：</span><br><strong>{{checkTotal.price}}</strong><span>元</span></div>
            <div class="btn">
                <a class="ui-button ui-button-disable" href="/about">
                    <span>继续购物</span>
                </a>
            </div>
            <div class="btn">
                <a class="ui-button" href="/checkaddress"><span>去结算</span></a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "CartCount",
        computed:{
            ...mapGetters([
                'checkTotal',

            ])
        }
    }
</script>

<style scoped>

</style>
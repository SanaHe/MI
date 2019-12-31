<template>
    <div class="emptyCart">
        <div id="wrapper">
            <div class="cart-index">
                <div style="height:1rem;"></div>

                <div class="cart-index-wrap">
                    <div class="empt">
                        <div class="b3">
                            <a href="/about" class="ui-button ui-button-disable">
                                <span>全部商品</span>
                            </a>
                            <a href="/" class="ui-button">
                                <span>精选商品</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Ifooter></Ifooter>
    </div>
</template>

<script>
    import Ifooter from '@/components/ifooter.vue'

    export default {
        name: "EmptyCart",
        components: {
            Ifooter
        },
    }
</script>

<style scoped>

</style>
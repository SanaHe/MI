<template>
    <div class="product_list">
        <div id="wrapper">
            <div class="page-list" data-log="商品列表">
                <ol class="version">
                    <li v-for="pro in pro_list">
                        <router-link v-bind:to="{name:'pro_detail',params:{id:pro.id}}">
                            <a class="version-item">
                                <div class="version-item-img">
                                    <img :src="pro.image|checkUrl">
                                </div>
                                <div class="version-item-intro">
                                    <div class="version-item-name"><p>{{pro.name}}</p></div>
                                    <div class="version-item-intro-price"><span>{{pro.price}}元</span></div>
                                </div>
                            </a>
                        </router-link>
                    </li>
                </ol>
            </div>
        </div>
        <Ifooter></Ifooter>
    </div>

</template>

<script>
    import Ifooter from '@/components/ifooter.vue'

    export default {
        name: "products",
        components: {
            Ifooter
        },
        data(){
            return{
                pro_list:[],
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
            console.log(this.$route)
            let id = this.$route.params.id
            this.axios.get(`http://localhost:8000/api/product/list?id=${id}`).then(res=>{
                this.pro_list=res.data
                console.log(res);
            })
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>
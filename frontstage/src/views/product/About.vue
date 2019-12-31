<template>
  <div class="category">
    <div id="wrapper">
      <div class="page-category" data-log="商品分类">

        <div class="page-category-wrap">
          <div class="list-wrap" v-for="item in categories">
            <h3 class="list_title">{{item.name}}</h3>
            <ol class="list_category">
                <li v-for="product in item.children">
                  <router-link v-bind:to="{name:'products',params:{id:product.id}}">
                      <div class="img"><img :src="product.image|checkUrl"></div>
                      <div class="name"><span>{{product.name}}</span></div>
                  </router-link>>
                </li>
            </ol>
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
    name: 'about',
    components: {
      Ifooter
    },
    data(){
      return{
        categories:{},
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
      this.axios.get(`http://localhost:8000/api/category`).then(res=>{

        this.categories = res.data
        console.log(res)
      })
    },
    methods:{
      handleGo(id){
        console.log(id)
        this.$router.push({name:'P_edit',params:{id:id}})
      }
    }
  }
</script>



<template>
  <div class="home">
    <div id="header">
      <swiper :options="swiperOption">
        <swiper-slide v-for="img in ads.slides">
          <img class="slides" :src="img.image | checkUrl" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div id="jump" class="banner" >
      <a href="###" v-for="ban in ads.banners">
        <img :src="ban.image | checkUrl" alt="">
      </a>
    </div>
    <div class="recommend">
      <a href="###" v-for="(rec,index) in recommends" >
        <div class="imgwrap" style="flex:1">
          <img :src="rec.image| checkUrl" alt="" >
          <span class="logo">新品</span>
        </div>
        <div class="about">
          <h2>{{rec.name}}</h2>
          <span class="info">{{rec.description}}</span>
          <span class="price">{{rec.price}}元</span>
        </div>
      </a>


      <button @click="moreRec">展开</button>
    </div>
    <Ifooter></Ifooter>
  </div>
</template>

<script>
// @ is an alias to /src
import Ifooter from '@/components/ifooter.vue'

export default {
  name: 'home',
  components: {
    Ifooter
  },
  data() {
    return {
      ads:{},
      recommends:[],
      counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      num : 3, // 一次显示多少条
      // pageStart : 0, // 开始页数
      // pageEnd : 0, // 结束页数
      // listdata: [], // 下拉更新数据存放数组
      // downdata: [], // 上拉更多的数据存放数组
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
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
      }
    },
  },
  created(){
    this.getlist()
  },

  methods:{
    getlist(){
      this.axios.get(`http://localhost:8000/api`).then(res=>{
        console.log(res)
        this.ads = res.data
        this.recommends = res.data.recommends.slice(0,this.num)
        console.log(this.recommends)
        // this.moreRec()
      })
    },
    moreRec(){
      console.log(this.recommends.length);
      this.axios.get(`http://localhost:8000/api`).then(res=>{
        this.recommends = res.data.recommends.slice(0,this.num+3)
        console.log()
        if(this.num<res.data.recommends.length){
          this.num=this.num+3
        }else {

        }

      })
    },
  }

}
</script>

<style>
  a{
    text-decoration: none;
  }
  .home{
    max-width: 550px;
  }
  .swiper-slide{
    display: flex;
  }
  .swiper-slide .slides{
    width: 100%;
  }
  .banner{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color: #F4F8F4;
  }
  .banner a{
    flex: 1;
    margin: 5px 3px;
  }
  .banner a img{
    width: 100%;
    height: 100%;
  }
  .recommend{
    display: flex;
    flex-direction: column;
    margin-bottom: 80px;
  }
  .recommend a{
    width: 100%;
    display: flex;
    flex: 1;
    flex-wrap: nowrap;
    text-decoration: none;
    color: grey;
    border-bottom:1px solid #ccc;
    padding: 10px 0;
    /*margin: 5px 3px;*/
  }
  .recommend .imgwrap{
    position: relative;
  }
  .recommend a img{
    /*flex: 1;*/
    width: 100%;
    height: 100%;

  }
  .recommend a .logo{
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    background-color: rgb(124 205 124);
    opacity: 0.9;
    color:#fff;
    font-size:1.2em;
    position: absolute;
    bottom: 22%;
    left: 1%;
  }
  .recommend a .about{
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .about h2{
    font-size: 1.4em;
    color: black;
  }
  .about .info{
    font-size: 1.1em;
  }
  .about .price{
    color: red;
    font-size: 1.2em;
  }


</style>

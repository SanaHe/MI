import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../http'
import router from '../router'

Vue.use(Vuex)
Vue.prototype.axios=axios

export default new Vuex.Store({
  state: {
    carts:[],
    changing:false,
  },
  getters:{
    checkTotal(state){
      let num=0,
          price=0
      state.carts.forEach(item=>{
        num+=item.num;
        price+=item.product.price*item.num
      })
      return {num:num,price:price}

    },

  },
  mutations: {
    setCarts(state,carts){
      state.carts=carts
    },
    changStatus(state,status){
      state.changing=status
    },
    changeNum(state,payload){
      // state.changing = num
      payload.type == 'inc' ? payload.cart.num++ : payload.cart.num--
    },



  },
  actions: {
    getAllCarts({commit}){
      axios.get('/api/cart').then(res=>{
        commit('setCarts',res.data.carts)

      })
    },
    changeNum({commit,dispatch},payload){
      if(this.state.changing){
        return false
      }

      console.log(payload)

      if(payload.type=='dec' && payload.cart.num==1){
        return false
      }
      commit('changStatus',true)
      axios.patch(`api/cart`, {cart_id: payload.cart.id, type: payload.type}).then(res => {
        commit('changeNum',payload)
        commit('changStatus',false)
      })
    },
    handleDelete({commit},payload) {
      axios.delete(`api/cart?cart_id=${payload.cart.id}`).then(res=>{
        this.state.carts.splice(payload.index,1)
        if(this.state.carts.length==0){
          router.push({name:'emptycart'})
        }
      })
    }


  },
  modules: {
  }
})

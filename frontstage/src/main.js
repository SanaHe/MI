import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './http'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VDistpicker from 'v-distpicker'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.prototype.axios=axios
Vue.component('v-distpicker', VDistpicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

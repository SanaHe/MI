import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/product/About.vue')
  },
  {
    path: '/products/:id',
    name: 'products',
    component: () => import('../views/product/Products.vue')
  },
  {
    path: '/pro_detail/:id',
    name: 'pro_detail',
    component: () => import('../views/product/proDetail.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/user/Register.vue')
  },
  {
    path: '/shortcart',
    name: 'shortcart',
    component: () => import('../views/shortCart/ShortCart.vue')
  },
  {
    path: '/checkaddress',
    name: 'checkaddress',
    component: () => import('../views/address/CheckAddress.vue')
  },
  {
    path: '/addresslist',
    name: 'addresslist',
    component: () => import('../views/address/AddressList.vue')
  },
  {
    path: '/newaddress',
    name: 'newaddress',
    component: () => import('../views/address/NewAddress.vue')
  },
  // {
  //   path: '/cartlist',
  //   name: 'cartlist',
  //   component: () => import('../views/cart/Cartlist.vue')
  // },
  // {
  //   path: '/emptycart',
  //   name: 'emptycart',
  //   component: () => import('../views/cart/EmptyCart.vue')
  // },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

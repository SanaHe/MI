import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Brand from '../components/brands/Home'
import Sbform from '../components/brands/sbform'
import Edit from '../components/brands/edit'
import Category from '../components/categories/Home'
import Subform from '../components/categories/subform'
import C_edit from "../components/categories/C_edit";
import Customers from "../components/customers/Customers";
import Product from "../components/product/Product";
import P_form from "../components/product/P_form";
import P_edit from "../components/product/P_edit";
import recycleBin from "../components/product/recycleBin";
import Charts from "../components/charts/Charts";
import Orders from "../components/orders/Orders";
import O_Info from "../components/orders/O_Info";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/brand',
        name: 'brand',
        component: Brand
    },
    {
        path: '/brand/:page',
        name: 'page',
        component: Brand
    },

    {
        path: '/sbform',
        name: 'sbform',
        component: Sbform
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: Edit
    },
    {
        path: '/cate',
        name: 'cate',
        component: Category
    },
    {
        path: '/subform',
        name: 'subform',
        component: Subform
    },
    {
        path: '/C_edit',
        name: 'C_edit',
        component: C_edit
    },
    {
        path: '/customers',
        name: 'customers',
        component: Customers
    },
    {
        path: '/product',
        name: 'product',
        component: Product
    },
    {
        path: '/P_form',
        name: 'P_form',
        component: P_form
    },
    {
        path: '/P_edit',
        name: 'P_edit',
        component: P_edit
    },
    {
        path: '/recycleBin',
        name: 'recycleBin',
        component: recycleBin
    },
    {
        path: '/charts',
        name: 'charts',
        component: Charts
    },
    {
        path: '/orders',
        name: 'orders',
        component: Orders
    },
    {
        path: '/O_info',
        name: 'O_info',
        component: O_Info
    },


];

const router = new VueRouter({
    routes
});

export default router;

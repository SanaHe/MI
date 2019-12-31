/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import App from './components/App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

window.Vue = require('vue');
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.prototype.axios = axios;

const app = new Vue({
    el: '#main',
    router,
    components: {App},
    template: '<App/>'
});

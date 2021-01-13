import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import './element.js'
import '@/style/common.scss'
import '@/style/iconfont.scss'

window.Vue = Vue;

//注册全局筛选器
import Filters from '@/filters'

Object.keys(Filters).forEach(filtName => {
    Vue.filter(filtName, Filters[filtName])
});
Vue.prototype.$filters = Vue.options.filters
Vue.config.productionTip = false;

window.globalVueApp = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#daydao-app')


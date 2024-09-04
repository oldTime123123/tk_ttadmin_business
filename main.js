/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-08-06 11:30:11
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-08-12 09:31:36
 * @FilePath: \1\web_business\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App'
import store from './store'
import {
	toast,
	px2rpx,
	getImageUri,
	copy
} from './utils/tools'
import Cache from './utils/cache'
import uView from "@/components/uview-ui";
import minxinsApp from '@/mixins/app'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import routerLink from './js_sdk/hhyang-uni-simple-router/link.vue'
// import i18n from './utils/lang.js';
import i18n from './lang/index'

// 注意：这种方式将会导入所有组件
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';

NutUI.install(Vue);

import {
	router,
	RouterMount
} from './router'
Vue.component('mescroll-body', MescrollBody)
Vue.prototype.$toast = toast
Vue.prototype.$Cache = Cache
Vue.prototype.$px2rpx = px2rpx
Vue.prototype.$getImageUri = getImageUri
Vue.prototype.$copy = copy
Vue.config.productionTip = false
Vue.component('RouterLink', routerLink)

Vue.use(router)
Vue.mixin(minxinsApp);
Vue.use(uView);
App.mpType = 'app'
const app = new Vue({
	...App,
	store,
	i18n
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import router from './router';
import VueRouter from 'vue-router';

import Goods from 'components/goods/goods';
import Ratings from 'components/ratings/ratings';
import Seller from 'components/seller/seller';

import 'common/stylus/index.styl';//引入主css文件 路径名需要在base中定义

const routes = [//设置路由的页面
  {
    path: '/goods',
    name: 'goods',
    component: Goods,
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: Ratings,
  },
  {
    path: '/seller',
    name: 'seller',
    component: Seller,
  }
];

var router = new VueRouter({
  routes: routes,
  linkActiveClass: 'active'//改变当前选中的路由
});

Vue.use(VueRouter);
router.push('/goods');//视频所讲router.go  改为push方法改变默认渲染的

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});

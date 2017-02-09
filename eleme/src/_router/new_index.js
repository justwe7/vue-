import Vue from 'vue';
import VueRouter from 'vue-router';
import Goods from 'components/goods/goods';
import Ratings from 'components/ratings/ratings';
import Seller from 'components/seller/seller';

Vue.use(VueRouter);

const routes = [
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
  },
]

var router = new VueRouter({
  routes: routes
});

export {
  router
}

// export default new Router({
//   routes: [
//     {
//       path: '/goods',
//       name: 'goods',
//       component: Goods,
//     },
//     {
//       path: '/ratings',
//       name: 'ratings',
//       component: Ratings,
//     },
//     {
//       path: '/seller',
//       name: 'seller',
//       component: Seller,
//     },
//   ],
// });

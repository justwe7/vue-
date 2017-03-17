<template>
  <div class="app">
    <tmp-header :seller="seller"></tmp-header>
    <!--v-bind:seller="seller"-->
    <nav class="tab border-1px">
      <div class="tab-item">
         <router-link to="/goods" title="商品">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </nav>
    <keep-alive>
      <!--生命周期不会重新加载数据  -->
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from 'common/js/util';
  import header from './components/header/header.vue';

  const ERR_OK = 0;//定义AJAX请求的状态码为

  export default {
    data(){
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created(){//学名叫钩子
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {//真实项目需要添加id信息参数  util封装获取url信息
        response = response.body;
        if (response.errno === ERR_OK){
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    },
    components: {
      'tmp-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";

  .app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        a
          display: block
          font-style: 14px
          color: rgb(77,85,93)
          &.active
            color: rgb(240,20,20)
</style>

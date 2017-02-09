<template>
  <div class="app">
    <tmpheader></tmpheader>
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
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';

  export default {
    components: {
      'tmpheader': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      //border-bottom: 1px solid rgba(7,17,27,0.1)
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

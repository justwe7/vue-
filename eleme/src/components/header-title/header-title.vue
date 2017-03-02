<template>
  <div class="tmptitle">
    <div class="line"></div>
    <div class="text">{{txt}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['txt']
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tmptitle
    display: flex
    margin: 30px auto 24px;
    width 80%
    .line
      flex 1
      position relative
      top -6px
      border-bottom: 1px solid rgba(255,255,255,0.2);
    .text
      padding: 0 12px
      font-size 14px
</style>

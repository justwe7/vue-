<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
    <!--header的头模板-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          seller: {
              type: Object
          }
      },
      created(){
          this.classMap = ['decrease','discount','guarantee','invoice','special'];
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .header
    color: #fff
    background: rgba(0,0,0,0.3)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display: inline-block
      .content
        display: inline-block
        vertical-align top
        margin-left:16px
        font-size 14px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            -webkit-background-size: 30px 18px
            background-size: 30px 18px
          .name
            margin-left:6px
            font-size 16px
            line-height: 18px
            font-weight: 700
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display inline-block
            vertical-align middle
            width 12px
            height 12px
            margin-right: 4px
            -webkit-background-size: 12px
            background-size: 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height 12px
            font-size 10px
      .support-count
        position absolute
        right 12px
        bottom 16px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius 14px
        background: rgba(0, 0, 0, 0.2)
        text-align center
        .count
          vertical-align top
          font-size 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size 10px

</style>

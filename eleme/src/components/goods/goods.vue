<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)">
            <!--currentIndex===index 为true时 current添加-->
            <span class="text border-1px">
              <b v-show="item.type>0" class="icon" :class="classMap[item.type]"></b>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
                <!--添加详情页对象-->
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                 :minPrice="seller.minPrice"></shopcart>
      <!--:selectFoods="selectFoods"-->
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BSscroll from "better-scroll";
  import shopcart from "components/shopcart/shopcart";
  import cartcontrol from "components/cartcontrol/cartcontrol";//购物车控制  增减
  import food from "components/food/food"; //商品详情
  /*
  * 引入模板组件  1. 引入文件  2.components参数设置标签名   3.模板页需要设置输出   4.使用自定义的标签名写到结构中
  * 从父级传入属性 :属性名="a"  然后子组件 props 参数接收参数
  *
  * computed 会监听 主动触发 数据变化就发生变化  计算属性   定义的参数reutrn返回可以直接在结构中使用
  * methods  被动触发  如添加事件
  * created 加载即触发
  * */


  const ERR_OK = 0;

  export default {
      props: {
          seller: {
              type: Object
          }
      },
      data() {
        return {
            goods: [],//接收传过来的数据
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        }
      },
      created() {
          this.classMap = ['decrease','discount','guarantee','invoice','special'],

          this.$http.get('/api/goods').then((response) => {
              response = response.body;
              if(response.errno === ERR_OK){
                this.goods = response.data;
                this.$nextTick(() => {//dom已经渲染完成  dom改变之后  如果操作原生的dom相关最好在此方法中
                  this._initScroll();
                  this._calculateHeight();
                });
//                console.log(this.goods)
              }
          })
      },
      computed: {//会实时变化
          currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
              let height1 = this.listHeight[i];
              let height2 = this.listHeight[i + 1];
              if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                return i;
              }
            }
            return 0;
          },
          selectFoods() {
              let foods = [];
              this.goods.forEach((good) => {//1.遍历所有的商品
                  good.foods.forEach((food) => {//2.遍历 所有菜品
                      if (food.count) {//3.菜品选择的数量大于1时（因在控制组件里添加了count属性） 将数组返回   每次改变  此方法都会重新调用  所以不会重复
                          foods.push(food);
                      }
                  });
              });
              return foods;
          }
      },
      methods: {
        selectMenu(index, event) {
          if (event._constructed) {//PC端会有两个点击事件，如果是自定义的滚动条触发点击
//            console.log(index,event)
            let foodList = this.$refs.foodList;
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el, 300);
          }
        },
        selectFood(food, event) {
          if (!event._constructed) {
            return;
          }
          this.selectedFood = food;
          this.$refs.food.show(); //访问原生dom  food.vue下的show方法
        },
        addFood(target) {
            /*
            * 1.在cartcontrol添加数据通信  click改变数据之后传入父级goods   再触发_drop方法
            * 2.之后再调用子组件的drop方法  （$refs访问原生dom对象）
            * */
          this._drop(target);
        },
        _drop(target) {
          // 体验优化,异步执行下落动画
          this.$nextTick(() => {
            this.$refs.shopcart.drop(target);
          });
        },
        _initScroll() {//自定义的滚动条
          /*如果需要获取原生的dom 可以加ref="menuWrapper" 属性来访问*/
          this.meunScroll = new BSscroll(this.$refs.menuWrapper, {
            click: true
          });

          this.foodsScroll = new BSscroll(this.$refs.foodsWrapper, {
            click: true,
            probeType: 3
          });

          this.foodsScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
          });
        },
        _calculateHeight() {
          let foodList = this.$refs.foodList;
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i];
            height += item.clientHeight;
//            console.log(height)
            this.listHeight.push(height);
          }
        }
      },
      components: {
        shopcart,  //相当于 shopcart : shopcart
        cartcontrol,
        food
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position relative
          z-index: 10
          margin-top: -1px
          background-color: #fff
          font-weight: 700
          .text
            border: none
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
            span
              white-space nowrap
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

<template>
  <div class="cart-box">
    <div class="cart-header">
      <van-nav-bar
        title="购物车"
        right-text="清空"
        @click-right="empty"
      />
    </div>
    <div class="cart-null-box" v-show="cartFoodCount === 0">
      <div class="cart-null">
        <i class="iconfont icon-hezi401"></i>
        <div class="text">您还没有添加商品哦~</div>
        <van-button size="small" class="cart-button" @click="tolink('/home')">去逛逛</van-button>
      </div>
    </div>
    <div class="cart-food" ref="cartFood" v-show="cartFoodCount > 0">
      <ul style="padding: 10px 0">
        <li class="food-list food-list-hook" v-for="goods in getCartGoods" :key="goods.id">
          <ul>
            <li
              class="food-item"
              v-for="(food, index) in goods.foods"
              v-if="food.count > 0"
              :key="index"
              @click="gothink(goods.id, food.id)">
              <div class="icon">
                <!--<img v-lazy="food.icon" :key="food.icon" width="57" height="57">-->
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span >好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <ball-buy :food="food" @buyCartBall="buyballDom">购物加减</ball-buy>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ballBuy from '../buyBall/buyball'
import { mapGetters } from 'vuex'
export default {
  name: 'cart',
  data () {
    return {
      foods: []
    }
  },
  computed: {
    ...mapGetters(['getCartGoods']),
    cartFoodCount () {
      let zhi = 0
      this.getCartGoods.forEach(function (item) {
        item.foods.forEach(function (food) {
          if (food.count) {
            zhi += food.count
          }
        })
      })
      return zhi
    }
  },
  mounted () {
    this.getCartFood()
  },
  methods: {
    buyballDom (msg) {
      this.$emit('cartBall', msg)
    },
    empty () {
      this.getCartGoods.forEach(function (item) {
        item.foods.forEach(function (food) {
          if (food.count) {
            food.count = 0
          }
        })
      })
    },
    getCartFood () {
      let _this = this
      this.$nextTick(function () {
        _this.cartScroll()
      })
    },
    cartScroll () {
      this.cartFoodScroll = new BScroll(this.$refs.cartFood, {
        click: true
      })
    },
    gothink (pid, id) {
      this.$router.push({
        path: '/food',
        query: {
          pid: pid,
          id: id
        }
      })
    },
    tolink (to) {
      this.$router.replace(to)
    }
  },
  watch: {
    '$route': 'getCartFood' // 监听路由重新加载滚动的dom，这样购物车的商品才不会不滚动
  },
  components: {
    ballBuy
  }
}
</script>
<style lang="scss">
  .cart-box {
    .van-nav-bar__right {
      .van-nav-bar__text {
        color: #fff;
        &:active {
          background-color: #37bd8a;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import "../../styles/mixins";
.cart-box {
  .cart-header {
    .van-nav-bar {
      background-color: #3cc591;
      color: #fff;
    }
  }
  .cart-null-box {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    .cart-null {
      margin: 20px 0;
      text-align: center;
      i {
        font-size: 60px;
        color: #ddd;
      }
      .text {
        color: #ddd;
        font-size: 12px;
        padding: 0 0 15px;
      }
      .cart-button {
        color: #fff;
        background-color: #3cc591;
        border: 1px solid #3cc591;
      }
    }
  }
  .cart-food {
    position: absolute;
    top: 46px;
    width: 100%;
    bottom: 50px;
    flex: 1;
    overflow: hidden;
    background-color: #f8f8f8;
    .food-item {
      display: flex;
      padding: 18px 10px;
      background-color: #fff;
      margin-bottom: 10px;
      @include border-1px(rgba(7, 17, 27, 0));
      &:last-child {
        @include border-none();
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra {
          line-height: 10px;
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 10px;
          bottom: 14px;
        }
      }
    }
  }
}
</style>

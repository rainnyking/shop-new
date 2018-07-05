<template>
  <div class="cart-box">
    <div class="cart-header">
      <van-nav-bar
        title="购物车"
        right-text="清空"
        @click-right="empty"
      />
    </div>
    <div class="cart-food">
      <ul>
        <li class="food-list food-list-hook" v-for="goods in getCartGoods" :key="goods.id">
          <ul>
            <li
              class="food-item border-1px"
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
                  <ball-buy :food="food">购物加减</ball-buy>
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
    ...mapGetters(['getCartGoods'])
  },
  mounted () {
    this.getFoodsItem()
  },
  methods: {
    empty () {
      console.log('1111111111')
    },
    getFoodsItem () {
      // let _this = this
      // this.getCartGoods.forEach(function (item) {
      //   item.foods.forEach(function (food) {
      //     if (food.count > 0) {
      //       _this.foods.push(food)
      //     }
      //   })
      // })
    },
    gothink (pid, id) {
      this.$router.push({
        path: '/food',
        query: {
          pid: pid,
          id: id
        }
      })
    }
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
  .cart-food {
    flex: 1;
    .food-item {
      display: flex;
      margin: 18px 10px;
      padding-bottom: 18px;
      @include border-1px(rgba(7, 17, 27, .1));
      &:last-child {
        @include border-none();
        margin-bottom: 0;
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
          right: 0;
          bottom: 14px;
        }
      }
    }
  }
}
</style>

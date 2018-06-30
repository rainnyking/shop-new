<template>
  <div>
    <div class="food">
      <div class="foodHeader">
        <div class="left">返回</div>
        <div class="title">{{food.name}}</div>
        <div class="right"></div>
      </div>
      <div class="food-content">
        <div class="food-image-banner">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item, index) in food.image" :key="index">
              <img v-lazy="item" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span></div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper" v-show="food.count > 0">
            <buy-ball :food="food">购物小球</buy-ball>
          </div>
          <div class="buy" v-show="!food.count || food.count === 0">
            加入购物车
          </div>
        </div>
        <div class="split"></div>
        <div class="info" v-if="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <div class="split"></div>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <div class="rating-wrapper">
            <ul style="">
              <li class="rating-item border-1px">
                <div class="user"><span class="name">3******c</span>
                  <img width="12" height="12" src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png" class="avatar">
                </div>
                <div class="time">2016-07-23 21:52</div>
                <p class="text"><span class="icon-thumb_up"></span>很喜欢的粥
                </p>
              </li>
              <li class="rating-item border-1px" style="display: none;">
                <div class="user"><span class="name">2******3</span> <img width="12" height="12" src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png" class="avatar"></div>
                <div class="time">2016-07-23 18:54</div>
                <p class="text"><span class="icon-thumb_up"></span>
                </p>
              </li>
              <li class="rating-item border-1px" style="display: none;">
                <div class="user"><span class="name">3******b</span> <img width="12" height="12" src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png" class="avatar"></div>
                <div class="time">2016-07-23 16:19</div>
                <p class="text"><span class="icon-thumb_down"></span>
                </p>
              </li>
            </ul>
            <div class="no-rating" style="display: none;">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buyBall from '../buyBall/buyball'
import { mapGetters } from 'vuex'
export default {
  name: 'food',
  data () {
    return {
      food: {}
    }
  },
  computed: {
    ...mapGetters(['getFoodContent'])
  },
  mounted () {
    this.getFoodContentData()
  },
  methods: {
    getFoodContentData () {
      let rid = this.$route.params.id
      this.food = this.getFoodContent(rid)
    },
    gothink (to) {
      this.$router.push(to)
    }
  },
  components: {
    buyBall
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/mixins";
  .food {
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*bottom: 48px;*/
    /*z-index: 30;*/
    /*width: 100%;*/
    /*background: #fff;*/
    .foodHeader {
      display: flex;
      height: 46px;
      align-items: center;
      text-align: center;
      line-height: 46px;
      .title {
        width: 60%;
      }
      .left,.right {
        flex: 1;
      }
    }
    .food-content {
      .food-image-banner {
        position: relative;
        img {
          display: block;
          width: 100%;
        }
        .back {
          position: absolute;
          top: 10px;
          left: 0;
          .icon-arrow_lift {
            display: block;
            padding: 10px;
            font-size: 20px;
            color: #fff;
          }
        }
      }
      .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .content {
        padding: 18px;
        position: relative;
        .title {
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
        }
        .detail {
          margin-bottom: 18px;
          line-height: 10px;
          height: 10px;
          font-size: 0;
          .sell-count, .rating {
            font-size: 10px;;
            color: rgb(147, 153, 159);
          }
          .sell-count {
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
          right: 12px;
          bottom: 12px;
        }
        .buy {
          position: absolute;
          right: 18px;
          bottom: 18px;
          z-index: 10;
          height: 24px;
          line-height: 24px;
          padding: 0 12px;
          box-sizing: border-box;
          border-radius: 12px;
          font-size: 10px;
          color: #fff;
          background: #17b356;
          &.fade-enter-active, &.fade-leave-active {
            transition: opacity .5s
          }
          &.fade-enter, &.fade-leave-active {
            opacity: 0
          }
        }
      }
      .info {
        padding: 18px;
        .title {
          line-height: 14px;
          margin-bottom: 6px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .text {
          line-height: 24px;
          padding: 0 8px;
          font-size: 12px;
          color: rgb(77, 85, 93);
        }
      }
      .rating {
        padding-top: 18px;
        .title {
          line-height: 14px;
          margin-left: 18px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .rating-wrapper {
          padding: 0 18px;
          .rating-item {
            position: relative;
            padding: 16px 0;
            @include border-1px(rgba(7, 17, 27, .1));
            .user {
              position: absolute;
              right: 0;
              top: 16px;
              line-height: 12px;
              font-size: 0;
              .name {
                display: inline-block;
                vertical-align: top;
                margin-right: 6px;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
              .avatar {
                border-radius: 50%;
              }
            }
            .time {
              margin-bottom: 6px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
            .text {
              line-height: 16px;
              font-size: 12px;
              color: rgb(7, 17, 27);
              .icon-thumb_up, .icon-thumb_down {
                margin-right: 4px;
                line-height: 16px;
                font-size: 12px;
              }
              .icon-thumb_up {
                color: rgb(0, 160, 220);
              }
              .icon-thumb_down {
                color: rgb(147, 153, 159);
              }
            }
          }
          .no-rating {
            padding: 16px 0;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
</style>

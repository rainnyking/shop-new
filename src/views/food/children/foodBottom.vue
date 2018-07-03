<template>
  <div class="food-bottom b-h-1px">
    <div class="bottom-item">
      <span>
        <van-icon name="like-o" />
      </span>
    </div>
    <div class="bottom-item">
      <span>
        <van-icon name="cart" />
      </span>
    </div>
    <div class="bottom-item-cart">
      <div>加入购物车</div>
    </div>
    <!--<div class="ball-container">-->
      <!--<div v-for="ball in balls" :key="ball.id">-->
        <!--<transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">-->
          <!--<div class="ball" v-show="ball.show">-->
            <!--<div class="inner inner-hook">-->
              <!--<img :src="innerImg">-->
            <!--</div>-->
          <!--</div>-->
        <!--</transition>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  name: 'food-bottom',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .food-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    text-align: center;
    line-height: 50px;
    .bottom-item {
      flex: 1;
      line-height: 62px;
      color: #666;
      span {
        i {
          font-size: 18px;
        }
      }
    }
    .bottom-item-cart {
      width: 62%;
      font-size: 16px;
      background-color: #00bd68;
      color: #fff;
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 60%;
      bottom: 22px;
      z-index: 200;
      .inner {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        img {
          display: block;
          width: 100%;
          vertical-align: center;
          border-radius: 50%;
          border: 2px solid #17b356;
        }
      }
      &.drop-enter-active {
        transition: all .4s cubic-bezier(.49, -0.29, .75, .41);
        .inner {
          transition: all .4s linear;
        }
      }
    }
  }
</style>

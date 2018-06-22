<template>
  <div>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count > 0" @click="reduce()">
          <span class="inner icon-remove_circle_outline iconfont icon-jian"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
      <div class="cart-add icon-add_circle iconfont icon-jia" @click="addCart()"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'buyball',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart () {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
        console.log(this.food)
      } else {
        this.food.count++
        console.log(this.food)
      }
    },
    reduce () {
      if (!this.food.count) return
      this.food.count--
      console.log(this.food)
    }
  }
}
</script>

<style lang="scss" scoped>
  .cartcontrol {
    font-size: 0;
    text-align: center;
    display: flex;
    align-items: center;
    .cart-decrease {
      display: inline-block;
      padding: 3px;
      flex: 1;
      .inner {
        display: inline-block;
        line-height: 24px;
        font-size: 22px;
        color: #17b356;
      }
      &.move-enter-active, &.move-leave-active {
        transition: all .5s;
        transform: translate3d(0, 0, 0);
        .inner{
          transition: all .5s;
          transform: rotate(0deg);
        }
      }
      &.move-enter, &.move-leave-to {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 26px;
      line-height: 24px;
      text-align: center;
      font-size: 16px;
      color: #666;
    }
    .cart-add {
      flex: 1;
      display: inline-block;
      line-height: 24px;
      font-size: 22px;
      padding: 3px;
      color: #17b356;
    }
  }
</style>

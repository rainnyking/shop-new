<template>
  <div class="wap">
    <keep-alive>
      <router-view @cartBall="cartBallFun"></router-view>
    </keep-alive>
    <div class="ball-container">
      <div v-for="ball in balls" :key="ball.id">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook">
              <img :src="innerImg">
            </div>
          </div>
        </transition>
      </div>
    </div>
    <van-tabbar v-model="menuActive">
      <van-tabbar-item icon="home" to="/home" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="more-o" to="/class" replace>分类</van-tabbar-item>
      <van-tabbar-item icon="cart" to="/cart" :info="cartCount === 0 ? '': cartCount" replace>购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/mine" replace>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  data () {
    return {
      menuActive: 0,
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      innerImg: ''
    }
  },
  computed: {
    ...mapGetters(['getCartGoods']),
    cartCount () {
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
  methods: {
    cartBallFun (msg) {
      console.log(msg.dom)
      this.drop(msg.dom)
      this.innerImg = msg.ico
    },
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          // 保存el
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter (el) {
      // console.log(el)
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          // getBoundingClientRect 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - (window.innerWidth * 0.6)
          let y = -(window.innerHeight - rect.top - 22)

          el.style.display = ''

          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`

          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter (el) {
      /* 触发浏览器重绘 */
      let rf = el.offsetHeight
      console.log(rf)
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'

        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
      })
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wap {
  .van-tabbar-item--active {
    color: #17b356;
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
}
</style>

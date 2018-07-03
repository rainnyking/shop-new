import { getDataGoodsApi } from '@/utils/api'
const cart = {
  state: { // 初始状态
    cartGoods: []
  },
  mutations: { // 当前 object 触发状态方法
    setCartGoodsFun (state) {
      // console.log(state.cartGoods)
      getDataGoodsApi().then(res => {
        res = res.data
        let oldGoodsData = state.cartGoods
        let newGoodsData = []
        if (oldGoodsData.length > 0) {
          res.goods.forEach(function (item, index) {
            item.foods.forEach(function (food, findex) {
              if (oldGoodsData[index].foods[findex].count) {
                food.count = oldGoodsData[index].foods[findex].count
              }
            })
          })
          newGoodsData = res.goods
        } else {
          newGoodsData = res.goods
        }
        state.cartGoods = newGoodsData
      }, res => {
        console.info('调用失败')
      })
    }
  },
  getters: { // 全局获得的变量接口
    getCartGoods: function (state) {
      return state.cartGoods
    },
    getFoodContent: function (state) {
      return function (id) {
        let foodItem = {}
        // console.log(state.cartGoods)
        state.cartGoods.forEach(function (item) {
          item.foods.forEach(function (food) {
            if (parseInt(food.id) === parseInt(id)) {
              foodItem = food
            }
          })
        })
        return foodItem
      }
    },
    getFoodList: function (state) {
      return function (pid) {
        let foodList = {}
        // console.log(state.cartGoods)
        state.cartGoods.forEach(function (item) {
          if (parseInt(item.id) === parseInt(pid)) {
            foodList = item
          }
        })
        return foodList
      }
    }
  },
  actions: { // 触发改变状态的方法   对外开放 object 触发状态方法
    setCartGoods (context) {
      context.commit('setCartGoodsFun')
    }
  }
}
export default cart

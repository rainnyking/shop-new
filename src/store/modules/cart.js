const cart = {
  state: { // 初始状态
    cartGoods: []
  },
  mutations: { // 当前 object 触发状态方法
    setCartGoodsFun (state, goods) {
      state.cartGoods = goods
    }
  },
  getters: { // 全局获得的变量接口
    getCartGoods: function (state) {
      return state.cartGoods
    },
    getFoodContent: function (state) {
      return function (id) {
        let foodItem = {}
        console.log(state.cartGoods)
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
        let foodList = []
        console.log(state.cartGoods)
        state.cartGoods.forEach(function (item) {
          if (parseInt(item.id) === parseInt(pid)) {
            foodList = item.foods
          }
        })
        return foodList
      }
    }
  },
  actions: { // 触发改变状态的方法   对外开放 object 触发状态方法
    setCartGoods (context, goods) {
      context.commit('setCartGoodsFun', goods)
    }
  }
}
export default cart

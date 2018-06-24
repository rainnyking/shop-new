<template>
  <div>
    <div v-for="item in getCartGoods" :key="item.id">
      <div v-for="food in item.foods" :key="food.id" v-if="food.count > 0">
        {{food.name}}/{{food.count}}
      </div>
    </div>
  </div>
</template>

<script>
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
    getFoodsItem () {
      // let _this = this
      // this.getCartGoods.forEach(function (item) {
      //   item.foods.forEach(function (food) {
      //     if (food.count > 0) {
      //       _this.foods.push(food)
      //     }
      //   })
      // })
    }
  }
}
</script>

<style scoped>

</style>

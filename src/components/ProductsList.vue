<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      src="https://i.imgur.com/JfPpwOA.gif"
    >
    <ul v-else>
      <li
        v-for="(product, index) in products"
        :key="index"
      >
      {{product.title}} - {{product.price | currency}} - {{product.inventory}}
      <button 
        :disabled="!productIsInStock(product) > 0"
        @click="addProductToCart(product)"
      >Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
// import shop from '@/api/shop'
// import store from '@/store/index'

export default {
  name: 'ProductList',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    products () {
      // getters to call computed method
      return this.$store.state.products
    },
    productIsInStock () {
      // getters to check product stock
      return this.$store.getters.productIsInStock
    }
  },
  methods: {
    addProductToCart (product) {
      this.$store.dispatch('addProductToCart', product)
    }
  },
  created () {
    // dispatch to call Action in store
    // (nameOfAction, payload)
    this.loading = true
    this.$store.dispatch('fetchProducts')
      .then(() => { this.loading = false })
  }
}
</script>

<style>

</style>
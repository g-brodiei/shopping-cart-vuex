import Vuex from 'vuex'
import Vue from 'vue'
// import shop from '@/api/shop'
// import actions from './actions'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    products
  },
  state: {
    // = data
  },

  getters: {
    // = computed properties, for filter or calculate on run time
  },

  actions: {},

  mutations: {
    // = simple, update just a piece of state
  }
})

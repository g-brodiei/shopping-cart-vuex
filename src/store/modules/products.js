import shop from '@/api/shop'
export default {
  state: {
    // {id, quantity}
    items: []
  },

  getters: {
    availableProducts (state, getters) { // state, getters
      return state.items.filter(product => product.inventory > 0)
    },

    productIsInStock () {
      return (product) => {
        return product.inventory > 0
      }
    }
  },

  actions: {
    fetchProducts ({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
          reject(new Error('is an error'))
        })
      })
    }
  },

  mutations: {
    setProducts (state, products) { // state, payload
      // update products
      state.items = products
    },

    decrementProductInventory (state, product) {
      product.inventory--
    }
  }
}

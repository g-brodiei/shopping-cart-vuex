import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    products: [],
    // {id, quantity}
    cart: [],
    checkoutStatus: null
  },

  getters: { // = computed properties, for filter or calculate on run time
    availableProducts (state, getters) { // state, getters
      return state.products.filter(product => product.inventory > 0)
    },

    cartProducts (state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal (state, getters) {
      // let total = 0
      // getters.cartProducts.forEach(product => {
      //   total += product.price * product.quantity
      // })
      // return total
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    },

    productIsInStock () {
      return (product) => {
        return product.inventory > 0
      }
    }
  },

  actions: { // = methods, should be complex, but never update the state.
    // make the call
    // run setProducts mutation
    // context.commit
    // context.state
    // destructuring javascript with {state, getters, commit} from context
    fetchProducts ({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
          // reject(new Error('is an error'))
        })
      })
    },

    addProductToCart ({state, getters, commit}, product) {
      if (getters.productIsInStock(product)) {
        // find cartItem
        const cartItem = state.cart.find(item => item.id === product.id)
        if (!cartItem) {
          // pushProductToCart
          commit('pushProductToCart', product.id)
        } else {
          // incrementItemQuantity
          commit('incrementItemQuantity', cartItem)
        }
        commit('decrementProductInventory', product)
      }
    },

    checkout ({state, commit}) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    }
  },

  mutations: { // = simple, update just a piece of state
    setProducts (state, products) { // state, payload
      // update products
      state.products = products
    },

    // const cartItem = {id: 123, quantity: 2}
    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },

    decrementProductInventory (state, product) {
      product.inventory--
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },

    emptyCart (state) {
      state.cart = []
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import route from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loaded: false,
    products: null,
    filteredProducts: null,
    params: {

    }

  },
  mutations: {
    fetchProducts(state, products) {
      state.products = products
    },
    filter(state, params) {
      for (var key in state.products) {
        if (key.toLowerCase().search(params.brand.toLowerCase()) !== -1) {
          state.filteredProducts = state.products[key]
        }
      }
      state.params = params
      console.log(state.filteredProducts, 'terfilter')
    }
  },
  actions: {
    fetchProducts({commit, state}) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/product',
      })
      .then( ({data}) => {
        commit('fetchProducts', data)
      })
      .catch( (err) => {
        alert('Failed while fetch data from server')
        console.log(err)
      })
    }
  }
})

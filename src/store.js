import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { isObject } from 'util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loaded: false,
    products: null,
    triggerFlag: false,
    flag: false,
    searched: false,
    searchedValue: [],
    filteredProducts: {
      data: []
    },
    chartdata: {
      labels: [],
      datasets: [
        {
            label: null,
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            data: []
        },
      ]
    },
    search: "",
    options: {
      responsive: true,
      maintainAspectRatio: false
    },
    params: {}

  },
  mutations: {
    search(state, searchValue) {
      console.log("masuk commit")
      state.search = searchValue
    },
    fetchProducts(state, products) {
      state.products = products
      state.flag = true
    },
    loaded(state) {
      state.loaded = true
    },
    filter(state, params) {

      state.triggerFlag = !state.triggerFlag
      state.params = params
      state.filteredProducts.data = []
      state.chartdata.labels = []
      state.chartdata.datasets[0].data = []
      state.searched = true
      let temp = []
      
      if (typeof params === "object") {
        for (var key in state.products) {
          if (key.toLowerCase().search(params.brand.toLowerCase()) !== -1) {
            state.products[key].data.forEach( (datum) => {
              temp.push(datum)
            })
          }
        }
      } else {
        for (var key in state.products) {
          if (key === params) {
            temp = state.products[key].data
          }
        }
      }

      state.searchedValue = temp;
      state.filteredProducts.data = temp;
      
      let year = {}

      state.filteredProducts.data.forEach( (datum) => {
        if (year[datum.date.substr(datum.date.length-4, datum.date.length)] === undefined) {
          year[datum.date.substr(datum.date.length-4, datum.date.length)] = []
          year[datum.date.substr(datum.date.length-4, datum.date.length)].push(datum)
        } else {
          year[datum.date.substr(datum.date.length-4, datum.date.length)].push(datum)
        }
      })

      for (var key in year) {
        if (key !== 'Date') {
          state.chartdata.labels.push(key)
          state.chartdata.datasets[0].data.push(year[key].length)
        }
      }

      // console.log(state.chartdata.labels, "labels")
      // console.log(state.chartdata.datasets[0].data, "data")
    },
    filterChart(state, params) {
      state.triggerFlag = !state.triggerFlag
      state.params = params
      state.searchedValue = [];
      state.chartdata.labels = []
      state.chartdata.datasets[0].data = []
      state.searched = true

      for (var key in state.products) {
        if (key === params) {
          state.searchedValue = state.products[key].data
        }
      }
      
      let year = {}

      state.searchedValue.forEach( (datum) => {
        if (year[datum.date.substr(datum.date.length-4, datum.date.length)] === undefined) {
          year[datum.date.substr(datum.date.length-4, datum.date.length)] = []
          year[datum.date.substr(datum.date.length-4, datum.date.length)].push(datum)
        } else {
          year[datum.date.substr(datum.date.length-4, datum.date.length)].push(datum)
        }
      })

      for (var key in year) {
        if (key !== 'Date') {
          state.chartdata.labels.push(key)
          state.chartdata.datasets[0].data.push(year[key].length)
        }
      }
    }
  },
  actions: {
    fetchProducts({commit, state}) {
      axios({
        method: 'get',
        url: 'http://3.17.28.74:3000/product',
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

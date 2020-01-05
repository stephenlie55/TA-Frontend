import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { isObject } from 'util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loaded: false,
    products: null,
    categories: null,
    searchTrigger: false,
    triggerFlag: false,
    productType: "",
    categoryFlag: false,
    flag: false,
    searched: false,
    showby: "",
    startDate: null,
    untilDate: null,
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
        {
            label: null,
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            data: [0, 0, 0]
        }
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
    changeProductType(state, productType) {
      state.productType = productType
    },
    fetchProducts(state, products) {
      state.products = products
      console.log(state.products, "ini produk")
      state.flag = true
    },
    fetchCategory(state, categories) {
      state.categories = categories
      state.categoryFlag = true
    }, 
    loaded(state) {
      state.loaded = true
    },
    filter(state, params) {

      state.triggerFlag = !state.triggerFlag
      state.productType = params.selectedCategory
      state.params = params
      state.showby = params.showby
      state.filteredProducts.data = []
      state.startDate = params.startDate
      state.untilDate = params.untilDate
      state.chartdata.labels = []
      state.chartdata.datasets[0].data = []
      state.chartdata.datasets[1].data = [0,0,0]
      state.searched = true
      let temp = []
      
      if (typeof params === "object") {
        console.log(params.startDate, "start tanggal")
        console.log(params.untilDate, "until tanggal")
        console.log(params.brand)
        for (var key in state.products) {
          if (key.toLowerCase().search(params.brand.toLowerCase()) !== -1) {
            if (params.startDate !== null) {
              state.products[key].data.forEach( (datum) => {
                if ( (new Date(datum.tanggal) >= new Date(params.startDate)) && new Date(datum.tanggal) <= new Date(params.untilDate) ) {
                  temp.push(datum)
                } 
              })
            } else {
              state.products[key].data.forEach( (datum) => {
                  temp.push(datum)
              })
            }
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
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      state.filteredProducts.data.forEach( (datum) => {
        if (year[datum.tanggal.substr(0, 4)] === undefined) {
          year[datum.tanggal.substr(0, 4)] = {
            "January": [],
            "February": [],
            "March": [],
            "April": [],
            "May": [],
            "June": [],
            "July": [],
            "August": [],
            "September": [],
            "October": [],
            "November": [],  
            "December": []
          }
          
          switch (monthNames[Number(datum.tanggal.substring(5, 7))]) {
            case "January":
                year[datum.tanggal.substr(0, 4)].January.push(datum)
              break;
            case "February":
                year[datum.tanggal.substr(0, 4)].February.push(datum)
              break;
            case "March":
                year[datum.tanggal.substr(0, 4)].March.push(datum)
              break;
            case "April":
                year[datum.tanggal.substr(0, 4)].April.push(datum)
              break;
            case "May":
                year[datum.tanggal.substr(0, 4)].May.push(datum)
              break;
            case "June":
                year[datum.tanggal.substr(0, 4)].June.push(datum)
              break;
            case "July":
                year[datum.tanggal.substr(0, 4)].July.push(datum)
              break;
            case "August":
                year[datum.tanggal.substr(0, 4)].August.push(datum)
              break;
            case "September":
                year[datum.tanggal.substr(0, 4)].September.push(datum)
              break;
            case "October":
                year[datum.tanggal.substr(0, 4)].October.push(datum)
              break;
            case "November":
                year[datum.tanggal.substr(0, 4)].November.push(datum)
              break;
            case "December":
                year[datum.tanggal.substr(0, 4)].December.push(datum)
              break;
            default:
              break;
          }
        } else {
          
          switch (monthNames[Number(datum.tanggal.substring(5, 7))]) {
            case "January":
                year[datum.tanggal.substr(0, 4)].January.push(datum)
              break;
            case "February":
                year[datum.tanggal.substr(0, 4)].February.push(datum)
              break;
            case "March":
                year[datum.tanggal.substr(0, 4)].March.push(datum)
              break;
            case "April":
                year[datum.tanggal.substr(0, 4)].April.push(datum)
              break;
            case "May":
                year[datum.tanggal.substr(0, 4)].May.push(datum)
              break;
            case "June":
                year[datum.tanggal.substr(0, 4)].June.push(datum)
              break;
            case "July":
                year[datum.tanggal.substr(0, 4)].July.push(datum)
              break;
            case "August":
                year[datum.tanggal.substr(0, 4)].August.push(datum)
              break;
            case "September":
                year[datum.tanggal.substr(0, 4)].September.push(datum)
              break;
            case "October":
                year[datum.tanggal.substr(0, 4)].October.push(datum)
              break;
            case "November":
                year[datum.tanggal.substr(0, 4)].November.push(datum)
              break;
            case "December":
                year[datum.tanggal.substr(0, 4)].December.push(datum)
              break;
            default:
              break;
          }
        }
      })

      if (params.showby === "day") {

      } else if (params.showby === "month") {
        for (var key in year) {
          if (key !== 'tanggal') {
            let indexData = 0
            for (var month in year[key]) {
              state.chartdata.labels.push(`${month.substr(0,3)}, ${key}`)
              state.chartdata.datasets[0].data.push(year[key][month].length)
              if (indexData >= 3) {
                let value = (state.chartdata.datasets[0].data[indexData-3] + state.chartdata.datasets[0].data[indexData-2] + state.chartdata.datasets[0].data[indexData-1])
                console.log(value, "ini value")
                state.chartdata.datasets[1].data.push(  (value / 3).toFixed(2) )
              }
              indexData++

            }
          }
        }
      } else if (params.showby === "year") {
        for (var key in year) {
          if (key !== 'tanggal') {
            state.chartdata.labels.push(key)
            let count = 0;
            for (var month in year[key]) {
              count += year[key][month].length
            }
            state.chartdata.datasets[0].data.push(count)
            state.chartdata.datasets[1].data.push(count)
          }
        }
      }

      state.chartdata.labels.push("Moving Average")
      let first = state.chartdata.datasets[0].data[state.chartdata.datasets[0].data.length-3]
      let second = state.chartdata.datasets[0].data[state.chartdata.datasets[0].data.length-2]
      let third = state.chartdata.datasets[0].data[state.chartdata.datasets[0].data.length-1]
      let value = (first + second + third) / 3;
      console.log(value, "value")
      console.log(first, "first")
      console.log(second, "Second")
      console.log(third, "third")
      state.chartdata.datasets[1].data.push( (first + second + third) / 3)
    },
    filterChart(state, params) {
      state.triggerFlag = !state.triggerFlag
      state.params = params
      state.searchedValue = [];
      state.chartdata.labels = []
      state.chartdata.datasets[0].data = []
      state.chartdata.datasets[1].data = [0,0,0]
      state.searched = true

      for (var key in state.products) {
        if (key === params) {
          // state.searchedValue = state.products[key].data
          state.products[key].data.forEach( (datum) => {
            if ( (new Date(datum.tanggal) >= new Date(state.startDate)) && new Date(datum.tanggal) <= new Date(state.untilDate) ) {
              state.searchedValue.push(datum)
            } 
          })
        }
      }
      
      let year = {}
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      state.searchedValue.forEach( (datum) => {
        if (year[datum.tanggal.substr(0, 4)] === undefined) {
          year[datum.tanggal.substr(0, 4)] = {
            "January": [],
            "February": [],
            "March": [],
            "April": [],
            "May": [],
            "June": [],
            "July": [],
            "August": [],
            "September": [],
            "October": [],
            "November": [],  
            "December": []
          }
          
          switch (monthNames[Number(datum.tanggal.substring(5, 7))]) {
            case "January":
                year[datum.tanggal.substr(0, 4)].January.push(datum)
              break;
            case "February":
                year[datum.tanggal.substr(0, 4)].February.push(datum)
              break;
            case "March":
                year[datum.tanggal.substr(0, 4)].March.push(datum)
              break;
            case "April":
                year[datum.tanggal.substr(0, 4)].April.push(datum)
              break;
            case "May":
                year[datum.tanggal.substr(0, 4)].May.push(datum)
              break;
            case "June":
                year[datum.tanggal.substr(0, 4)].June.push(datum)
              break;
            case "July":
                year[datum.tanggal.substr(0, 4)].July.push(datum)
              break;
            case "August":
                year[datum.tanggal.substr(0, 4)].August.push(datum)
              break;
            case "September":
                year[datum.tanggal.substr(0, 4)].September.push(datum)
              break;
            case "October":
                year[datum.tanggal.substr(0, 4)].October.push(datum)
              break;
            case "November":
                year[datum.tanggal.substr(0, 4)].November.push(datum)
              break;
            case "December":
                year[datum.tanggal.substr(0, 4)].December.push(datum)
              break;
            default:
              break;
          }
        } else {
          
          switch (monthNames[Number(datum.tanggal.substring(5, 7))]) {
            case "January":
                year[datum.tanggal.substr(0, 4)].January.push(datum)
              break;
            case "February":
                year[datum.tanggal.substr(0, 4)].February.push(datum)
              break;
            case "March":
                year[datum.tanggal.substr(0, 4)].March.push(datum)
              break;
            case "April":
                year[datum.tanggal.substr(0, 4)].April.push(datum)
              break;
            case "May":
                year[datum.tanggal.substr(0, 4)].May.push(datum)
              break;
            case "June":
                year[datum.tanggal.substr(0, 4)].June.push(datum)
              break;
            case "July":
                year[datum.tanggal.substr(0, 4)].July.push(datum)
              break;
            case "August":
                year[datum.tanggal.substr(0, 4)].August.push(datum)
              break;
            case "September":
                year[datum.tanggal.substr(0, 4)].September.push(datum)
              break;
            case "October":
                year[datum.tanggal.substr(0, 4)].October.push(datum)
              break;
            case "November":
                year[datum.tanggal.substr(0, 4)].November.push(datum)
              break;
            case "December":
                year[datum.tanggal.substr(0, 4)].December.push(datum)
              break;
            default:
              break;
          }
        }
      })

      if (state.showby === "day") {

      } else if (state.showby === "month") {
        for (var key in year) {
          if (key !== 'tanggal') {
            let indexData = 0
            for (var month in year[key]) {
              state.chartdata.labels.push(`${month.substr(0,3)}, ${key}`)
              state.chartdata.datasets[0].data.push(year[key][month].length)
              if (indexData >= 3) {
                let value = (state.chartdata.datasets[0].data[indexData-3] + state.chartdata.datasets[0].data[indexData-2] + state.chartdata.datasets[0].data[indexData-1])
                console.log(value, "ini value")
                state.chartdata.datasets[1].data.push(  value / 3 )
              }
              indexData++
            }
          }
        }
      } else if (state.showby === "year") {
        for (var key in year) {
          let indexData = 0
          if (key !== 'tanggal') {
            state.chartdata.labels.push(key)
            let count = 0;
            for (var month in year[key]) {
              count += year[key][month].length
            }
            state.chartdata.datasets[0].data.push(count)
            if (indexData > 2) {
                state.chartdata.datasets[1].data.push( (state.chartdata.datasets[0].data[indexData-3] + state.chartdata.datasets[0].data[indexData-2] + state.chartdata.datasets[0].data[indexData-1]) / 3 )
              }
            indexData++
          }
        }
      }

      state.chartdata.labels.push("Moving Average")
      let first = state.chartdata.datasets[0].data[state.chartdata.datasets[0].data.length-3]
      let second = state.chartdata.datasets[0].data[state.chartdata.datasets[0].data.length-2]
      let third = state.chartdata.datasets[0].data[state.chartdata.datasets[0].data.length-1]
      state.chartdata.datasets[1].data.push( ((first + second + third) / 3).toFixed(2) )

    },
    triggerFlag(state) {
      state.triggerFlag = !state.triggerFlag
    }
    
  },
  actions: {
    fetchProducts({commit, state}, payload) {
      console.log(payload, "dari action fetchProducts")
      axios({
        method: 'post',
        url: 'http://localhost:3000/product',
        data: {
          category: payload.selectedCategory
        }
      })
      .then( ({data}) => {
        console.log(data)
        commit('fetchProducts', data)
        commit('filter', payload)
        state.loaded = true
      })
      .catch( (err) => {
        alert('Failed while fetch product data from server')
        console.log(err)
      })
    },
    fetchCategory({commit, state}) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/categories',
      })
      .then( ({data}) => {
        commit('fetchCategory', data)
      })
      .catch( (err) => {
        alert('Failed while fetch category data from server')
        console.log(err)
      })
    }
  }
})

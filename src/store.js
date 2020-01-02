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
    showby: "",
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
      state.showby = params.showby
      state.filteredProducts.data = []
      state.chartdata.labels = []
      state.chartdata.datasets[0].data = []
      state.searched = true
      let temp = []
      
      if (typeof params === "object") {
        for (var key in state.products) {
          if (key.toLowerCase().search(params.brand.toLowerCase()) !== -1) {
            if (params.untilDate !== null) {
              state.products[key].data.forEach( (datum) => {
                if ( (new Date(datum.date) >= new Date(params.startDate)) && new Date(datum.date) <= new Date(params.untilDate) ) {
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

      state.filteredProducts.data.forEach( (datum) => {
        if (year[datum.date.substr(datum.date.length-4, datum.date.length)] === undefined) {
          year[datum.date.substr(datum.date.length-4, datum.date.length)] = {
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

          let index = datum.date.search(" ");
          
          switch (datum.date.substr(0, index)) {
            case "January":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].January.push(datum)
              break;
            case "February":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].February.push(datum)
              break;
            case "March":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].March.push(datum)
              break;
            case "April":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].April.push(datum)
              break;
            case "May":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].May.push(datum)
              break;
            case "June":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].June.push(datum)
              break;
            case "July":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].July.push(datum)
              break;
            case "August":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].August.push(datum)
              break;
            case "September":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].September.push(datum)
              break;
            case "October":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].October.push(datum)
              break;
            case "November":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].November.push(datum)
              break;
            case "December":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].December.push(datum)
              break;
            default:
              break;
          }
        } else {
          let index = datum.date.search(" ");
          
          switch (datum.date.substr(0, index)) {
            case "January":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].January.push(datum)
              break;
            case "February":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].February.push(datum)
              break;
            case "March":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].March.push(datum)
              break;
            case "April":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].April.push(datum)
              break;
            case "May":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].May.push(datum)
              break;
            case "June":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].June.push(datum)
              break;
            case "July":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].July.push(datum)
              break;
            case "August":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].August.push(datum)
              break;
            case "September":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].September.push(datum)
              break;
            case "October":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].October.push(datum)
              break;
            case "November":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].November.push(datum)
              break;
            case "December":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].December.push(datum)
              break;
            default:
              break;
          }
        }
      })

      if (params.showby === "day") {

      } else if (params.showby === "month") {
        for (var key in year) {
          if (key !== 'Date') {
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
          if (key !== 'Date') {
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

      state.chartdata.labels.push(">> Predicted <<")
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
      state.searched = true

      for (var key in state.products) {
        if (key === params) {
          state.searchedValue = state.products[key].data
        }
      }
      
      let year = {}

      state.searchedValue.forEach( (datum) => {
        if (year[datum.date.substr(datum.date.length-4, datum.date.length)] === undefined) {
          year[datum.date.substr(datum.date.length-4, datum.date.length)] = {
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

          let index = datum.date.search(" ");
          
          switch (datum.date.substr(0, index)) {
            case "January":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].January.push(datum)
              break;
            case "February":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].February.push(datum)
              break;
            case "March":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].March.push(datum)
              break;
            case "April":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].April.push(datum)
              break;
            case "May":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].May.push(datum)
              break;
            case "June":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].June.push(datum)
              break;
            case "July":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].July.push(datum)
              break;
            case "August":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].August.push(datum)
              break;
            case "September":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].September.push(datum)
              break;
            case "October":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].October.push(datum)
              break;
            case "November":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].November.push(datum)
              break;
            case "December":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].December.push(datum)
              break;
            default:
              break;
          }
        } else {
          let index = datum.date.search(" ");
          
          switch (datum.date.substr(0, index)) {
            case "January":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].January.push(datum)
              break;
            case "February":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].February.push(datum)
              break;
            case "March":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].March.push(datum)
              break;
            case "April":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].April.push(datum)
              break;
            case "May":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].May.push(datum)
              break;
            case "June":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].June.push(datum)
              break;
            case "July":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].July.push(datum)
              break;
            case "August":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].August.push(datum)
              break;
            case "September":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].September.push(datum)
              break;
            case "October":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].October.push(datum)
              break;
            case "November":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].November.push(datum)
              break;
            case "December":
                year[datum.date.substr(datum.date.length-4, datum.date.length)].December.push(datum)
              break;
            default:
              break;
          }
        }
      })

      if (state.showby === "day") {

      } else if (state.showby === "month") {
        for (var key in year) {
          if (key !== 'Date') {
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
          if (key !== 'Date') {
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

      let first = state.chartdata.datasets[1].length-2
      let second = state.chartdata.datasets[1].length-1
      let third = state.chartdata.datasets[1].length
      console.log('hereee')
      state.chartdata.datasets[1].data.push( (state.chartdata.datasets[1][first] + state.chartdata.datasets[1][second] + state.chartdata.datasets[1][third] ) / 3)
      console.log(state.chartdata.datasets[1].data)

    }
    
  },
  actions: {
    fetchProducts({commit, state}) {
      axios({
        method: 'get',
        // url: 'http://3.17.28.74:3000/product',
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

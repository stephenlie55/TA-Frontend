<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background: white !important; border-bottom: 1px solid #E4E5E6;">
      <a class="navbar-brand" href="#" onClick="history.go(0)"><strong>Expectation Maximization</strong></a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            
          </ul>
      </div>
        <button type="button" class="btn btn-info" :style="stylebuttonday.style" @click="changeclicked(1)">Day</button>
        <button type="button" class="btn btn-info" :style="stylebuttonmonth.style" @click="changeclicked(2)">Month</button>
        <button type="button" class="btn btn-info" :style="stylebuttonyear.style" @click="changeclicked(3)">Year</button>

        <form id="formSearch" class="form-inline">
            <div class="form-group">
                <label for="example-date-input" class="col-2 col-form-label" style="white-space: nowrap">Start date: </label>
                <input class="form-control" type="date" v-model="startDate" id="example-date-input">

                <label for="example-date-input" class="col-2 col-form-label" style="white-space: nowrap">Until date: </label>
                <input class="form-control" type="date" v-model="untilDate" id="example-date-input">
            </div>
        </form>
      <!-- Search -->
      <form id="formSearch" class="form-inline">
          <div class="form-group">
            
            <!-- <select class="form-control" v-model="gender" style="margin-right: 5px; margin-left: 5px">
                <option selected value="Men">Men</option>
            </select>
            <select class="form-control" v-model="category" style="margin-right: 5px">
                <option selected value="Shoes">Shoes</option>
            </select> -->

            <!-- <select class="form-control" v-model="brand" style="margin-right: 10px">
                <option v-for="(shortName, index) in listOfBrand" :key="index" :value=shortName>{{shortName}}</option>
            </select> -->

            <input 
                type="text" 
                class="form-control" 
                v-model="brand"
                aria-describedby="emailHelp" 
                placeholder="Search here . . ." 
                style="width: 150px; margin-right: 15px"
                @change="search"
            >
          
          </div>
          <div class="input-group">
              <button class="btn btn-secondary" @click.prevent="submit">Submit</button>
          </div>
      </form>
  </nav>
</template>

<script>
export default {
    data() {
        return {
            gender: "Men",
            brand: null,
            category: "Shoes",
            startDate: null,
            untilDate: null,
            listOfBrand: [],
            stylebuttonclicked: "margin-right: 10px; background: blue",
            stylebutton: "margin-right: 10px",
            stylebuttonday: {
                style: "margin-right: 10px",
                state: false
            },
            stylebuttonyear: {
                style: "margin-right: 10px",
                state: false
            },
            stylebuttonmonth: {
                style: "margin-right: 10px",
                state: false
            },
            clicked: ""
        }
    },
    methods: {
      submit() {
          if (this.gender === null || this.brand === null || this.category === null ) {
              alert('All parameter need to be selected')
          } else {
              console.log('submit, masuk ke else')
              if (new Date(this.untilDate) < new Date(this.startDate)) {
                  alert('Until date harus hari setelah start date')
              } else {
                  this.$store.commit('filter', {
                      gender: this.gender,
                      brand: this.brand,
                      category: this.category,
                      startDate: this.startDate,
                      untilDate: this.untilDate,
                      showby: this.clicked
                  })
                  this.$store.state.loaded = true
              }
          }
      },
      search() {
          console.log('on change ter trigger')
          this.$store.commit('search', this.brand)
      },
      changeclicked(params) {
          switch (params) {
              case 1:
                    this.stylebuttonday.style = this.stylebuttonclicked
                    this.stylebuttonday.state = true
                    this.clicked = "day"
                    this.stylebuttonmonth.style = this.stylebutton
                    this.stylebuttonmonth.state = false
                    this.stylebuttonyear.style = this.stylebutton
                    this.stylebuttonyear.state = false
                    break;
              case 2:
                    this.stylebuttonmonth.style = this.stylebuttonclicked
                    this.stylebuttonmonth.state = true
                    this.clicked = "month"
                    this.stylebuttonday.style = this.stylebutton
                    this.stylebuttonday.state = false
                    this.stylebuttonyear.style = this.stylebutton
                    this.stylebuttonyear.state = false
                    break;
              case 3:
                    this.stylebuttonyear.style = this.stylebuttonclicked
                    this.stylebuttonyear.state = true
                    this.clicked = "year"
                    this.stylebuttonmonth.style = this.stylebutton
                    this.stylebuttonmonth.state = false
                    this.stylebuttonday.style = this.stylebutton
                    this.stylebuttonday.state = false
                    break;
              default:
                  break;
          }
      }
    },
    created() {
        let obj = {}
        // for (var key in this.$store.state.products) {
        //     obj[this.$store.state.products[key].data[0].productShortName.toUpperCase()] = this.$store.state.products[key].data[0].productShortName
        // }

        // for (var key in obj) {
        //     let endIndex
        //     inner_loop:
        //     for (var i=0; i<key.length; i++) {
        //         if (key[i] === " ") {
        //             endIndex = i
        //             break inner_loop
        //         }
        //     }
        //     this.listOfBrand.push(key.substr(0, endIndex))
        // }
    }
}
</script>

<style>

</style>

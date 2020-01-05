<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background: white !important; border-bottom: 1px solid #E4E5E6;">

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            
          </ul>
      </div>
        <form id="formSearch" class="form-inline" style="left: 25px !important; position: absolute">
            <select class="form-control" style="margin-right: 10px" v-model="category" @change="categorySelected()">
                <option v-for="category in categories" :key="category" :value="category">{{category}}</option>
            </select>
            <select class="form-control" style="margin-right: 10px; max-width: 175px" v-if="categoryFlag" v-model="selectedCategory">
                <option v-for="category in subCategory" :key="category" :value="category">{{category}}</option>
            </select>
            <select class="form-control" @change="changeclicked(monthYear)" v-model="monthYear">
                <option value="month">Month</option>
                <option value="year">Year</option>
            </select>
        </form>

        <form id="formSearch" class="form-inline">
            <div class="form-group">
                
                <label for="example-date-input" class="col-2 col-form-label" style="white-space: nowrap">Start date: </label>
                <input class="form-control" type="date" v-model="startDate" id="example-date-input" style="width: 175px">

                <label for="example-date-input" class="col-2 col-form-label" style="white-space: nowrap">Until date: </label>
                <input class="form-control" type="date" v-model="untilDate" id="example-date-input" style="width: 175px">
            </div>
        </form>
      <!-- Search -->
      <form id="formSearch" class="form-inline">
          <div class="form-group">
            <input 
                type="text" 
                class="form-control" 
                v-model="brand"
                aria-describedby="emailHelp" 
                placeholder="Search here . . ." 
                style="width: 150px; margin-right: 15px"
                @change="search()"
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
            category: "",
            selectedCategory: "",
            categoryFlag: false,
            monthYear: "month",
            startDate: null,
            untilDate: null,
            listOfBrand: [],
            categories: [],
            subCategory: [],
            clicked: "month",
            obj: {}
        }
    },
    methods: {
      submit() {
          if (this.gender === null || this.brand === null || this.category === null ) {
              alert('All parameter need to be selected')
          } else {
              if (new Date(this.untilDate) < new Date(this.startDate)) {
                  alert('Until date harus hari setelah start date')
              } else {
                  this.$store.dispatch('fetchProducts', {
                    gender: this.gender,
                    brand: this.brand,
                    category: this.category,
                    selectedCategory: this.selectedCategory,
                    startDate: this.startDate,
                    untilDate: this.untilDate,
                    showby: this.clicked
                  })
              }
          }
      },
      search() {
          this.$store.commit('search', this.brand)
      },
      changeclicked(params) {
          switch (params) {
              case "day":
                    this.clicked = "day"
                    break;
              case "month":
                    this.clicked = "month"
                    break;
              case "year":
                    this.clicked = "year"
                    break;
              default:
                  break;
          }
      },
      categorySelected() {
          this.categoryFlag = false
          this.categoryFlag = true
          this.subCategory = []
          for (var category in this.obj) {
              if (category.search(this.category) !== -1) {
                  this.subCategory = this.obj[category]
              }
          }
      }
    },
    created() {
        let obj = {}
        for (var key in this.$store.state.categories) {
            let index
            if (key.search(" -") !== -1) {
                index  = key.search(" -")
            }

            if (obj[key.substring(0, index)] == undefined) {
                obj[key.substring(0, index)] = []
            } else {
                obj[key.substring(0, index)] = []
            }
        }

        for (var category in this.$store.state.categories) {
            let index
            for (var key in obj) {
                let flag = false
                if (category.search(" -") !== -1) {
                    index  = category.search(" -")
                    flag = true
                }
                if (category.search(key) !== -1 && flag) {
                    obj[key].push(category.substring(index+3, category.length))
                }
            }
        }

        for (var key in obj) {
            this.categories.push(key)
        }
        this.obj = obj
    }
}
</script>

<style>

</style>

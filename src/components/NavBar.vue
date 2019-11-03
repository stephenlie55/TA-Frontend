<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background: white !important;">
      <a class="navbar-brand" href="#" onClick="history.go(0)"><strong>Expectation Maximization</strong></a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            
          </ul>
      </div>

      <!-- Search -->
      <form id="formSearch" class="form-inline">
          <div class="form-group">

            <select class="form-control" v-model="gender" style="margin-right: 5px; margin-left: 5px">
                <option selected value="Men">Men</option>
            </select>
            <select class="form-control" v-model="category" style="margin-right: 5px">
                <option selected value="Shoes">Shoes</option>
            </select>

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
            gender: null,
            brand: null,
            category: null,
            listOfBrand: []
        }
    },
    methods: {
      submit() {
          if (this.gender === null || this.brand === null || this.category === null ) {
              alert('All parameter need to be selected')
          } else {
              this.$store.commit('filter', {
                  gender: this.gender,
                  brand: this.brand,
                  category: this.category
              })
              this.$store.state.loaded = true
          }
      },
      search() {
          console.log('on change ter trigger')
          this.$store.commit('search', this.brand)
      }
    },
    created() {
        let obj = {}
        for (var key in this.$store.state.products) {
            obj[this.$store.state.products[key].data[0].productShortName.toUpperCase()] = this.$store.state.products[key].data[0].productShortName
        }

        for (var key in obj) {
            let endIndex
            inner_loop:
            for (var i=0; i<key.length; i++) {
                if (key[i] === " ") {
                    endIndex = i
                    break inner_loop
                }
            }
            this.listOfBrand.push(key.substr(0, endIndex))
        }
    }
}
</script>

<style>

</style>

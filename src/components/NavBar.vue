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
                <option value="Men">Men</option>
                <option value="Women">Women</option>
            </select>
            <select class="form-control" v-model="category" style="margin-right: 5px">
                <option value="Shoes">Shoes</option>
            </select>
            <select class="form-control" v-model="brand" style="margin-right: 10px">
                <option value="Diadora">Diadora</option>
                <option value="Nike">Nike</option>
                <option value="Aldo">Aldo</option>
                <option value="Skechers">Skechers</option>
                <option value="Columbia">Columbia</option>
                <option value="Justin">Justin</option>
                <option value="Crocs">Crocs</option>
                <option value="Puma">Puma</option>
                <option value="Clarks">Clarks</option>
                <option value="Adidas">Adidas</option>
                <option value="Delli">Delli</option>
                <option value="Polo">Polo</option>
            </select>
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
      }
    }
}
</script>

<style>

</style>

<template>
  <div style="background: #E4E5E6; height: 100%">
    <NavBar/>
    <div class="container" style="background: #E4E5E6; height: 100%; width: 100%">
      <div v-if="$store.state.loaded">
        <ChartContainer/>
      </div>
      <div style="justify-content: center; text-align: center" v-else>
        <h5>Select the category of filter first</h5>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ChartContainer from '@/components/ChartContainer.vue'

export default {
  name: 'home',
  components: {
    NavBar,
    ChartContainer
  },
  
  created() {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products: function() {
      return this.$store.state.products
    }
  },
  methods: {
    anything() {
      console.log('Sample method')
    }
  }
}
</script>

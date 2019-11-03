<template>
  <div style="background: #E4E5E6; height: 100%; width: 100%; margin: 0px; padding: 0px;">
    <NavBar v-if="$store.state.flag"/>
    <div class="container" style="background: #E4E5E6; height: 100%; width: 100%; padding: 0px; margin: 0 auto;justify-content: space-between">
      <div class="row" style="justify-content: space-between">
        <div class="col-9" style="margin: 0px; padding: 0px;">
          <ChartContainer v-if="$store.state.loaded" />
        </div>  
        <div class="col-3" style="margin: 0px; padding: 0px;" v-if="$store.state.flag">
          <Category/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ChartContainer from '@/components/ChartContainer.vue'
import Category from '@/components/Category.vue'

export default {
  name: 'home',
  components: {
    NavBar,
    ChartContainer,
    Category
  },
  data: () => ({
  }),
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

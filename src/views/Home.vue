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

      <div class="row" v-if="$store.state.flag" style="width: 100%">
        <div class="col-12" style="margin: 0px; padding: 0px;">
          <ListWithProgressBar/>
        </div>  
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Information</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Type product name you want to find in search bar <br> 
              and then hit "submit" button to show the graph of the result
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ChartContainer from '@/components/ChartContainer.vue'
import Category from '@/components/Category.vue'
import ListWithProgressBar from '@/components/ListWithProgressBar.vue'

export default {
  name: 'home',
  components: {
    NavBar,
    ChartContainer,
    Category,
    ListWithProgressBar
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

<style scoped>
 #listWithProgress {
     margin: 20px;
     margin-left: 30px;
     background: white;
     width: 80%;
     border-radius: 5px;
     max-height: 500px;
     display: flex;
     overflow-y: scroll;
     flex-direction: column;
 }
</style>

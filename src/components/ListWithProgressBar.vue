<template>
  <div class="container" v-if="$store.state.searched">
    <div>
        <ul class="list-group">
            <EachList v-for="(category, index) in categories" :key="index" :list="category"/>
        </ul>
    </div>
  </div>
</template>

<script>
    import EachList from '@/components/EachList.vue'

    export default {
        name: 'ListWithProgressBar',
        components: { EachList },
        data: () => ({
            categories: [],
            searched: false
        }),
        methods: {
            sorting() {
                var swapped;
                do {
                    swapped = false;
                    for (var i=0; i < this.categories.length-1; i++) {
                        if (this.$store.state.products[this.categories[i]].data.length < this.$store.state.products[this.categories[i+1]].data.length) {
                            var temp = this.categories[i]
                            this.categories[i] = this.categories[i+1]
                            this.categories[i+1] = temp;
                            swapped = true;
                        }
                    }
                } while (swapped);
            }
        },
        created() {
            for (var key in this.$store.state.products) {
                this.categories.push(key)
            }
            this.sorting()
        },
        watch: {
            '$store.state.search'() {
                this.categories = []
                for (var key in this.$store.state.products) {
                    if (key.toLowerCase().search(this.$store.state.search.toLowerCase()) !== -1) {
                        this.categories.push(key)
                    }
                }
                this.sorting()
            }
        }
    }
</script>

<style scoped>
 .container {
     margin: 5px 20px;
     background: white;
     width: 98.5%;
     border-radius: 5px;
     max-height: 500px;
     display: flex;
     overflow-y: scroll;
     flex-direction: column;
     text-align: left;
 }
</style>

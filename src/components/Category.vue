<template>
  <div class="container" style="margin: 20px; margin-left: 30px; background: white; width: 80%; border-radius: 5px; max-height: 500px; display: flex; overflow-y: scroll">
        <ul class="list-group">
            <EachCategory v-for="(category, index) in categories" :key="index" :category="category"/>
        </ul>
  </div>
</template>

<script>
    import EachCategory from '@/components/EachCategory.vue'

    export default {
        name: 'Categories',
        components: { EachCategory },
        data: () => ({
            categories: []
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

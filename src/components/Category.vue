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
        created() {
            for (var key in this.$store.state.products) {
                this.categories.push(key)
            }
        },
    }
</script>

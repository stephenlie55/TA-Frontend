<template>
    <li class="list-group-item" style="margin: 5px 0; text-align: center; border-radius: 5px" @click="renderChart">{{category}}</li>
</template>

<script>
    export default {
        name: 'Category',
        props: ['category'],
        data: () => ({
        }),
        methods: {
            renderChart() {
                this.$store.commit('loaded')
                this.$store.commit('filterChart', this.category)
            }
        },
        created() {
            
        },
    }
</script>

<style scoped>
    li:hover {
        background: #E4E5E6;
        cursor: pointer;
    }
</style>
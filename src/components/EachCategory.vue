<template>
    <div>
        <li class="list-group-item" style="margin: 5px 0; text-align: center; border-radius: 5px" @click="renderChart">{{category}}</li>
        <div class="progress">
            <div class="progress-bar bg-info" role="progressbar" :style=styleWidth :aria-valuenow=ariaValueNow :aria-valuemin=ariaValueNow :aria-valuemax=ariaValueMax>{{ariaValueNow}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Category',
        props: ['category'],
        data: () => ({
            ariaValueNow: null,
            ariaValueMin: String(0),
            ariaValueMax: null,
            styleWidth: null,
        }),
        methods: {
            renderChart() {
                this.$store.commit('loaded')
                this.$store.commit('filterChart', this.category)
            }
        },
        created() {
            this.ariaValueMax = String(this.$store.state.filteredProducts.data.length)
            for (var key in this.$store.state.products) {
                if (this.category == key) {
                    this.ariaValueNow = String(this.$store.state.products[key].data.length)
                    this.styleWidth = `width: ${this.ariaValueNow/this.ariaValueMax * 100}%`
                }
            }
            console.log(this.ariaValueMin, "Aria value min")
            console.log(this.ariaValueNow, "Aria value now")
            console.log(this.ariaValueMax, "Aria value max")
        },
        watch: {
            '$store.state.triggerFlag'() {
                this.ariaValueMax = String(this.$store.state.filteredProducts.data.length)
                for (var key in this.$store.state.products) {
                    if (this.category == key) {
                        this.ariaValueNow = String(this.$store.state.products[key].data.length)
                        this.styleWidth = `width: ${this.ariaValueNow/this.ariaValueMax * 100}%`
                    }
                }
            }
        } 
    }
</script>

<style scoped>
    li:hover {
        background: #E4E5E6;
        cursor: pointer;
    }
</style>
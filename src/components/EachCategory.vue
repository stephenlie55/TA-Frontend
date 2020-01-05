<template>
    <div style="margin-bottom: 5px">
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
                    let temp = []
                    this.$store.state.products[key].data.forEach( (datum) => {
                        if ( (new Date(datum.tanggal) >= new Date(this.$store.state.startDate)) && new Date(datum.tanggal) <= new Date(this.$store.state.untilDate) ) {
                            temp.push(datum)
                        } 
                    })
                    this.ariaValueNow = String(temp.length)
                    this.styleWidth = `width: ${this.ariaValueNow/this.ariaValueMax * 100}%`
                }
            }
        },
        watch: {
            '$store.state.triggerFlag'() {
                this.ariaValueMax = String(this.$store.state.filteredProducts.data.length)
                for (var key in this.$store.state.products) {
                    if (this.category == key) {
                        let temp = []
                        this.$store.state.products[key].data.forEach( (datum) => {
                            if ( (new Date(datum.tanggal) >= new Date(this.$store.state.startDate)) && new Date(datum.tanggal) <= new Date(this.$store.state.untilDate) ) {
                                temp.push(datum)
                            } 
                        })
                        this.ariaValueNow = String(temp.length)
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
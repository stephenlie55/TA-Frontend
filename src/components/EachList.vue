<template>
    <div>
        <div style="margin: 10px auto">
            <li class="list-group-item" style="margin: 5px 0; border-radius: 5px" @click="renderChart">{{list}}</li>
            <div class="progress">
                <div class="progress-bar bg-info" role="progressbar" :style=styleWidth :aria-valuenow=ariaValueNow :aria-valuemin=ariaValueNow :aria-valuemax=ariaValueMax>{{ariaValueNow}}</div>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'EachList',
        props: ['list'],
        data: () => ({
            ariaValueNow: null,
            ariaValueMin: String(0),
            ariaValueMax: null,
            styleWidth: null,
        }),
        methods: {
            renderChart() {
                this.$store.commit('loaded')
                this.$store.commit('filterChart', this.list)
            }
        },
        created() {
            this.ariaValueMax = String(this.$store.state.filteredProducts.data.length)
            for (var key in this.$store.state.products) {
                if (this.list == key) {
                    this.ariaValueNow = String(this.$store.state.products[key].data.length)
                    this.styleWidth = `width: ${this.ariaValueNow/this.ariaValueMax * 100}%`
                }
                // console.log(key, 'ini key')
            }
            // console.log(this.list, "ini list")
            // console.log(this.ariaValueNow, "aria value now")
            // console.log(this.ariaValueMax, "aria value max")
        },
        watch: {
            '$store.state.triggerFlag'() {
                this.ariaValueMax = String(this.$store.state.filteredProducts.data.length)
                for (var key in this.$store.state.products) {
                    if (this.list == key) {
                        this.ariaValueNow = String(this.$store.state.products[key].data.length)
                        this.styleWidth = `width: ${this.ariaValueNow/this.ariaValueMax * 100}%`
                    }
                    // console.log(key, 'ini key')
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
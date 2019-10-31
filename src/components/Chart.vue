<script>
    import { Line, mixins } from 'vue-chartjs'
    export default {
        extends: Line,
        mixins: [mixins.reactiveData],
        data: () => ({
        }),
        props: ['chartdata', 'interval'],
        created() {
            if (this.interval == "month") {
                console.log(this.interval, "month")
            } else if (this.interval == "year") {
                console.log(this.interval, "year")
            }
        },
        mounted () {
            this.renderChart(this.chartdata, this.$store.state.options)
        },
        watch: {
            '$store.state.triggerFlag'() {
                this._data._chart.destroy();
                if (typeof this.$store.state.params === 'object') {
                    console.log(this.$store.state.params.brand, "dari chart component")
                    this.renderChart(
                        {
                            labels: this.$store.state.chartdata.labels,
                            datasets: [{
                                label: this.$store.state.params.brand,
                                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                data: this.$store.state.chartdata.datasets[0].data
                            }]
                        }, this.$store.state.options
                    )
                } else {
                    this.renderChart(
                        {
                            labels: this.$store.state.chartdata.labels,
                            datasets: [{
                                label: this.$store.state.params,
                                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                data: this.$store.state.chartdata.datasets[0].data
                            }]
                        }, this.$store.state.options
                    )
                }
            }
        }
    }
</script>
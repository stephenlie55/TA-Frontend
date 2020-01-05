<template>
  <div class="container" style="margin: 20px; background: white; border-radius: 5px">
    <div style="display: flex; flex-direction: column; padding-top: 1%">
        <small>
            Jenis barang: <strong>{{$store.state.productType}}</strong>
        </small>
        <small v-if="typeof $store.state.params === 'object'">
            Detail barang: <strong>{{$store.state.params.brand}}</strong>
        </small>
        <small v-else>
            Detail barang: <strong>{{$store.state.params}}</strong>
        </small>
        <small>
            Total penjualan: <strong>{{total}}</strong>
        </small>
    </div>
    <line-chart
        :interval="month"
        :chartdata="chartdata"
    />
  </div>
</template>

<script>
    import LineChart from '@/components/Chart.vue'

    export default {
        name: 'LineChartContainer',
        components: { LineChart },
        data: () => ({
            loaded: false,
            month: "month",
            year: "year",
            chartdata: null,
            total: 0
        }),
        created() {
            this.total = this.$store.state.searchedValue.length
            if (typeof this.$store.state.params === 'object') {
                this.chartdata = {
                    labels: this.$store.state.chartdata.labels,
                    datasets: [
                        {
                            label: this.$store.state.params.brand,
                            backgroundColor: 'rgba(128, 0, 0, 0.2)',
                            data: this.$store.state.chartdata.datasets[0].data
                        },
                        {
                            label: "moving average",
                            backgroundColor: 'rgba(0, 0, 255, 0.2)',
                            data: this.$store.state.chartdata.datasets[1].data
                        }
                    ]
                }
            } else {
                this.chartdata = {
                    labels: this.$store.state.chartdata.labels,
                    datasets: [
                        {
                            label: this.$store.state.params,
                            backgroundColor: 'rgba(255, 0, 0, 0.2)',
                            data: this.$store.state.chartdata.datasets[0].data
                        },
                        {
                            label: "moving average",
                            backgroundColor: 'rgba(255, 0, 0, 0.2)',
                            data: this.$store.state.chartdata.datasets[1].data
                        }
                    ]
                }
            }
        },
        watch: {
            '$store.state.triggerFlag'() {
                this.total = this.$store.state.searchedValue.length
            }
        }
    }
</script>

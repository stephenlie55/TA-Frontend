<template>
  <div class="container" style="margin: 20px; background: white;">
    <div style="display: flex; flex-direction: column; padding-top: 1%">
        <small>
            Jenis barang: <strong>{{$store.state.params.brand}}</strong>
        </small>
        <small>
            Detail kategori barang: <strong>{{$store.state.params.category}}</strong>
        </small>
        <small>
            Total penjualan: <strong>{{$store.state.filteredProducts.data.length}}</strong>
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
            chartdata: null
        }),
        created() {
            this.chartdata = {
                labels: this.$store.state.chartdata.labels,
                datasets: [{
                    label: this.$store.state.params.brand,
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    data: this.$store.state.chartdata.datasets[0].data
                }]
            }
        },
    }
</script>

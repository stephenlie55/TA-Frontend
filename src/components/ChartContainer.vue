<template>
  <div class="container" style="margin: 20px; background: white;">
    <div style="display: flex; flex-direction: column; padding-top: 1%">
        <small>
            Jenis barang: <strong>Sepatu Diadora</strong>
        </small>
        <small>
            Detail kategori barang: <strong>Sepatu Pria</strong>
        </small>
        <small>
            Total penjualan: <strong>860</strong>
        </small>
    </div>
    <line-chart
      :chartdata="chartdata"
      :options="options"/>
  </div>
</template>

<script>
    import LineChart from '@/components/Chart.vue'

    export default {
        name: 'LineChartContainer',
        components: { LineChart },
        data: () => ({
            loaded: false,
            chartdata: {
                labels: ['January', 'February', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                datasets: [
                    {
                        label: null,
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        data: [40, 45, 50, 90, 95, 120, 80, 60, 65, 60, 75, 80]
                    },
                    // {
                    //     label: 'Adidas',
                    //     backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    //     data: [30, 25, 75, 100, 80, 110, 70, 90, 75, 50, 90, 120]
                    // }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }),
        async created () {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/product'
                })
                console.log('masuk chart container')
                // this.chartdata.datasets = data
                // console.log(this.$store.state.params)
                this.chartdata.datasets[0].label = null
            } catch (e) {
                console.error(e)
            }
        }
    }
</script>

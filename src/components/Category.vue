<template>
  <div class="container" v-show="$store.state.searched">
        <div style="margin-top: 10px">
            <p>
                Sorted by: <select class="form-control form-control-sm" style="width: 150px" v-model="key" @change="selectSorting(key)">
                                <option value="mostSales">Most sales</option>
                                <option value="trending">Trending</option>
                            </select>
            </p>
        </div>
        <div>
            <ul class="list-group">
                <EachCategory v-for="category in categories" :key="category" :category="category"/>
            </ul>
        </div>
  </div>
</template>

<script>
    import EachCategory from '@/components/EachCategory.vue'

    export default {
        name: 'Categories',
        components: { EachCategory },
        data: () => ({
            categories: [],
            searched: false,
            key: "mostSales"
        }),
        methods: {
            sorting() {
                var swapped;
                var obj = {}
                
                // Separate data with same name
                for (var i=0; i<this.categories.length; i++) {
                    this.$store.state.products[this.categories[i]].data.forEach( (datum) => {
                        if ( (new Date(datum.tanggal) >= new Date(this.$store.state.startDate)) && new Date(datum.tanggal) <= new Date(this.$store.state.untilDate) ) {
                            if (datum.nama_produk == this.categories[i]) {
                                if (obj[datum.nama_produk] == undefined) {
                                    obj[datum.nama_produk] = {}
                                    obj[datum.nama_produk].data = []
                                    obj[datum.nama_produk].slope = 0
                                    obj[datum.nama_produk].data.push(datum)
                                } else {
                                    obj[datum.nama_produk].data.push(datum)
                                }
                            }
                        } else {
                            obj[datum.nama_produk] = {}
                            obj[datum.nama_produk].data = []
                            obj[datum.nama_produk].slope = 0
                        }

                    })
                }

                for (var key in obj) {
                    let x = []
                    let y = []
                    let year = {}
                    
                    year[this.$store.state.untilDate.substr(0, 4)] = {}
                    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    for (var i=0; i< Number(this.$store.state.untilDate.substring(5, 7)); i++) {
                            year[this.$store.state.untilDate.substr(0, 4)][monthNames[i]] = []
                    }
                    
                    obj[key].data.forEach( (datum) => {
                        if (year[datum.tanggal.substr(0, 4)] === undefined) {
                            year[datum.tanggal.substr(0, 4)] = {
                                "January": [],
                                "February": [],
                                "March": [],
                                "April": [],
                                "May": [],
                                "June": [],
                                "July": [],
                                "August": [],
                                "September": [],
                                "October": [],
                                "November": [],  
                                "December": []
                            }
                            
                            switch (monthNames[Number(datum.tanggal.substring(5, 7))-1]) {
                                case "January":
                                    year[datum.tanggal.substr(0, 4)].January.push(datum)
                                    break;
                                case "February":
                                    year[datum.tanggal.substr(0, 4)].February.push(datum)
                                    break;
                                case "March":
                                    year[datum.tanggal.substr(0, 4)].March.push(datum)
                                    break;
                                case "April":
                                    year[datum.tanggal.substr(0, 4)].April.push(datum)
                                    break;
                                case "May":
                                    year[datum.tanggal.substr(0, 4)].May.push(datum)
                                    break;
                                case "June":
                                    year[datum.tanggal.substr(0, 4)].June.push(datum)
                                    break;
                                case "July":
                                    year[datum.tanggal.substr(0, 4)].July.push(datum)
                                    break;
                                case "August":
                                    year[datum.tanggal.substr(0, 4)].August.push(datum)
                                    break;
                                case "September":
                                    year[datum.tanggal.substr(0, 4)].September.push(datum)
                                    break;
                                case "October":
                                    year[datum.tanggal.substr(0, 4)].October.push(datum)
                                    break;
                                case "November":
                                    year[datum.tanggal.substr(0, 4)].November.push(datum)
                                    break;
                                case "December":
                                    year[datum.tanggal.substr(0, 4)].December.push(datum)
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            switch (monthNames[Number(datum.tanggal.substring(5, 7))-1]) {
                                case "January":
                                    year[datum.tanggal.substr(0, 4)].January.push(datum)
                                    break;
                                case "February":
                                    year[datum.tanggal.substr(0, 4)].February.push(datum)
                                    break;
                                case "March":
                                    year[datum.tanggal.substr(0, 4)].March.push(datum)
                                    break;
                                case "April":
                                    year[datum.tanggal.substr(0, 4)].April.push(datum)
                                    break;
                                case "May":
                                    year[datum.tanggal.substr(0, 4)].May.push(datum)
                                    break;
                                case "June":
                                    year[datum.tanggal.substr(0, 4)].June.push(datum)
                                    break;
                                case "July":
                                    year[datum.tanggal.substr(0, 4)].July.push(datum)
                                    break;
                                case "August":
                                    year[datum.tanggal.substr(0, 4)].August.push(datum)
                                    break;
                                case "September":
                                    year[datum.tanggal.substr(0, 4)].September.push(datum)
                                    break;
                                case "October":
                                    year[datum.tanggal.substr(0, 4)].October.push(datum)
                                    break;
                                case "November":
                                    year[datum.tanggal.substr(0, 4)].November.push(datum)
                                    break;
                                case "December":
                                    year[datum.tanggal.substr(0, 4)].December.push(datum)
                                    break;
                                default:
                                    break;
                            }
                        }
                    })

                    for (var eachYear in year) {
                        if (eachYear !== 'tanggal') {
                            for (var month in year[eachYear]) {
                                x.push(`${month.substr(0,3)}, ${eachYear}`)
                                y.push(year[eachYear][month].length)
                            }
                        }
                    }

                    console.log(x)
                    console.log(y)

                    let hasilRegresi = this.linearRegression(y, x)
                    obj[key].slope = hasilRegresi.slope
                }

                do {
                    swapped = false;
                    for (var i=0; i < this.categories.length-1; i++) {
                        if (obj[this.categories[i]].slope < obj[this.categories[i+1]].slope) {
                            var temp = this.categories[i]
                            this.categories[i] = this.categories[i+1]
                            this.categories[i+1] = temp;
                            swapped = true;
                        }
                    }
                } while (swapped);
                console.log(obj)
            },
            linearRegression(yReal, xReal){
                var x = []
                var y = []

                for (var i=xReal.length-3; i<xReal.length; i++) {
                    x.push(i)
                    y.push(yReal[i])
                }            
                console.log(x, y, "ini dari linear regression")    


                var lr = {};
                var n = y.length;
                var sum_x = 0;
                var sum_y = 0;
                var sum_xy = 0;
                var sum_xx = 0;
                var sum_yy = 0;

                for (var i = 0; i < y.length; i++) {
                    sum_x += x[i];
                    sum_y += y[i];
                    sum_xy += (x[i]*y[i]);
                    sum_xx += (x[i]*x[i]);
                    sum_yy += (y[i]*y[i]);
                } 

                lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
                lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
                lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

                return lr;
            },
            sortingBySales() {
                var swapped;
                let newObj = {}
                
                for (var i=0; i<this.categories.length; i++) {
                    for (var key in this.$store.state.products) {
                        if (this.categories[i] == key) {
                            if (newObj[key] == undefined) {
                                newObj[key] = {}
                                newObj[key].data = []
                            }

                            this.$store.state.products[key].data.forEach( (datum) => {
                                if ( (new Date(datum.tanggal) >= new Date(this.$store.state.startDate)) && new Date(datum.tanggal) <= new Date(this.$store.state.untilDate) ) {
                                    newObj[key].data.push(datum)
                                } 
                            })
                        }
                    }
                }

                do {
                    swapped = false;
                    for (var i=0; i < this.categories.length-1; i++) {
                        if (newObj[this.categories[i]].data.length < newObj[this.categories[i+1]].data.length) {
                            var temp = this.categories[i]
                            this.categories[i] = this.categories[i+1]
                            this.categories[i+1] = temp;
                            swapped = true;
                        }
                    }
                } while (swapped);

            },
            selectSorting(key) {
                if (key === "mostSales") {
                    this.sortingBySales()
                } else if (key === "trending") {
                    this.sorting()
                }
                this.$store.commit("triggerFlag")
             }
        },
        created() {
            for (var key in this.$store.state.products) {
                if (key.toLowerCase().search(this.$store.state.search.toLowerCase()) !== -1) {
                    this.categories.push(key)
                }
            }
            this.sortingBySales()
        },
        watch: {
            '$store.state.search'() {
                this.categories = []
                for (var key in this.$store.state.products) {
                    if (key.toLowerCase().search(this.$store.state.search.toLowerCase()) !== -1) {
                        this.categories.push(key)
                    }
                }
                this.sortingBySales()
            }
        }
    }
</script>

<style scoped>
 .container {
     margin: 20px;
     margin-left: 30px;
     background: white;
     width: 80%;
     border-radius: 5px;
     max-height: 465px;
     display: flex;
     overflow-y: scroll;
     flex-direction: column;
 }
</style>

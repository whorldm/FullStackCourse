<template>
  <div>
    <h3>农业！查猪价</h3>
    <div>
      <label>输入地区：</label>
      <input type="text" @input="oninput" />
      <span>地区为：{{area}}</span>
    </div>
    <div>时间： {{date()}}</div>
    <echarts v-bind:options="chartsOptions" v-bind:area="area"></echarts>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      area: "北京",
      infos: []
    };
  },

  created() {
    const debounce = this.createDebounce(area => {
      this.queryPigPrice(area);
    }, 3000);

    this.queryPigPrice(this.area);

    this.$watch("area", area => debounce(area));
  },

  computed: {
    chartsOptions() {
      return {
        tooltip: {},
        legend: {
          data: ["价格"]
        },
        xAxis: {
          data: this.infos.map(info => info.area)
        },
        yAxis: {},
        series: {
          name: "价格",
          type: "bar",
          data: this.infos.map(info => {
            return {
              _area: info.area,
              value: info.price
            };
          })
        }
      };
    },
  },

  methods: {
    oninput(e) {
      this.area = e.data;
    },

    date() {
      const date = new Date();
      return (
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        "/" +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    },

    queryPigPrice(area) {
      fetch(`/price?area=${area}`)
        .then(res => res.json())
        .then(priceRes => {
          console.log('priceRes', priceRes.infos)
          this.infos = priceRes.infos;
        });
    }
  }
};
</script>
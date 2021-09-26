<template>
  <section>
    <section class="globo-monitor-container">
      <line-chart
        class="globo-monitor-card"
        v-if="loaded"
        :chartdata="cpuData"
        :options="options"
      />
      <line-chart
        class="globo-monitor-card"
        v-if="loaded"
        :chartdata="memoryData"
        :options="options"
      />
      <div class="globo-monitor-card" v-if="loaded">
        <div>
          Cluster Status : <div :class="statusClusterColor"> {{this.statusCluster}} </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import LineChart from "./../../components/Chart.vue";

export default {
  components: { LineChart },
  data() {
    return {
      loaded: false,
      cpuData: null,
      memoryData: null,
      statusCluster: null,
    };
  },

  computed: {
   statusClusterColor() {
    return {
      'statusGreen':true

    }
  }
  },

  async mounted() {
    this.loaded = false;
    /*cpu */
    try {
      let response = await fetch(
        "https://run.mocky.io/v3/b1bc5162-7cf2-4599-b1f5-e3bd58fcf07f"
      );
      let dataResponse = await response.json();

      this.cpuData = {
        labels: dataResponse.labels,
        datasets: [
          {
            label: "CPU Usage",
            backgroundColor: "#E0E0E0",
            data: dataResponse.data,
          },
        ],
      };

      /*cpu */

      /*memory */

      response = await fetch(
        "https://run.mocky.io/v3/d23c3262-967e-4567-b7f6-2fd263748811"
      );
      dataResponse = await response.json();

      this.memoryData = {
        labels: dataResponse.labels,
        datasets: [
          {
            label: "Memory Usage",
            backgroundColor: "#E0E0E0",
            data: dataResponse.data,
          },
        ],
      };
      /*memory */

      /*cluster status */

      response = await fetch(
        "https://run.mocky.io/v3/cab2791c-7c85-4461-b95c-86bc1a12dc72"
      );
      dataResponse = await response.json();
      console.log("status",dataResponse.status)
      this.statusCluster = dataResponse.status

      /*cluster status */

      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
<style scoped>
.globo-monitor-container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.globo-monitor-card {
  display: flex;
  margin: 30px;
  border-radius: 12px;
  border: 1px solid #000;
  background: linear-gradient(360deg, transparent 98%, #c4170c);
}
.statusGreen {
background-color: green;
}
.s1-2 {
  width: calc(50% - 8px);
}
.s1-4 {
  width: calc(25% - 8px);
}
</style>
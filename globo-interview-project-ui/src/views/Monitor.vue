<template>
  <div>
    <div class="globo-monitor-container">
      <line-chart
        class="globo-monitor-card"
        v-if="memoryUsage"
        :chartdata="memoryUsage"
        :options="null"
      />

      <line-chart
        class="globo-monitor-card"
        v-if="cpuUsage"
        :chartdata="cpuUsage"
        :options="null"
      />

      <div class="globo-monitor-card" v-if="clusterStatus">
        <div>
         AWS Cluster Status :
          <div :class="statusClusterColor">{{ clusterStatus }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "../components/Chart.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Monitor",
  components: { LineChart },
  created: function () {
    this.fetchMonitor();
  },

  computed: {
    statusClusterColor() {
      return {
        statusGreen: this.clusterStatus === "green",
        statusYellow: this.clusterStatus === "yellow",
        statusRed: this.clusterStatus === "red",
      };
    },
    ...mapGetters({
      cpuUsage: "cpuUsage",
      memoryUsage: "memoryUsage",
      clusterStatus: "clusterStatus",
    }),
  },
  methods: {
    ...mapActions(["fetchMonitor"]),
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
.statusYellow {
  background-color: yellow;
}
.statusRed {
  background-color: red;
}
.s1-2 {
  width: calc(50% - 8px);
}
.s1-4 {
  width: calc(25% - 8px);
}
</style>
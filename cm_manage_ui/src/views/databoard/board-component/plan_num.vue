<template>
  <div id="plan"></div>
</template>

<script>
import { Gauge } from "@antv/g2plot";
export default {
  name: "PlanNum",
  computed: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  mounted() {
    const gauge = new Gauge("plan", {
      percent: 0.6,
      range: {
        color: "#30BF78",
      },
      height: 220,
      width: '100%',
      indicator: {
        pointer: {
          style: {
            stroke: "#D0D0D0",
          },
        },
        pin: {
          style: {
            stroke: "#D0D0D0",
          },
        },
      },
      axis: {
        label: {
          formatter(v) {
            return Number(v) * 20;
          },
        },
        subTickLine: {
          count: 3,
        },
      },
      statistic: {
        content: {
          formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            color: "rgba(0,0,0,0.65)",
            fontSize: 16,
          },
        },
      },
    });

    gauge.render();
  },
};
</script>


<template>
  <div id="trend"></div>
</template>

<script>
import { DualAxes } from "@antv/g2plot";
export default {
  name: "Trend",
  computed: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  mounted() {
    const data = [
      { month: "1月", paricipate: 483, session: 5 },
      { month: "2月", paricipate: 462, session: 5 },
      { month: "3月", paricipate: 136, session: 2 },
      { month: "4月", paricipate: 0, session: 0 },
      { month: "5月", paricipate: 118, session: 2 },
      { month: "6月", paricipate: 176, session: 2 },
      { month: "7月", paricipate: 188, session: 2 },
      { month: "8月", paricipate: 443, session: 4 },
      { month: "9月", paricipate: 368, session: 4 },
      { month: "10月", paricipate: 351, session: 4 },
      { month: "11月", paricipate: 238, session: 3 },
      { month: "12月", paricipate: 212, session: 3 },
    ];

    const dualAxes = new DualAxes("trend", {
      data: [data, data],
      xField: "month",
      yField: ["paricipate", "session"],
      height: 220,
      legend: {
        layout: 'horizontal',
        position: 'bottom'
        },
      geometryOptions: [
        {
          geometry: "column",
        },
        {
          geometry: "line",
          smooth:true,
          lineStyle: {
            lineWidth: 2,
          }
        },
      ],
    });

    dualAxes.render();
  },
};
</script>


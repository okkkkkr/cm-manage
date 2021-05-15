<template>
  <div id="radar"></div>
</template>

<script>
import { Radar } from "@antv/g2plot";
export default {
  name: "Radar",
  computed: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  mounted() {
    const data = [
      { name: "教育活动", star: 5 },
      { name: "科技活动", star: 3 },
      { name: "公益活动", star: 5 },
      { name: "组织活动", star: 3 },
      { name: "文娱活动", star: 7 },
      { name: "体育活动", star: 2 }
    ];
    const radarPlot = new Radar("radar", {
      data: data.map((d) => ({ ...d, star: d.star })),
      xField: "name",
      yField: "star",
      height: 220,
      appendPadding: [0, 10, 0, 10],
      meta: {
        star: {
          alias: "举办场数",
          min: 0,
          nice: true,
          formatter: (v) => Number(v),
        },
      },
      xAxis: {
        tickLine: null,
      },
      yAxis: {
        label: false,
        grid: {
          alternateColor: "rgba(0, 0, 0, 0.04)",
        },
      },
      // 开启辅助点
      point: {
        size: 2,
      },
      area: {},
    });
    radarPlot.render();
  },
};
</script>


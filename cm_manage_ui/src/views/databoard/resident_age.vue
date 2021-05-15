<template>
  <div id="age"></div>
</template>

<script>
import { Column } from "@antv/g2plot";

export default {
  name: "ResidentAge",
  computed: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  mounted() {

    const data = [
      { type: "0-12岁", value: 33 },
      { type: "13-18岁", value: 21 },
      { type: "19-25岁", value: 69 },
      { type: "26-40岁", value: 93 },
      { type: "41-55岁", value: 67 },
      { type: "55岁以上", value: 31 }
    ];

    const paletteSemanticRed = "#F4664A";
    const brandColor = "#5B8FF9";
    const columnPlot = new Column("age", {
      data,
      xField: "type",
      yField: "value",
      seriesField: "",
      height: 300,
      legend: true,
      label: {
        // 可手动配置 label 数据标签位置
        position: "middle", // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: "#FFFFFF",
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      style:{
          height: 300
      }
    });

    columnPlot.render();
  },
};
</script>


<template>
  <div id="fund"></div>
</template>

<script>
import { Pie } from "@antv/g2plot";

export default {
  name: "Fund",
  computed: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  mounted() {
    const data = [
      { type: "教育活动", value: 2.8 },
      { type: "公益活动", value: 3.5 },
      { type: "文娱活动", value: 7.7 },
      { type: "科技活动", value: 2.3 },
      { type: "组织活动", value: 0.7 },
      { type: "体育活动", value: 0.5 },
    ];
    const piePlot = new Pie("fund", {
      appendPadding: 10,
      data,
      height: 220,
      angleField: "value",
      colorField: "type",
      radius: 1,
      innerRadius: 0.64,
      meta: {
        value: {
          formatter: (v) => `${v}万`,
        },
      },
      label: {
        type: "inner",
        offset: "-50%",
        autoRotate: false,
        style: { textAlign: "center" },
        formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      },
      statistic: {
        title: {
          offsetY: -8,
        },
        content: {
          offsetY: -4,
        },
      },
      // 添加 中心统计文本 交互
      interactions: [
        { type: "element-selected" },
        { type: "element-active" },
        {
          type: "pie-statistic-active",
          cfg: {
            start: [
              { trigger: "element:mouseenter", action: "pie-statistic:change" },
              {
                trigger: "legend-item:mouseenter",
                action: "pie-statistic:change",
              },
            ],
            end: [
              { trigger: "element:mouseleave", action: "pie-statistic:reset" },
              {
                trigger: "legend-item:mouseleave",
                action: "pie-statistic:reset",
              },
            ],
          },
        },
      ],
    });

    piePlot.render();
  },
};
</script>


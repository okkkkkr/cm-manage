<template>
  <div id="idBox"></div>
</template>

<script>
import { Pie } from "@antv/g2plot";

export default {
  name: "ResidentId",
  computed: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  mounted() {
    const data = [
      { type: "学生或其他", value: 108 },
      { type: "社会工作者", value: 211 },
    ];

    const piePlot = new Pie("idBox", {
      appendPadding: 10,
      data,
      height: 300,
      angleField: "value",
      colorField: "type",
      radius: 1,
      innerRadius: 0.64,
      meta: {
        value: {
          formatter: (v) => `${v}`,
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


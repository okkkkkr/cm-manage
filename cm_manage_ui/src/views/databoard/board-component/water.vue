<template>
  <div :id="idName"></div>
</template>

<script>
import { Liquid, measureTextWidth } from "@antv/g2plot";

export default {
  name: "Water",
  computed: {},
  props: {
    idName:{
      type: String
    },
    nums: {
      type: String
    },
    title: {
      type: String
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  mounted() {
    const liquidPlot = new Liquid(document.getElementById(this.idName), {
      percent: Number(this.nums),
      radius: 0.8,
      height: 220,
      outline: {
        border: 4,
        distance: 8,
      },
      statistic: {
        title: {
          formatter: () => this.title,
          style: ({ percent }) => ({
            fill: percent > 0.65 ? "white" : "rgba(44,53,66,0.85)",
          }),
        },
        content: {
          style: ({ percent }) => ({
            fontSize: 60,
            lineHeight: 1,
            fill: percent > 0.65 ? "white" : "rgba(44,53,66,0.85)",
          }),
          customHtml: (container, view, { percent }) => {
            const { width, height } = container.getBoundingClientRect();
            const d = Math.sqrt(
              Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
            );
            const text = ` ${(percent * 100).toFixed(0)}%`;
            const textWidth = measureTextWidth(text, { fontSize: 60 });
            const scale = Math.min(d / textWidth, 1);
            return `<div style="width:${d}px;display:flex;align-items:center;justify-content:center;font-size:${scale}em;line-height:${
              scale <= 1 ? 1 : "inherit"
            }">${text}</div>`;
          },
        },
      },
      liquidStyle: ({ percent }) => {
        return {
          fill: percent <= 0.40 ? "#5B8FF9" : percent > 0.40 && percent < 0.8? '#FAAD14' : "#FF6B3B",
          stroke: percent <= 0.40 ? "#5B8FF9" : percent > 0.40 && percent < 0.8? '#FAAD14' : "#FF6B3B",
        };
      },
      color: () => "#5B8FF9",
    });
    liquidPlot.render();

    let data = 0;
    const interval = setInterval(() => {
      data += 0.01;
      if (data < Number(this.nums) + 0.01) {
        liquidPlot.changeData(data);
      } else {
        clearInterval(interval);
      }
    }, 10);
  },
};
</script>


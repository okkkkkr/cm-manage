<template>
  <div id="weekday"></div>
</template>

<script>
import { Column } from "@antv/g2plot";
export default {
  name: "JoinPercent",
  computed: {},
  data() {
    return {};
  },
  prop:{
      tableData:{
          type: Array
      }
  },
  created() {},
  methods: {},
  mounted() {
    const data = [
        {
        status: "非本社区居民",
        weekday: "周一",
        value: 52,
      },
      {
        status: "本社区居民",
        weekday: "周一",
        value: 188,
      },
      {
        status: "非本社区居民",
        weekday: "周二",
        value: 47,
      },
      {
        status: "本社区居民",
        weekday: "周二",
        value: 143,
      },
      {
        status: "非本社区居民",
        weekday: "周三",
        value: 94,
      },
      {
        status: "本社区居民",
        weekday: "周三",
        value: 366,
      },
      {
        status: "非本社区居民",
        weekday: "周四",
        value: 69,
      },
      {
        status: "本社区居民",
        weekday: "周四",
        value: 231,
      },
      {
        status: "非本社区居民",
        weekday: "周五",
        value: 167,
      },
      {
        status: "本社区居民",
        weekday: "周五",
        value: 303,
      },
      {
        status: "非本社区居民",
        weekday: "周六",
        value: 188,
      },
      {
        status: "本社区居民",
        weekday: "周六",
        value: 310,
      },
      {
        status: "非本社区居民",
        weekday: "周日",
        value: 132,
      },
      {
        status: "本社区居民",
        weekday: "周日",
        value: 288,
      },
      
    ];

    const columnPlot = new Column("weekday", {
      data,
      xField: "weekday",
      yField: "value",
      seriesField: "status",
      height: 220,
      legend: {
        layout: "horizontal",
        position: "bottom",
      },
      isPercent: true,
      isStack: true,
      label: {
        position: "middle",
        content: (item) => {
          return item.value.toFixed(2)*100 + '%';
        },
        style: {
          fill: "#fff",
        },
      },
    });

    columnPlot.render();
  },
};
</script>


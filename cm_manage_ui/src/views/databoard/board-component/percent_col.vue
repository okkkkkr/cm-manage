<template>
  <div id="person"></div>
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
        status: "报名限额剩余",
        AcType: "教育活动",
        value: 98,
      },
      {
        status: "已报名",
        AcType: "教育活动",
        value: 202,
      },
      {
        status: "报名限额剩余",
        AcType: "科技活动",
        value: 43,
      },
      {
        status: "已报名",
        AcType: "科技活动",
        value: 387,
      },
      {
        status: "报名限额剩余",
        AcType: "公益活动",
        value: 12,
      },
      {
        status: "已报名",
        AcType: "公益活动",
        value: 388,
      },
      {
        status: "报名限额剩余",
        AcType: "组织活动",
        value: 32,
      },
      {
        status: "已报名",
        AcType: "组织活动",
        value: 68,
      },
      {
        status: "报名限额剩余",
        AcType: "文娱活动",
        value: 8,
      },
      {
        status: "已报名",
        AcType: "文娱活动",
        value: 492,
      },
      {
        status: "报名限额剩余",
        AcType: "体育活动",
        value: 32,
      },
      {
        status: "已报名",
        AcType: "体育活动",
        value: 58,
      },
      
    ];

    const columnPlot = new Column("person", {
      data,
      xField: "AcType",
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


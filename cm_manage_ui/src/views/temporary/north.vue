<template>
  <el-row>
    <el-col :span="12">
      <div id="container"></div>
    </el-col>
    <el-col :span="12"> </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "Databoard",
  computed: {},
  data() {
    return {
      name: "首页",
      t1: [],
      count: 0,
    };
  },
  created() {},
  methods: {
    ...mapActions("databoard", ["TEST_AXIOS"]), // （param1: 路径，param2: 函数名）

    fetchData() {
      const _this = this;
      fetch(
        "http://push2.eastmoney.com/api/qt/kamtbs.rtmin/get?fields1=f1,f3&fields2=f51,f62"
      )
        .then((res) => res.json())
        .then((data) => {
          for (let i in data.data.s2n) {
            let minutes = data.data.s2n[i].split(",")[0];
            let value = parseInt(data.data.s2n[i].split(",")[1]) / 10000;
            let item = {
              time: minutes,
              value: value,
            };
            _this.t1.push(item);
          }

          console.log(_this.t1)
        });
    },
           
    initG2() {
      var chart = new this.$G2.Chart({
        container: "container",
        autoFit: true,
        height: 400,
        // padding: [20, 0, 50, 100],
      });
      this.t1 = [];
      this.fetchData();

      setInterval(() => {
        this.fetchData();
      }, 60000);

      //chageData属性改变数据源并重绘
      setInterval(() => {
        chart.changeData(this.t1);
        // chart.repaint();
      }, 61000);

      setTimeout(() => {
        chart.data(this.t1);
        // 线条作色(画线条)
        chart.scale({
          time: {
            tickCount: 10,
          },
          value: {
            nice: true,
          },
        });
        chart.axis("time", {
          label: {
            formatter: (text) => {
              return text;
            },
          },
        });

        chart.line().position("time*value");
        // 分段颜色
        chart.annotation().regionFilter({
          top: true,
          start: ["min", "max"],
          end: ["max", 0],
          color: "#f5222d",
        });

        chart.annotation().regionFilter({
          top: true,
          start: ["min", 0],
          end: ["max", "min"],
          color: "#2fc25b",
        });
        // 最后一步渲染
        chart.render();

        return this;
      }, 200);
    },
  },
  mounted() {
    var _this = this;
    this.$nextTick(() => {
      _this.initG2();
    });
  },
};
</script>


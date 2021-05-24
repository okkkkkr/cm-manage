<template>
  <div class="data-container">
    <el-row :gutter="20">
      <el-col style="height: 90vh" :span="7">
        <el-card shadow="hover" class="siderCard">
          <el-row :gutter="20">
            <el-col :span="12">
              <water nums="0.7" title="完成度" idName="plan"></water>
              <div class="tips">活动计划举办完成度</div>
            </el-col>
            <el-col :span="12">
              <water nums="0.8" title="已使用" idName="money"></water>
              <div class="tips">活动资金使用率</div>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" class="siderCard">
          <join-percent></join-percent>
          <div class="tips">各类型活动报名占报名总限额比例统计</div>
        </el-card>
        <el-card shadow="hover" class="siderCard">
          <radar></radar>
          <div class="tips">各类型活动举办次数</div>
        </el-card>
      </el-col>
      <el-col style="height: 90vh" :span="10">
        <el-card style="height: 12%; margin-bottom: 25px">
          <div class="itemTitle">活动项目进度数据监控</div>
          <el-tooltip
            style="cursor: pointer"
            class="item"
            effect="dark"
            content="项目的计划时间进度"
            placement="bottom"
          >
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              :percentage="72"
              status="exception"
            ></el-progress>
          </el-tooltip>
        </el-card>
        <el-card shadow="hover" style="height: 52%; margin-bottom: 25px">
          <div class="itemTitle">活动参与排行 TOP10</div>
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            height="370"
          >
            <el-table-column label="排名" type="index" width="50">
            </el-table-column>
            <el-table-column prop="ac_participate_name" label="姓名">
            </el-table-column>
            <el-table-column prop="ac_participate_age" label="年龄">
            </el-table-column>
            <el-table-column prop="ac_participate_sex" label="性别">
            </el-table-column>
            <el-table-column prop="ac_participate_phone" label="联系方式" width="150">
            </el-table-column>
            <el-table-column prop="ac_participate_times" label="参与次数">
            </el-table-column>
            <el-table-column
              prop="ac_participate_address"
              label="是否本社区"
              width="120"
            >
            </el-table-column>
          </el-table>
        </el-card>
        <el-card shadow="hover" style="height: 32%">
          <trend></trend>
          <div class="tips">各月份举办活动场次与参与人数情况统计</div>
        </el-card>
      </el-col>
      <el-col style="height: 90vh" :span="7">
        <el-card shadow="hover" class="siderCard">
          <el-row :gutter="20">
            <el-col :span="12">
              <satisfy nums="0.8" title="满意度" idName="signup"></satisfy>
              <div class="tips">活动整体满意度</div>
            </el-col>
            <el-col :span="12">
              <satisfy nums="0.6" title="参与率" idName="join"></satisfy>
              <div class="tips">活动到场群众参与率</div>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" class="siderCard">
          <weekday-join></weekday-join>
          <div class="tips">举办日与参与人数统计图（区分是否为本社区人员）</div>
        </el-card>
        <el-card shadow="hover" class="siderCard">
          <fund></fund>
          <div class="tips">各类型活动占已使用资金情况</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PlanNum from "./board-component/plan_num";
import Water from "./board-component/water";
import Satisfy from "./board-component/satisfy";
import JoinPercent from "./board-component/percent_col";
import WeekdayJoin from "./board-component/weekday_join";
import Radar from "./board-component/radar";
import Fund from "./board-component/fund";
import Trend from "./board-component/line";
export default {
  name: "databoard",
  computed: {},
  components: {
    PlanNum,
    Water,
    Satisfy,
    JoinPercent,
    WeekdayJoin,
    Radar,
    Fund,
    Trend,
  },
  data() {
    return {
      tableData: [
        {
          ac_participate_name: "张三",
          ac_participate_age: "25",
          ac_participate_sex: "男",
          ac_participate_phone: "13127298139",
          ac_participate_address: "是",
          ac_participate_times: "21",
        },
        {
          ac_participate_name: "王丽",
          ac_participate_age: "27",
          ac_participate_sex: "女",
          ac_participate_phone: "13132298233",
          ac_participate_address: "是",
          ac_participate_times: "19",
        },
        {
          ac_participate_name: "李嘉栋",
          ac_participate_age: "37",
          ac_participate_sex: "男",
          ac_participate_phone: "13144608163",
          ac_participate_address: "是",
          ac_participate_times: "18",
        },
        {
          ac_participate_name: "陈滇",
          ac_participate_age: "46",
          ac_participate_sex: "男",
          ac_participate_phone: "13141232163",
          ac_participate_address: "是",
          ac_participate_times: "18",
        },
        {
          ac_participate_name: "钟旻楠",
          ac_participate_age: "32",
          ac_participate_sex: "女",
          ac_participate_phone: "18666232163",
          ac_participate_address: "是",
          ac_participate_times: "17",
        },
        {
          ac_participate_name: "林茂",
          ac_participate_age: "38",
          ac_participate_sex: "女",
          ac_participate_phone: "13726236213",
          ac_participate_address: "是",
          ac_participate_times: "16",
        },
        {
          ac_participate_name: "林沫鼐",
          ac_participate_age: "23",
          ac_participate_sex: "女",
          ac_participate_phone: "13723986213",
          ac_participate_address: "是",
          ac_participate_times: "14",
        },
        {
          ac_participate_name: "聂盛林",
          ac_participate_age: "58",
          ac_participate_sex: "男",
          ac_participate_phone: "13722136783",
          ac_participate_address: "是",
          ac_participate_times: "13",
        },
        {
          ac_participate_name: "王德胜",
          ac_participate_age: "23",
          ac_participate_sex: "男",
          ac_participate_phone: "13292830213",
          ac_participate_address: "否",
          ac_participate_times: "10",
        },
        {
          ac_participate_name: "林宥胜",
          ac_participate_age: "22",
          ac_participate_sex: "男",
          ac_participate_phone: "13700921213",
          ac_participate_address: "是",
          ac_participate_times: "8",
        },
      ],
    };
  },
  created() {},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return "";
      } else {
        return "gray";
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.data {
  &-container {
    min-height: 90vh;
    padding: 20px 20px;
    background-color: #eeeeee;
  }
}

.siderCard {
  height: 32%;
  margin-bottom: 25px;
}

.itemTitle {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.indicators {
  text-align: center;
}

.tips {
  font-weight: bold;
  text-align: center;
}

/deep/.el-table .gray {
  background: #f4f4f5;
}

/deep/.el-table__body-wrapper {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>


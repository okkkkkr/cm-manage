<template>
  <div class="power-container">
    <el-card class="box-card">
      <p>
        <i class="el-icon-info" style="font-size: 20px; color: #409eff"></i>
        <span class="power-title">权限监管</span>
      </p>
      <el-row :gutter="50">
        <el-col :span="4">
          <el-input
            placeholder="个体名称检索"
            prefix-icon="el-icon-search"
            v-model="unitName"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            placeholder="所在地检索"
            prefix-icon="el-icon-search"
            v-model="unitLocation"
          >
          </el-input>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 20px"></div>

    <div class="another-cont">
      <el-card
        style="margin-bottom: 20px"
        v-for="unit in unitList"
        :key="unit.guid"
        class="box-card"
      >
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-s-home another-icon"></i
              ><span class="unit-info">{{
                role == "cm"
                  ? unit.cm_name
                  : role == "ht"
                  ? unit.ht_name
                  : unit.admin_name
              }}</span>
              <i
                style="margin-left: 50px"
                class="el-icon-location another-icon"
              ></i
              ><span class="unit-info">{{
                role == "cm"
                  ? unit.cm_address
                  : role == "ht"
                  ? unit.ht_address
                  : unit.admin_place
              }}</span>
            </template>
            <el-row>
              <div class="power-item">
                <span>所有权限：</span>
                <el-tooltip
                  :content="allPower == 1 ? '关闭权限' : '开放权限'"
                  placement="top"
                >
                  <el-switch
                    v-model="allPower"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                  >
                  </el-switch>
                </el-tooltip>
              </div>
              <el-col
                :span="4"
                class="power-item"
                v-for="item in powerList"
                :key="item.title"
              >
                <span>{{ item.title }}：</span>
                <el-tooltip
                  :content="item.value == 1 ? '关闭权限' : '开放权限'"
                  placement="top"
                >
                  <el-switch
                    v-model="item.value"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                  >
                  </el-switch>
                </el-tooltip>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getHostList, getCommunityList, getAdminList } from "@/api/user";
import { getLocal } from "../../../utils/handleCache";
export default {
  data() {
    return {
      unitName: "",
      unitLocation: "",
      currentPage: 1,
      role: "",
      unitName: "",
      location: "",
      tableData: [],
      allPower: "1",
      powerString: "",
      unitList: [],
      cm_power: [
        {
          title: "项目委托发布",
          value: "1",
        },
        {
          title: "居民信息管理",
          value: "1",
        },
        {
          title: "活动流程编辑",
          value: "1",
        },
        {
          title: "活动数据监控",
          value: "1",
        },
        {
          title: "个体信息监管",
          value: "1",
        },
      ],
      ht_power: [
        {
          title: "项目承接",
          value: "1",
        },
        {
          title: "活动举办",
          value: "1",
        },
        {
          title: "活动流程编辑",
          value: "1",
        },
        {
          title: "活动数据监控",
          value: "1",
        },
        {
          title: "个体信息监管",
          value: "1",
        },
      ],
      ad_power:[
        {
          title: "活动发布审核",
          value: "1",
        },
        {
          title: "个体信息监管",
          value: "1",
        },
        {
          title: "个体权限监管",
          value: "1",
        },
        {
          title: "活动流程监管",
          value: "1",
        },
        {
          title: "活动项目监管",
          value: "1",
        },
      ],
      powerList: [
      ],
    };
  },
  watch: {
    allPower: function (val) {
      if (val == "0") {
        for (let item of this.powerList) {
          item.value = val;
        }
      }
      if (this.ownership == "00000") {
        for (let item of this.powerList) {
          item.value = val;
        }
      }
    },

    powerList: {
      deep: true,
      immediate: false,
      handler() {
        this.powerString = "";
        for (let item of this.powerList) {
          this.powerString += item.value;
        }
      },
    },

    ownership: function (val) {
      if (val == "00000") {
        this.allPower = "0";
      } else {
        this.allPower = "1";
      }
    },
  },
  computed: {
    ownership: {
      get: function () {
        return this.powerString;
      },
    },
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    handleClick(row) {
      console.log(row);
    },
  },

  mounted() {
    this.role =
      this.$route.path == "/ad-charge/cm-power"
        ? "cm"
        : this.$route.path == "/ad-charge/ht-power"
        ? "ht"
        : "ad";
    if (this.role == "cm") {
      this.powerList = this.cm_power
      getCommunityList("1", "100").then((res) => {
        this.unitList = res.data;
      });
    } else if (this.role == "ht") {
      this.powerList = this.ht_power
      getHostList("1", "100").then((res) => {
        this.unitList = res.data;
      });
    } else {
      this.powerList = this.ad_power
      getAdminList("1", "100").then((res) => {
        this.unitList = res.data;
      });
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../../styles/admin/power_info.less";
</style>
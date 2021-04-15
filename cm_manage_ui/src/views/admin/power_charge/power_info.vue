<template>
  <div class="power-container">
    <el-card class="box-card">
      <p>
        <i class="el-icon-info" style="font-size: 20px; color: #409eff"></i>
        <span class="power-title">承办方权限</span>
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
            placeholder="所在地址检索"
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
      <el-card class="box-card">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-s-home another-icon"></i
              ><span class="unit-info">北京理工大学珠海学院</span>
              <i
                style="margin-left: 50px"
                class="el-icon-location another-icon"
              ></i
              ><span class="unit-info">广东省珠海市香洲区金凤路10号</span>
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
export default {
  data() {
    return {
      unitName: "",
      unitLocation: "",
      currentPage: 1,
      tableData: [],
      allPower: "1",
      powerString: "",
      powerList: [
        {
          title: "活动发布",
          value: "1",
        },
        {
          title: "活动申办",
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
        this.powerString = '';
        for (let item of this.powerList) {
          this.powerString += item.value;
        }
      }
      
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
};
</script>

<style lang="less" scoped>
  @import '../../../styles/admin/power_info.less';
</style>
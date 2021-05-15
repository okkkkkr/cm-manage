<template>
  <div class="activity-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <div
          style="
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <span>关键指标</span>
          <el-button @click="createUnit()" type="text" style="font-size: 16px"
            >发起项目</el-button
          >

          <el-dialog title="项目信息" :visible.sync="dialogFormVisible">
            <el-form
              :model="orderInfo"
              status-icon
              ref="orderInfo"
              :rules="rules"
              label-width="100px"
              class="demo-orderInfo"
              label-position="top"
            >
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="项目名称" prop="item_name">
                    <el-input v-model="orderInfo.item_name"></el-input>
                  </el-form-item>

                  <el-form-item label="开始日期" prop="begin_time">
                    <div class="block">
                      <el-date-picker
                        style="width: 100%"
                        v-model="orderInfo.begin_time"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy/MM/dd "
                        value-format="yyyy/MM/dd"
                      >
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合作承办方" prop="ht_guid">
                    <el-select
                      style="width: 100%"
                      v-model="orderInfo.ht_guid"
                      filterable
                      placeholder="请选择"
                      
                    >
                      <el-option
                        v-for="item in htList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="结束日期" prop="end_time">
                    <div class="block">
                      <el-date-picker
                        style="width: 100%"
                        v-model="orderInfo.end_time"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy/MM/dd "
                        value-format="yyyy/MM/dd"
                      >
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="投入资金（元）" prop="ac_fund">
                    <el-input v-model="orderInfo.ac_fund"></el-input>
                  </el-form-item>
                  <el-form-item label="处理人" prop="handler_id">
                    <el-input
                      v-model="orderInfo.handler_id"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item style="text-align: center; margin-top: 20px">
                <el-button type="primary" @click="submitForm('orderInfo')"
                  >提交</el-button
                >
                <el-button @click="resetForm('orderInfo')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
      <el-row >
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">项目总数</li>
              <li style="font-size: 24px; font-weight: bold">
                {{ page.total || "暂无" }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">项目状态</li>
              <li>
                <span style="font-size: 24px" class="choseItem">
                  {{ itemName }}
                </span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <div class="order-info">
      <span class="host">承办方</span>
      <el-select
        style="margin-left: 10px"
        v-model="htName"
        filterable
        placeholder="请选择，默认显示全部"
        @change="searchHost"
      >
        <el-option
          v-for="item in htList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          
        >
        </el-option>
      </el-select>
    </div>
    <div class="block">
      <el-table :data="tableData" style="width: 100%; max-height: 500px" border>
        <el-table-column prop="activity_items_id" label="项目ID" width="300">
        </el-table-column>
        <el-table-column prop="ac_items_name" label="项目名称" width="300">
        </el-table-column>
        <el-table-column
          prop="ac_items_applicant"
          label="项目申办人"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="ac_items_bid_time"
          label="项目申办日期"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="ac_items_end_time"
          label="项目结束日期"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="ac_items_money"
          label="项目投入资金（元）"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="ac_items_state" label="当前状态" width="150">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag
                size="medium"
                :type="
                  scope.row.ac_items_state == '0'
                    ? 'danger'
                    : scope.row.ac_items_state == '2'
                    ? 'success'
                    : 'warning'
                "
                >{{
                  scope.row.ac_items_state == "1"
                    ? "审核中"
                    : scope.row.ac_items_state == "0"
                    ? "已拒绝"
                    : "已通过"
                }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="success" size="small"
              >详情</el-button
            >
            <el-button @click="routerPush('/cm-data/index')" type="primary" size="small"
              >数据</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="page.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getValidActivityByGuid, getTypeList } from "@/api/related";
import { getHostList } from "@/api/user";
import { getItemList } from "@/api/unit";
import { addActivity, getCMActivity, getActivityByGuid } from "@/api/activity";
import { getLocal } from "@/utils/handleCache";
import { notice } from "@/utils/message";

export default {
  name: "Fund",
  data() {
    return {
      dialogFormVisible: false,
      itemName: "全部",
      htName: "",
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
      tableData: [],
      orderInfo: {
        cm_guid: "",
        item_name: "",
        ht_guid: "",
        ac_fund: "",
        begin_time: "",
        end_time: "",
        handler_id: "",
        handler_name: "",
      },
      rules: {
        item_name: [{ required: true, trigger: "blur" }],
        ht_guid: [{ required: true, trigger: "blur" }],
        ac_fund: [{ required: true, trigger: "blur" }],
        begin_time: [{ required: true, trigger: "blur" }],
        end_time: [{ required: true, trigger: "blur" }],
        handler_name: [{ required: true, trigger: "blur" }]
      },
      acType: [],
      itemList: [],
      htList: [],
    };
  },
  created() {
    this.getUnitList();

    getHostList("1", "10000")
      .then((res) => {
        let items = res.data;
        items.forEach((item) => {
          this.htList.push({ label: item.ht_name, value: item.guid });
        });
      })
      .catch((err) => {
        notice("error", "服务器出错！");
      });
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getUnitList();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getUnitList();
    },

    // 列表操作
    handleClick(row) {
      let itemData = {
        ...row,
      };
      this.$router.push({ name: "CMItemInfo", params: itemData });
    },

    handleCommand(command) {
      this.publishState = command;
    },

    getUnitList() {
      let param = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
        role: JSON.parse(getLocal('role')),
        belong: this.htName
      };
      getItemList(param)
        .then((res) => {
          this.tableData = res.data;
          this.page.total = res.total;
        })
        .catch((err) => {
          notice("error", "数据加载出错");
        });
    },
    
    createUnit() {
      this.dialogFormVisible = true;
      var _self = this;
      setTimeout(function () {
        _self.resetForm("orderInfo");
        _self.orderInfo.handler_id =
          JSON.parse(JSON.parse(getLocal("userInfo")))._id ||
          JSON.parse(JSON.parse(getLocal("unitInfo"))).guid;
      }, 100);
      if (this.itemList.length == 0) {
        // 获取依托项目列表
        getValidActivityByGuid({
          guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
        })
          .then((res) => {
            console.log(res);
            let items = res.data;
            items.forEach((item) => {
              this.itemList.push({
                label: item.ac_items_bid_time + " -- " + item.ac_items_name,
                value: item.activity_items_id,
              });
            });
          })
          .catch((err) => {
            notice("error", "服务器出错！");
          });
      }

      if (this.acType.length == 0) {
        getTypeList()
          .then((res) => {
            let items = res.data;
            items.forEach((item) => {
              this.acType.push({
                label: item.type_name,
                value: item.type_name,
              });
            });
          })
          .catch((err) => {
            notice("error", "服务器出错！");
          });
      }
    },

    // 路由跳转
    routerPush(pathName) {
      this.$router.push({ path: pathName });
    },

    //表单操作
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增项目
          this.orderInfo.cm_guid = JSON.parse(
            JSON.parse(getLocal("unitInfo"))
          ).guid;
          this.orderInfo.handler_name = JSON.parse(
            JSON.parse(getLocal("userInfo"))
          ).manager_name;
          addActivity(this.orderInfo)
            .then((res) => {
              if (res.code == 200) {
                notice("success", res.message);

                this.getUnitList();

                this.dialogFormVisible = false;
              } else {
                notice("warning", res.message);
                this.dialogFormVisible = false;
              }
            })
            .catch((err) => {
              this.dialogFormVisible = false;
              console.log(err);
              notice("error", "服务器错误！");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    viewDetails(item) {
      this.$router.push({
        path: "/cm-related/activityInfo",
        query: { detail: item },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/related/publish_info.less";
</style>


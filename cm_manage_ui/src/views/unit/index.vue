<template>
  <div class="unit-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>个体简介</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="routerPush('/personal/set')"
          >修改</el-button
        >
      </div>

      <el-row>
        <el-col :span="2">
          <div class="text item">
            <div class="demo-image">
              <div class="block">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="logo"
                  fit="fill"
                ></el-image>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="21">
          <div class="unit-name">{{ unitInfo.name }}</div>
          <p class="unit-basic">
            <i class="el-icon-phone"></i>
            {{ unitInfo.phone }}
            <i style="margin-left: 20px" class="el-icon-location"></i>
            {{ unitInfo.location }}
          </p>
          <p class="unit-basic">
            <i class="el-icon-s-order"></i>
            {{ unitInfo.introduce }}
          </p>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>关键指标</span>
      </div>
      <el-row>
        <el-col :span="8">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">活动项目</li>
              <li style="font-size: 24px; font-weight: bold">
                {{ page.total }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="indicators" style="cursor: pointer;" @click="routerPush('/cm-residents/index')">
            <ul>
              <li style="font-size: 12px">社区居民</li>
              <li style="font-size: 24px; font-weight: bold">
                {{ indicators.residents }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div  class="indicators" style="cursor: pointer;" @click="routerPush('/cm-related/inform')">
            <ul>
              <li style="font-size: 12px">新的消息</li>
              <li style="font-size: 24px; font-weight: bold">
                {{ indicators.message }}
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card v-if="site.length != 0" class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>个体环境介绍</span>
      </div>
      <div class="block">
        <el-carousel :interval="3000" type="card">
          <el-carousel-item v-for="item in site" :key="item.location">
            <img :src="item.src" :alt="item.location" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>

    <div v-if="site.length != 0" class="separator" style="height: 30px"></div>

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
          <span>我的项目</span>
          <el-button type="text" style="font-size: 16px" @click="routerPush('/cm-related/publish')"
            >新增项目</el-button
          >
        </div>

        <el-dialog title="项目信息" :visible.sync="dialogFormVisible">
          <el-form
            :model="items_info"
            status-icon
            ref="items_info"
            :rules="rules"
            label-width="100px"
            class="demo-items_info"
            label-position="top"
          >
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="项目名称" prop="ac_items_name">
                  <el-input v-model="items_info.ac_items_name"></el-input>
                </el-form-item>
                <el-form-item
                  label="申办社区(Guid)"
                  prop="ac_items_holder_guid"
                >
                  <el-input
                    v-model="items_info.ac_items_holder_guid"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申办日期" prop="ac_items_bid_time">
                  <el-input v-model="items_info.ac_items_bid_time"></el-input>
                </el-form-item>
                <el-form-item label="申办人" prop="ac_items_applicant">
                  <el-input
                    v-model="items_info.ac_items_applicant"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束日期" prop="ac_items_end_time">
                  <div class="block">
                    <el-date-picker
                      v-model="items_info.ac_items_end_time"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy/MM/dd "
                      value-format="yyyy/MM/dd"
                    >
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item style="text-align: center; margin-top: 20px">
              <el-button type="primary" @click="submitForm('items_info')"
                >提交</el-button
              >
              <el-button @click="resetForm('items_info')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>

      <div class="block" style="margin-top: 10px;">
      <el-table :data="tableData" style="width: 100%;" border>
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
          sortable
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="ac_items_end_time"
          label="项目结束日期"
          sortable
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
    </el-card>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getLocal } from "@/utils/handleCache";
import { notice } from "@/utils/message";
import { addItem, getItemList, getActivityNum } from "@/api/unit";
import { getResidentsNum } from "@/api/residents";
import { getInform } from "@/api/inform";

export default {
  name: "Unit",
  computed: {},
  data() {
    return {
      role: JSON.parse(getLocal('role')),
      name: "首页",
      dialogFormVisible: false,
      indicators: {
        residents: "",
        active: "",
        message: "",
      },
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
      unitInfo: {
        guid: "",
        name: "",
        location: "",
        phone: "",
        introduce: "",
      },
      tableData: [],
      logo: "",
      site: [],
      items_info: {
        activity_items_id: "",
        ac_items_name: "",
        ac_items_holder_guid: "",
        ac_items_bid_time: "",
        ac_items_end_time: "",
        ac_items_applicant: "",
      },
      rules: {
        ac_items_name: [{ required: true, trigger: "blur" }],
        ac_items_bid_time: [{ required: true, trigger: "blur" }],
        ac_items_end_time: [{ required: true, trigger: "blur" }],
        ac_items_applicant: [{ required: true, trigger: "blur" }],
      },
    };
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
        total: this.indicators.active,
      };
      this.$router.push({ name: "CMItemInfo", params: itemData });
    },

    // 路由跳转
    routerPush(pathName) {
      this.$router.push({ path: pathName });
    },

    createUnit() {},

    getUnitList() {
      let param = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
        role: this.role
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

    //表单操作
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增项目
          addItem(this.items_info)
            .then((res) => {
              if (res.code == 200) {
                notice("success", res.message);
                this.dialogFormVisible = false;
              } else {
                notice("warning", res.message);
                this.dialogFormVisible = false;
              }
              this.getUnitList();
            })
            .catch((err) => {
              this.dialogFormVisible = false;
              // console.log(err)
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
      var _self = this;
      setTimeout(() => {
        let date = new Date();
        _self.items_info.ac_items_holder_guid = JSON.parse(
          JSON.parse(getLocal("unitInfo"))
        ).guid;
        _self.items_info.ac_items_applicant =
          JSON.parse(JSON.parse(getLocal("userInfo"))).manager_name ||
          JSON.parse(JSON.parse(getLocal("unitInfo"))).guid;
        _self.items_info.ac_items_bid_time = `${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}`;
      }, 100);
    },

    setInfo() {
      let info = JSON.parse(JSON.parse(getLocal("unitInfo")));
      this.unitInfo.guid = info.guid;
      this.unitInfo.name = info.cm_name;
      this.unitInfo.phone = info.cm_phone;
      this.unitInfo.location = info.cm_address;
      this.unitInfo.introduce = info.cm_introduce;
      this.logo = info.cm_logo;
      if (info.cm_image) {
        let imgList = JSON.parse(info.cm_image);
        imgList.forEach((item) => {
          this.site.push({ src: item });
        });
      }
    },

    getIndicators() {
      getResidentsNum({
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
      }).then((res) => {
        this.indicators.residents = res.data.num;
      });

      getInform({
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
      }).then((res) => {
        this.indicators.message = res.data.num;
      });

      getActivityNum({
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
        role: JSON.parse(getLocal("role"))
      }).then((res) => {
        this.indicators.active = res.data.num;
      });

      getInform({
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
        role: JSON.parse(getLocal("role")),
        state: '0'
      }).then((res) => {
        this.indicators.message = res.data.length;
      });
    },
  },
  created() {
    this.setInfo();
    this.getUnitList();
    this.getIndicators();
  },
};
</script>

<style lang="less" scoped>
@import url("../../styles/unit/index.less");
</style>

<template>
  <div class="unit-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>个体简介</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="routerPush('/ht-personal/set')"
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
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">项目委托(含拒绝)</li>
              <li style="font-size: 24px; font-weight: bold">
                {{ page.total }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="cursor: pointer;" @click="routerPush('/ht-related/inform')" class="indicators">
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
          <span>我的活动</span>
        </div>
      </div>

     <div class="block" style="margin-top: 10px;">
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
    </el-card>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getLocal } from "@/utils/handleCache";
import { notice } from "@/utils/message";
import { addItem, getItemList, getHTActivity } from "@/api/unit";
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
        message: ""
      },
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      unitInfo: {
        guid: "",
        name: "",
        location: "",
        phone: "",
        introduce: ""
      },
      tableData: [],
      logo: "",
      site: [],
      itemsInfo: {
        activity_items_id: "",
        ac_items_name: "",
        ac_items_holder_guid: "",
        ac_items_bid_time: "",
        ac_items_end_time: "",
        ac_items_applicant: ""
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
      };
      this.$router.push({ name: "ItemInfo", params: itemData });
    },

    // 路由跳转
    routerPush(pathName) {
      this.$router.push({ path: pathName });
    },

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
    setInfo() {
      let info = JSON.parse(JSON.parse(getLocal("unitInfo")));
      this.unitInfo.guid = info.guid;
      this.unitInfo.name = info.ht_name;
      this.unitInfo.phone = info.ht_phone;
      this.unitInfo.location = info.ht_address;
      this.unitInfo.introduce = info.ht_introduce;
      this.logo = info.ht_logo;
      if (info.ht_image) {
        let imgList = JSON.parse(info.ht_image) || "";
        if (imgList != "") {
          imgList.forEach((item) => {
            this.site.push({ src: item });
          });
        }
      }
    },

    getIndicators() {
      getInform({
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
        role: JSON.parse(getLocal("role")),
        state: '0'
      }).then((res) => {
        this.indicators.message = res.data.length;
      });
    }
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

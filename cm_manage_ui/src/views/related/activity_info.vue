<template>
  <!-- 活动详情 -->
  <div class="details-container">
    <el-card class="box-card">
      <el-row>
        <el-col :span="11">
          <div class="indicators">
            <ul>
              <li>
                <el-avatar
                  shape="square"
                  :size="100"
                  fit="fill"
                  :src="this.detailInfo.community.cm_logo"
                ></el-avatar>
              </li>
              <li class="unit-name">{{ this.detailInfo.community.cm_name }}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="Icon">
            <div class="img-wrapper">
              <div class="dot"></div>
              <div class="wave"></div>
              <img
                src="../../assets/images/activity_details/shakehands.png"
                alt=""
              />
            </div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="indicators">
            <ul>
              <li>
                <el-avatar
                  shape="square"
                  :size="100"
                  fit="fill"
                  :src="detailInfo.host.ht_logo"
                ></el-avatar>
              </li>
              <li class="unit-name">{{ detailInfo.host.ht_name }}</li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card class="box-card">
      <p>
        <i class="el-icon-time"></i>
        活动时间：<span style="color: #409eff" class="ac-content">{{
          activityInfo.ac_begin_time || "待完善"
        }}</span>
        &nbsp;<span class="ac-content">至</span>&nbsp;
        <span style="color: #409eff" class="ac-content">{{
          activityInfo.ac_end_time || "待完善"
        }}</span>
      </p>
      <el-row class="activity_basic">
        <el-col :span="8">
          <p>
            <i class="el-icon-document"></i>
            活动名称：<span class="ac-content">{{
              activityInfo.ac_name || "待完善"
            }}</span>
          </p>
          <p style="padding-top: 15px">
            <i class="el-icon-document"></i>
            活动类型：<span class="ac-content">{{
              activityInfo.ac_type || "待完善"
            }}</span>
          </p>
        </el-col>
        <el-col :span="8">
          <p>
            <i class="el-icon-place"></i>
            活动地点：<span class="ac-content">{{
              activityInfo.ac_address || "待完善"
            }}</span>
          </p>
          <p style="padding-top: 15px">
            <i class="el-icon-user"></i>
            活动负责人：<span class="ac-content">{{
              activityInfo.ac_contact_name || "待完善"
            }}</span>
          </p>
        </el-col>
        <el-col :span="8">
          <p>
            <i class="el-icon-loading"></i>
            发布状态：<span class="ac-content">{{
              activityInfo.ac_publish == "0" ? "未发布" : "已发布"
            }}</span>
          </p>
          <p style="padding-top: 15px">
            <i class="el-icon-user"></i>
            联系方式：<span class="ac-content">{{
              activityInfo.ac_contact_phone || "待完善"
            }}</span>
          </p>
        </el-col>
      </el-row>
      <p>
        <i class="el-icon-data-analysis"></i>
        活动介绍
      </p>
      <div class="ac-content" style="line-height: 24px">
        {{ activityInfo.ac_introduce || "活动内容待完善" }}
      </div>

      <div class="separator" style="height: 20px"></div>
      <router-link
        :to="{ path: 'setActivityInfo', query: { detail: this.detailInfo } }"
        replace
      >
        <el-button
          v-show="activityInfo.ac_publish == '0' && role == 'ht'"
          type="warning"
          plain
          >点击完善各项信息</el-button
        >
      </router-link>

      <el-row class="signUp" v-if="activityInfo.ac_publish == '1'">
        <el-col :span="3"> <i class="el-icon-data-line"></i> 报名进度 </el-col>
        <el-col :span="18">
          <div>
            <el-progress
              :text-inside="true"
              :stroke-width="24"
              :percentage="percent"
              :status="
                percent <= 33
                  ? 'success'
                  : percent > 33 && percent <= 66
                  ? 'warning'
                  : 'exception'
              "
            ></el-progress>
          </div>
        </el-col>
        <el-col :span="3" style="text-align: center">
          <span class="ac-content">{{ activityInfo.ac_sign_up_ready }}</span>
          <span class="ac-content"> / </span>
          <span class="ac-content">{{ activityInfo.ac_sign_up }}</span>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>
    <div class="another-cont">
      <div class="separator" style="height: 10px"></div>

      <el-card class="box-card">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              物资清单<i class="header-icon el-icon-info another-icon"></i>
            </template>
            <el-table :data="suppliesList" style="width: 100%" border>
              <el-table-column
                prop="ac_supplies_name"
                label="物资名称"
              >
              </el-table-column>
              <el-table-column
                prop="ac_supplies_unit"
                label="物资单位"
              >
              </el-table-column>
              <el-table-column
                prop="ac_supplies_num"
                label="物资数量"
              >
              </el-table-column>
              <el-table-column
                prop="ac_supplies_price"
                label="物资单价（元）"
              >
              </el-table-column>
              <el-table-column label="合计（元）" width="100">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    {{
                      scope.row.ac_supplies_num * scope.row.ac_supplies_price
                    }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <div class="separator" style="height: 10px"></div>

      <el-card class="box-card">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              流程清单<i class="header-icon el-icon-info another-icon"></i>
            </template>
            <el-timeline>
              <el-timeline-item
                v-for="item in processList"
                :key="item.ac_process_steps"
                :timestamp="item.ac_process_title"
              >
              </el-timeline-item>
            </el-timeline>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDetailByGuid } from "@/api/activity";
import { getLocal, getSession } from "@/utils/handleCache";

export default {
  data() {
    return {
      role: JSON.parse(getLocal("role")),
      percent: 0,
      detailInfo: {},
      activityInfo: {},
    };
  },

  components: {},

  computed: {
    suppliesList: function () {
      return this.detailInfo.ac_supplies;
    },

    processList: function(){
      return this.detailInfo.ac_process;
    }
  },

  created() {
    this.activityInfo = JSON.parse(JSON.parse(getSession("AcDetail")));
    if (this.activityInfo.ac_sign_up) {
      this.percent =
        Math.round(
          (this.activityInfo.ac_sign_up_ready / this.activityInfo.ac_sign_up) * 100
        );
    }
    this.getDetail(this.activityInfo);
  },

  methods: {
    getDetail(item) {
      getDetailByGuid({
        guid: item.activity_items_id,
        detailId: this.activityInfo.guid,
      }).then((res) => {
        this.detailInfo = res.data;
        console.log(this.detailInfo);
      });
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../styles/related/activity_info.less";
</style>
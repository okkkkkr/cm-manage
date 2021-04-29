<template>
  <!-- 活动工单详情 -->
  <div class="details-container">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>关键指标</span>
      </div>
      <el-row class="">
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">当前工单</li>
              <li class="choseItem">{{ this.processInfo.ac_order_name }}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">当前状态</li>
              <li class="choseItem">
                {{
                  this.processInfo.ac_order_state == "1" ? "审核中" : "已结束"
                }}
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card class="box-card">
      <el-timeline>
        <el-timeline-item
          timestamp="发起工单"
          icon="el-icon-more"
          type="primary"
          placement="top"
        >
          <el-card v-if="processInfo.detail[0]">
            <h4>创建并发起工单</h4>
            <p>受理方：{{ processInfo.ht_name }}</p>
            <p>发起日期：{{ processInfo.detail[0].order_submit_time }}</p>
            <p v-if="processInfo.detail[0].order_file">
              相关文件：{{ processInfo.detail[0].order_file }}
            </p>
            <p v-if="processInfo.detail[0].order_image">
              相关图片：{{ processInfo.detail[0].order_image }}
            </p>
            <p v-if="processInfo.detail[0].order_describe">
              工单描述：{{ processInfo.detail[0].order_describe }}
            </p>
            <p>
              <span class="key-words">{{
                processInfo.detail[0].order_handler_name
              }}</span>
              提交于
              <span class="key-words">{{
                processInfo.detail[0].order_submit_time
              }}</span>
            </p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item
          :timestamp="
            processInfo.detail[1] == null
              ? '待承办方一审'
              : processInfo.detail[1].order_state == 11
              ? '承办方一审通过，待提交相关文件'
              : processInfo.detail[1].order_state == '12'
              ? '承办方一审通过，相关文件已提交'
              : '承办方一审未通过'
          "
          :icon="
            processInfo.detail[1] == null
              ? ''
              : processInfo.detail[1].order_state == '11'
              ? 'el-icon-loading'
              : processInfo.detail[1].order_state == '12'
              ? 'el-icon-check'
              : 'el-icon-close'
          "
          :type="
            processInfo.detail[1] == null
              ? ''
              : processInfo.detail[1].order_state == 11
              ? 'warning'
              : processInfo.detail[1].order_state == '12'
              ? 'success'
              : 'danger'
          "
          placement="top"
        >
          <el-card v-if="processInfo.detail[1]">
            <h4>承办方一审</h4>
            <p>提交日期：{{ processInfo.detail[1].order_submit_time }}</p>
            <p v-if="processInfo.detail[1].order_file">
              相关文件：{{ processInfo.detail[1].order_file }}
            </p>
            <p v-if="processInfo.detail[1].order_image">
              相关图片：{{ processInfo.detail[1].order_image }}
            </p>
            <p v-if="processInfo.detail[1].order_describe">
              工单描述：{{ processInfo.detail[1].order_describe }}
            </p>
            <p>
              <span class="key-words">{{
                processInfo.detail[1].order_handler_name
              }}</span>
              提交于
              <span class="key-words">{{
                processInfo.detail[1].order_submit_time
              }}</span>
            </p>
          </el-card>
          <el-card
            v-if="
              processInfo.detail[0] && !processInfo.detail[1] && !uploadFlag && role == 'ht'
            "
          >
            <el-button type="success" @click="acceptTrial('first')" plain
              >接受</el-button
            >
            <el-button type="danger" plain>拒绝</el-button>
          </el-card>
          <el-card v-else-if =" role == 'ht'">
            <el-button type="primary" @click="uploadFiles()" plain
              >提交相关文件</el-button
            >
          </el-card>
        </el-timeline-item>
        <el-timeline-item
          :timestamp="
            processInfo.detail[2] == null
              ? '待社区方二审'
              : processInfo.detail[2].order_state == 21
              ? '社区方二审通过'
              : '社区方二审未通过'
          "
          :icon="
            processInfo.detail[2] == null
              ? ''
              : processInfo.detail[2].order_state == 21
              ? 'el-icon-check'
              : 'el-icon-close'
          "
          :type="
            processInfo.detail[2] == null
              ? ''
              : processInfo.detail[2].order_state == 21
              ? 'success'
              : 'danger'
          "
          placement="top"
        >
          <el-card v-if="processInfo.detail[2]">
            <h4>社区方二审</h4>
            <p>提交日期：{{ processInfo.detail[2].order_submit_time }}</p>
            <p v-if="processInfo.detail[2].order_file">
              相关文件：{{ processInfo.detail[2].order_file }}
            </p>
            <p v-if="processInfo.detail[2].order_image">
              相关图片：{{ processInfo.detail[2].order_image }}
            </p>
            <p v-if="processInfo.detail[2].order_describe">
              工单描述：{{ processInfo.detail[2].order_describe }}
            </p>
            <p>
              <span class="key-words">{{
                processInfo.detail[2].order_handler_name
              }}</span>
              提交于
              <span class="key-words">{{
                processInfo.detail[2].order_submit_time
              }}</span>
            </p>
          </el-card>
          <div  v-if="processInfo.detail[1] && !processInfo.detail[2] && role == 'cm'">
            <el-card v-if="processInfo.detail[1].order_describe == '12'">
              <el-button type="success" plain>接受</el-button>
              <el-button type="danger" plain>拒绝</el-button>
            </el-card>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="待承办方终审" placement="top">
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <div class="separator" style="height: 10px"></div>

    <div class="another-cont">
      <el-card class="box-card">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              活动相关信息<i class="header-icon el-icon-info another-icon"></i>
            </template>
            <el-row>
              <el-col :span="6">
                <span>投入资金：</span>
                <span style="font-weight: bold; color: #409eff">5000</span>
              </el-col>
              <el-col :span="6">
                <span>活动类型：</span>
                <span style="font-weight: bold; color: #409eff">公益活动</span>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </div>
</template>

<script>
import { addOrder, changeOrderState } from "@/api/order";
import { addInform } from "@/api/inform";
import { getLocal } from "@/utils/handleCache";
import { notice } from "@/utils/message";

export default {
  data() {
    return {
      processInfo: {},
      uploadFlag: false,
      role: JSON.parse(getLocal('role'))
    };
  },

  components: {},

  computed: {},

  created() {
    this.processInfo = this.$route.query.info;
    console.log(this.processInfo);
  },
  methods: {
    acceptTrial(type) {
      var date = new Date();
      if (type == "first") {
        this.uploadFlag = true;
      }
      addOrder({
        order_log_id: "",
        order_id: this.processInfo.ac_order_id,
        order_handler_id: JSON.parse(JSON.parse(getLocal("userInfo")))._id,
        order_handler_name: JSON.parse(JSON.parse(getLocal("userInfo")))
          .manager_name,
        order_file: "",
        order_image: "",
        order_describe: "一审通过，等待提交相关文件！",
        order_state: "11",
        order_submit_time:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes(),
      }).then((res) => {
        notice("success", res.message);
      });

      this.inform("一审通过，等待提交相关文件！");
    },

    inform(message) {
      addInform({
        handler_id: JSON.parse(JSON.parse(getLocal("userInfo")))._id,
        handler_name: JSON.parse(JSON.parse(getLocal("userInfo"))).manager_name,
        sender_id: this.processInfo.ac_order_ht_guid,
        receive_id: this.processInfo.ac_order_cm_guid,
        inform_type: "0",
        informContent: message,
      }).then((res) => {
        notice("success", res.message);
      });
    },

    uploadFiles() {},
  },
};
</script>
<style lang='less' scoped>
@import "../../styles/process/order_details.less";
</style>
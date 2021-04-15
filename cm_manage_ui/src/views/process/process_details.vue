<template>
  <!-- 活动详情 -->
  <div class="details-container">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>关键参数</span>
      </div>
      <el-row class="">
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">当前项目</li>
              <li class="choseItem">XXX项目</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">当前活动</li>
              <li class="choseItem">XXX活动</li>
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
          <el-card>
            <h4>创建并发起工单</h4>
            <p>受理方：{{ processInfo.ht_manager_name }}</p>
            <p>发起日期：{{ processInfo.order_start_time }}</p>
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
              : processInfo.detail[1].order_state == 11
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
        </el-timeline-item>
        <el-timeline-item
          timestamp="待承办方终审"
          placement="top"
        >
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      processInfo: {
        ac_order_id: "123",
        ac_order_name: "活动工单1",
        order_start_time: "2018/4/2 20:46",
        cm_residents_name: "发起人",
        ht_manager_name: "受理方",
        detail: [
          {
            order_state: "0",
            order_file: "",
            order_image: "",
            order_describe: "",
            order_submit_time: "2018/4/2 20:46",
            order_handler_name: "处理人",
          },
          {
            order_state: "12",
            order_file: "工单提交的文件",
            order_image: "工单提交的图片",
            order_describe: "工单提交的描述",
            order_submit_time: "2018/4/2 20:46",
            order_handler_name: "处理人",
          },
          {
            order_state: "21",
            order_file: "工单提交的文件",
            order_image: "工单提交的图片",
            order_describe: "工单提交的描述",
            order_submit_time: "2018/4/2 20:46",
            order_handler_name: "处理人",
          },
        ],
      },
    };
  },

  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang='less' scoped>
  @import '../../styles/process/process_details.less';
</style>
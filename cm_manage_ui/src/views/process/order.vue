<template>
  <div class="order-container">
    <div class="order-info">
      <span class="order-status">执行中</span>
      <span class="order-nums">12</span>
      <div class="order-item" style="margin-left: 50px;">
        合作承办方: <span class="item-name" style="color: #409eff">全部</span>
      </div>
      <div class="order-item">
        当前项目: <span class="item-name" style="color: #409eff">全部</span>
      </div>
    </div>
    <div class="ongoing">
      <el-card
        style="margin-top: 5px"
        class="box-card"
        v-for="item in ongoingList"
        :key="item.ac_order_id"
      >
        <el-collapse @change="handleChange">
          <el-collapse-item :title="item.ac_order_name">
            <div class="block">
              <el-timeline>
                <el-timeline-item
                  timestamp="发起工单"
                  icon="el-icon-more"
                  type="primary"
                  placement="top"
                >
                  <el-card>
                    <h4>创建并发起工单</h4>
                    <p>受理方：{{ item.ht_manager_name }}</p>
                    <p>发起日期：{{ item.order_start_time }}</p>
                    <p v-if="item.detail[0].order_file">
                      相关文件：{{ item.detail[0].order_file }}
                    </p>
                    <p v-if="item.detail[0].order_image">
                      相关图片：{{ item.detail[0].order_image }}
                    </p>
                    <p v-if="item.detail[0].order_describe">
                      工单描述：{{ item.detail[0].order_describe }}
                    </p>
                    <p>
                      <span class="key-words">{{
                        item.detail[0].order_handler_name
                      }}</span>
                      提交于
                      <span class="key-words">{{
                        item.detail[0].order_submit_time
                      }}</span>
                    </p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item
                  :timestamp="
                    item.detail[1] == null
                      ? '待承办方一审'
                      : item.detail[1].order_state == 11
                      ? '承办方一审通过，待提交相关文件'
                      : item.detail[1].order_state == '12'
                      ? '承办方一审通过，相关文件已提交'
                      : '承办方一审未通过'
                  "
                  :icon="
                    item.detail[1] == null
                      ? ''
                      : item.detail[1].order_state == 11
                      ? 'el-icon-loading'
                      : item.detail[1].order_state == '12'
                      ? 'el-icon-check'
                      : 'el-icon-close'
                  "
                  :type="
                    item.detail[1] == null
                      ? ''
                      : item.detail[1].order_state == 11
                      ? 'warning'
                      : item.detail[1].order_state == '12'
                      ? 'success'
                      : 'danger'
                  "
                  placement="top"
                >
                  <el-card v-if="item.detail[1]">
                    <h4>承办方一审</h4>
                    <p>提交日期：{{ item.detail[1].order_submit_time }}</p>
                    <p v-if="item.detail[1].order_file">
                      相关文件：{{ item.detail[1].order_file }}
                    </p>
                    <p v-if="item.detail[1].order_image">
                      相关图片：{{ item.detail[1].order_image }}
                    </p>
                    <p v-if="item.detail[1].order_describe">
                      工单描述：{{ item.detail[1].order_describe }}
                    </p>
                    <p>
                      <span class="key-words">{{
                        item.detail[1].order_handler_name
                      }}</span>
                      提交于
                      <span class="key-words">{{
                        item.detail[1].order_submit_time
                      }}</span>
                    </p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item
                  :timestamp="
                    item.detail[2] == null
                      ? '待社区方二审'
                      : item.detail[2].order_state == 21
                      ? '社区方二审通过'
                      : '社区方二审未通过'
                  "
                  :icon="
                    item.detail[2] == null
                      ? ''
                      : item.detail[2].order_state == 21
                      ? 'el-icon-check'
                      : 'el-icon-close'
                  "
                  :type="
                    item.detail[2] == null
                      ? ''
                      : item.detail[2].order_state == 21
                      ? 'success'
                      : 'danger'
                  "
                  placement="top"
                >
                  <el-card v-if="item.detail[2]">
                    <h4>社区方二审</h4>
                    <p>提交日期：{{ item.detail[2].order_submit_time }}</p>
                    <p v-if="item.detail[2].order_file">
                      相关文件：{{ item.detail[2].order_file }}
                    </p>
                    <p v-if="item.detail[2].order_image">
                      相关图片：{{ item.detail[2].order_image }}
                    </p>
                    <p v-if="item.detail[2].order_describe">
                      工单描述：{{ item.detail[2].order_describe }}
                    </p>
                    <p>
                      <span class="key-words">{{
                        item.detail[2].order_handler_name
                      }}</span>
                      提交于
                      <span class="key-words">{{
                        item.detail[2].order_submit_time
                      }}</span>
                    </p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="待承办方终审" placement="top">
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>

    <div class="separator" style="height: 40px"></div>

    <div class="order-info">
      <span class="order-status">已结束</span>
      <span class="order-nums">12</span>
      <div class="order-item">
        合作承办方: <span class="item-name" style="color: #409eff">全部</span>
      </div>
      <div class="order-item" style="margin-right: 50px">
        当前项目: <span class="item-name" style="color: #409eff">全部</span>
      </div>
      <div class="order-item" style="margin-right: 50px">
        工单状态:
        <el-dropdown @command="handleCommand" trigger="click">
          <span
            class="item-name el-dropdown-link"
            :style="{
              color:
                orderState == '接受'
                  ? '#67C23A'
                  : orderState == '拒绝'
                  ? '#F56C6C'
                  : '#409EFF',
            }"
          >
            {{ orderState }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="接受">接受</el-dropdown-item>
            <el-dropdown-item command="拒绝">拒绝</el-dropdown-item>
            <el-dropdown-item command="全部">全部</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="finished">
      <el-card
        class="box-card"
        style="margin-top: 10px"
        v-for="item in finishedList"
        :key="item.ac_order_id"
      >
        <el-collapse @change="handleChange">
          <el-collapse-item :title="item.ac_order_name">
            <div class="block">
              <el-timeline>
                <el-timeline-item
                  timestamp="发起工单"
                  icon="el-icon-more"
                  type="primary"
                  placement="top"
                >
                  <el-card>
                    <h4>创建并发起工单</h4>
                    <p>受理方：{{ item.ht_manager_name }}</p>
                    <p>发起日期：{{ item.order_start_time }}</p>
                    <p v-if="item.detail[0].order_file">
                      相关文件：{{ item.detail[0].order_file }}
                    </p>
                    <p v-if="item.detail[0].order_image">
                      相关图片：{{ item.detail[0].order_image }}
                    </p>
                    <p v-if="item.detail[0].order_describe">
                      工单描述：{{ item.detail[0].order_describe }}
                    </p>
                    <p>
                      <span class="key-words">{{
                        item.detail[0].order_handler_name
                      }}</span>
                      提交于
                      <span class="key-words">{{
                        item.detail[0].order_submit_time
                      }}</span>
                    </p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item
                  :timestamp="
                    item.detail[1] == null
                      ? '待承办方一审'
                      : item.detail[1].order_state == 11
                      ? '承办方一审通过，待提交相关文件'
                      : item.detail[1].order_state == '12'
                      ? '承办方一审通过，相关文件已提交'
                      : '承办方一审未通过'
                  "
                  :icon="
                    item.detail[1] == null
                      ? ''
                      : item.detail[1].order_state == 11
                      ? 'el-icon-loading'
                      : item.detail[1].order_state == '12'
                      ? 'el-icon-check'
                      : 'el-icon-close'
                  "
                  :type="
                    item.detail[1] == null
                      ? ''
                      : item.detail[1].order_state == 11
                      ? 'warning'
                      : item.detail[1].order_state == '12'
                      ? 'success'
                      : 'danger'
                  "
                  placement="top"
                >
                  <el-card>
                    <h4>承办方一审</h4>
                    <p>提交日期：{{ item.detail[1].order_submit_time }}</p>
                    <p v-if="item.detail[1].order_file">
                      相关文件：{{ item.detail[1].order_file }}
                    </p>
                    <p v-if="item.detail[1].order_image">
                      相关图片：{{ item.detail[1].order_image }}
                    </p>
                    <p v-if="item.detail[1].order_describe">
                      工单描述：{{ item.detail[1].order_describe }}
                    </p>
                    <p>
                      <span class="key-words">{{
                        item.detail[1].order_handler_name
                      }}</span>
                      提交于
                      <span class="key-words">{{
                        item.detail[1].order_submit_time
                      }}</span>
                    </p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item
                  :timestamp="
                    item.detail[2] == null
                      ? '待社区方二审'
                      : item.detail[2].order_state == 21
                      ? '社区方二审通过'
                      : '社区方二审未通过'
                  "
                  :icon="
                    item.detail[2] == null
                      ? ''
                      : item.detail[2].order_state == 21
                      ? 'el-icon-check'
                      : 'el-icon-close'
                  "
                  :type="
                    item.detail[2] == null
                      ? ''
                      : item.detail[2].order_state == 21
                      ? 'success'
                      : 'danger'
                  "
                  placement="top"
                >
                  <el-card>
                    <h4>社区方二审</h4>
                    <p>提交日期：{{ item.detail[2].order_submit_time }}</p>
                    <p v-if="item.detail[2].order_file">
                      相关文件：{{ item.detail[2].order_file }}
                    </p>
                    <p v-if="item.detail[2].order_image">
                      相关图片：{{ item.detail[2].order_image }}
                    </p>
                    <p v-if="item.detail[2].order_describe">
                      工单描述：{{ item.detail[2].order_describe }}
                    </p>
                    <p>
                      <span class="key-words">{{
                        item.detail[2].order_handler_name
                      }}</span>
                      提交于
                      <span class="key-words">{{
                        item.detail[2].order_submit_time
                      }}</span>
                    </p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item
                  :timestamp="
                    item.detail[3] == null
                      ? '待承办方终审'
                      : item.detail[3].order_state == 31
                      ? '承办方终审通过'
                      : '承办方终审未通过'
                  "
                  :icon="
                    item.detail[3] == null
                      ? ''
                      : item.detail[3].order_state == 31
                      ? 'el-icon-check'
                      : 'el-icon-close'
                  "
                  :type="
                    item.detail[3] == null
                      ? ''
                      : item.detail[3].order_state == 31
                      ? 'success'
                      : 'danger'
                  "
                  placement="top"
                >
                  <el-card>
                    <h4>承办方终审</h4>
                    <p>提交日期：{{ item.detail[3].order_submit_time }}</p>
                    <p v-if="item.detail[3].order_file">
                      相关文件：{{ item.detail[3].order_file }}
                    </p>
                    <p v-if="item.detail[3].order_image">
                      相关图片：{{ item.detail[3].order_image }}
                    </p>
                    <p v-if="item.detail[3].order_describe">
                      工单描述：{{ item.detail[3].order_describe }}
                    </p>
                    <p>
                      <span class="key-words">{{
                        item.detail[2].order_handler_name
                      }}</span>
                      提交于
                      <span class="key-words">{{
                        item.detail[3].order_submit_time
                      }}</span>
                    </p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item
                  :timestamp="
                    item.detail[3] == null
                      ? '工单结束'
                      : item.detail[3].order_state == 31
                      ? '工单结束，活动项目已建立'
                      : '工单结束'
                  "
                  :icon="
                    item.detail[3] == null
                      ? ''
                      : item.detail[3].order_state == 31
                      ? 'el-icon-more'
                      : ''
                  "
                  :type="
                    item.detail[3] == null
                      ? ''
                      : item.detail[3].order_state == 31
                      ? 'primary'
                      : ''
                  "
                  placement="top"
                >
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Warehouse",
  data() {
    return {
      orderState: "全部",
      ongoingList: [
        {
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
          ],
        },
        {
          ac_order_id: "1234",
          ac_order_name: "活动工单2",
          detail: [
            {
              order_state: "0",
              order_file: "工单提交的文件",
              order_image: "工单提交的图片",
              order_describe: "工单提交的描述",
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
        {
          ac_order_id: "1235",
          ac_order_name: "活动工单3",
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
              order_state: "11",
              order_file: "",
              order_image: "",
              order_describe: "",
              order_submit_time: "2018/4/2 20:46",
              order_handler_name: "处理人",
            },
          ],
        },
      ],
      finishedList: [
        {
          ac_order_id: "12345",
          ac_order_name: "活动工单8",
          detail: [
            {
              order_state: "0",
              order_file: "工单提交的文件",
              order_image: "工单提交的图片",
              order_describe: "工单提交的描述",
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
            {
              order_state: "31",
              order_file: "工单提交的文件",
              order_image: "工单提交的图片",
              order_describe: "工单提交的描述",
              order_submit_time: "2018/4/2 20:46",
              order_handler_name: "处理人",
            },
          ],
        },
      ],
    };
  },

  components: {},

  computed: {},

  methods: {
    handleChange(val) {
      console.log(val);
    },

    handleCommand(command) {
      this.orderState = command;
    },
  },
};
</script>
<style lang='less' scoped>
  @import '../../styles/process/order.less';
</style>
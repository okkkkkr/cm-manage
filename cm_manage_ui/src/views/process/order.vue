<template>
  <div class="order-container">
    <div class="order-info">
      <span class="order-status">执行中</span>
      <span class="order-nums">{{ ongoingList.length }}</span>
      <div class="order-item" style="margin-left: 50px">
        <el-select
          style="width: 100%"
          v-model="filterOnGuid"
          filterable
          placeholder="请选择承办方"
          @change="filterOngoing"
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
    </div>
    <div class="ongoing" v-if="ongoingList.length != 0">
      <el-card
        style="margin-top: 5px"
        class="box-card"
        v-for="(item, index) in ongoingList"
        :key="item.ac_order_id"
      >
        <el-collapse @change="handleChange">
          <el-collapse-item :title="item.ac_order_name">
            <div class="block">
              <el-timeline>
                <el-timeline-item
                  timestamp="发起委托"
                  icon="el-icon-more"
                  type="primary"
                  placement="top"
                >
                  <el-card>
                    <h4>发起项目委托</h4>
                    <p>受理方：{{ item.ht_name }}</p>
                    <p>发起日期：{{ item.detail[0].order_submit_time }}</p>
                    <p v-if="item.detail[0].order_file"></p>
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
                    <p v-if="item.detail[1].order_file"></p>
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
                    <p v-if="item.detail[2].order_file"></p>
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
              </el-timeline>
            </div>
            <div style="width: 100%; text-align: right">
              <el-button @click="viewDetails('T', index)" type="primary" plain
                >查看详情</el-button
              >
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>

    <div class="separator" style="height: 40px"></div>

    <div class="order-info clearfix">
      <span class="order-status">已结束</span>
      <span class="order-nums">{{ finishedList.length }}</span>
      <div class="order-item">
        <el-select
          style="width: 100%"
          v-model="filterOffGuid"
          filterable
          placeholder="请选择承办方"
          @change="filterFinish"
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

    <div class="finished" v-if="finishedList.length != 0">
      <el-card
        class="box-card"
        style="margin-top: 10px"
        v-for="(item, index) in finishedList"
        :key="item.ac_order_id"
      >
        <el-collapse @change="handleChange">
          <el-collapse-item :title="item.ac_order_name">
            <div class="block">
              <el-timeline>
                <el-timeline-item
                  timestamp="发起委托"
                  icon="el-icon-more"
                  type="primary"
                  placement="top"
                >
                  <el-card>
                    <h4>发起项目委托</h4>
                    <p>受理方：{{ item.ht_name }}</p>
                    <p>发起日期：{{ item.detail[0].order_submit_time }}</p>
                    <p v-if="item.detail[0].order_file"></p>
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
                      : item.detail[1].order_state == '11'
                      ? '承办方一审通过，待提交相关文件'
                      : item.detail[1].order_state == '12'
                      ? '承办方一审通过，相关文件已提交'
                      : '承办方一审未通过'
                  "
                  :icon="
                    item.detail[1] == null
                      ? ''
                      : item.detail[1].order_state == '11'
                      ? 'el-icon-loading'
                      : item.detail[1].order_state == '12'
                      ? 'el-icon-check'
                      : 'el-icon-close'
                  "
                  :type="
                    item.detail[1] == null
                      ? ''
                      : item.detail[1].order_state == '11'
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
                    <p v-if="item.detail[1].order_file"></p>
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
                    <p v-if="item.detail[2].order_file"></p>
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
                    item.detail[2] == null
                      ? '工单结束'
                      : item.detail[2].order_state == 21
                      ? '工单结束，活动项目已成立'
                      : '工单结束'
                  "
                  :icon="
                    item.detail[2] == null
                      ? ''
                      : item.detail[2].order_state == 21
                      ? 'el-icon-more'
                      : ''
                  "
                  :type="
                    item.detail[2] == null
                      ? ''
                      : item.detail[2].order_state == 21
                      ? 'primary'
                      : ''
                  "
                  placement="top"
                >
                </el-timeline-item>
              </el-timeline>
            </div>
            <div style="width: 100%; text-align: right">
              <el-button @click="viewDetails('F', index)" type="primary" plain
                >查看详情</el-button
              >
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getTOrderList, getFOrderList } from "@/api/order";
import { getLocal } from "@/utils/handleCache";
import { getHostList } from "@/api/user";
import { notice } from "@/utils/message";

export default {
  data() {
    return {
      orderState: "全部",
      ongoList: [],
      finList: [],
      allOngoing: [],
      allFinish: [],
      htList: [],
      filterOnGuid: "",
      filterOffGuid: "",
      filterState: "",
    };
  },

  computed: {
    ongoingList: function () {
      return this.ongoList;
    },

    finishedList: function () {
      return this.finList;
    },
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },

    handleCommand(command) {
      let list = [];
      let state = command == "接受" ? "2" : command == "拒绝" ? "0" : "1";
      if (state != '1') {
        this.allFinish.forEach((item, index) => {
          console.log(state)
          if (item.ac_order_state == state) {
            list.push(item);
          }
          if (index == this.allFinish.length - 1) {
            this.finList = list;
          }
        });
      }else{
        this.finList = this.allFinish;
      }

      this.orderState = command;
    },

    filterOngoing(value) {
      let list = [];
      this.allOngoing.forEach((item, index) => {
        if (item.ac_order_ht_guid == value) {
          list.push(item);
        }
        if (index == this.allOngoing.length - 1) {
          this.finList = list;
          console.log(this.ongoList);
        }
      });
    },

    filterFinish(value) {
      let list = [];
      this.allFinish.forEach((item, index) => {
        if (item.ac_order_ht_guid == value) {
          list.push(item);
        }
        if (index == this.allFinish.length - 1) {
          this.finList = list;
          console.log(this.finList);
        }
      });
    },

    viewDetails(type, index) {
      if (type == "T") {
        this.$router.push({
          path: "/order/details",
          query: { info: this.ongoingList[index] },
        });
      } else {
        this.$router.push({
          path: "/order/details",
          query: { info: this.finishedList[index] },
        });
      }
    },

    getList() {
      getTOrderList({
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
        role: JSON.parse(getLocal("role")),
      }).then((res) => {
        this.ongoList = res.data;
        this.allOngoing = res.data;
      });

      getFOrderList({
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
        role: JSON.parse(getLocal("role")),
      }).then((res) => {
        this.finList = res.data;
        this.allFinish = res.data;
        console.log(this.finList);
      });
    },
  },

  mounted() {
    this.getList();
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
};
</script>
<style lang='less' scoped>
@import "../../styles/process/order.less";
</style>
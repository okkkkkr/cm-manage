<template>
  <div class="activity-container">
    <el-card class="box-card">
      <p>
        <i
          class="el-icon-s-operation"
          style="font-size: 20px; color: #409eff"
        ></i>
        <span class="activity-title">活动申办工单记录</span>
      </p>
      <el-row :gutter="50">
        <el-col :span="4">
          <el-input
            placeholder="个体名称检索"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            placeholder="所在地址检索"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 20px"></div>

    <div class="another-cont">
      <el-card
        class="box-card"
        v-for="item in finishedList"
        :key="item.ac_order_id"
      >
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-s-home another-icon"></i
              ><span class="unit-info">唐家社区</span>

              <i class="el-icon-link combine"></i>

              <i class="el-icon-s-home another-icon"></i
              ><span class="unit-info">北京理工大学珠海学院</span>

              <i
                style="margin-left: 80px"
                class="el-icon-s-flag another-icon"
              ></i
              ><span class="unit-info">暖冬计划</span>
            </template>
            <div class="order-details">
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
            </div>
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
      currentPage: 1,
      tableData: [],
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
  @import '../../../styles/admin/order_info.less';
</style>
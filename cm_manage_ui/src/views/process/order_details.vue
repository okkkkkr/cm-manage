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
              <li class="choseItem">{{ processInfo.ac_order_name }}</li>
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

    <div class="separator" style="height: 20px"></div>

    <div class="another-cont">
      <el-card class="box-card">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              项目相关信息<i class="header-icon el-icon-info another-icon"></i>
            </template>
            <el-row>
              <el-col :span="6">
                <span>项目资金：</span>
                <span style="font-weight: bold; color: #409eff">{{
                  itemInfo.ac_items_money
                }}</span>
              </el-col>
              <el-col :span="18">
                <span>项目周期：</span>
                <span style="font-weight: bold; color: #409eff">{{
                  itemInfo.ac_items_bid_time
                }}</span>
                <span> 至 </span>
                <span style="font-weight: bold; color: #409eff">{{
                  itemInfo.ac_items_end_time
                }}</span>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <el-card
        v-if="fileList.length != 0"
        class="box-card"
        style="margin-top: 20px"
      >
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              活动相关文件<i class="header-icon el-icon-info another-icon"></i>
            </template>
            <div
              v-for="file in fileList"
              :key="file.url"
              style="height: 30px; display: flex; aligen-content: center"
            >
              <img
                v-if="file.name.split('.')[1] == 'pdf'"
                style="width: 20px; height: 20px"
                src="../../assets/images/files/pdf.png"
              />
              <img
                v-else
                style="width: 20px; height: 20px"
                src="../../assets/images/files/word.png"
              />
              <a :href="file.url" style="font-size: 14px; margin-left: 5px">{{
                file.name
              }}</a>
            </div>
            <div style="margin-top: 20px; color: #409eff">
              点击对应文件可下载查看
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>

    <div class="separator" style="height: 20px"></div>

    <el-card class="box-card">
      <el-timeline>
        <el-timeline-item
          timestamp="发起项目委托"
          icon="el-icon-more"
          type="primary"
          placement="top"
        >
          <el-card v-if="processInfo.detail[0]">
            <h4>发起项目委托</h4>
            <p>委托方：{{ processInfo.cm_name }}</p>
            <p>受理方：{{ processInfo.ht_name }}</p>
            <p>发起日期：{{ processInfo.detail[0].order_submit_time }}</p>
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

          <div v-if="processInfo.detail[0] && !processInfo.detail[1]">
            <el-card v-if="!uploadFlag && role == 'ht'">
              <el-button
                type="success"
                @click="
                  acceptTrial('first', '一审通过，等待提交相关文件！', '11')
                "
                plain
                >接受</el-button
              >
              <el-button
                type="danger"
                plain
                @click="reject('first', '承办方一审未通过，活动已拒绝', '10')"
                >拒绝</el-button
              >
            </el-card>
          </div>

          <el-card
            v-else-if="
              processInfo.detail[1].order_state == '11' && role == 'ht'
            "
          >
            <el-upload
              class="upload-demo"
              :action="baseAction + '/api/upload/files'"
              :on-success="successUpload"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :file-list="fileList"
              :data="attached"
              :limit="3"
            >
              <el-button size="middle" type="primary" plain
                >提交相关文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                注意：文件数量不可超过三个，文件类型仅支持 .doc .docx .pdf
              </div>
            </el-upload>
            <el-button
              v-if="reviewFlag || (fileList.length != 0 && role == 'ht')"
              style="margin-top: 20px"
              size="middle"
              type="success"
              @click="review()"
              plain
              >确认送审</el-button
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
          <div
            v-if="
              processInfo.detail[1] && !processInfo.detail[2] && role == 'cm'
            "
          >
            <el-card
              v-if="processInfo.detail[1].order_state == '12' && acceptFlag"
            >
              <el-button
                type="success"
                @click="
                  acceptTrial('second', '二审已通过，待承办方终审！', '21')
                "
                plain
                >接受</el-button
              >
              <el-button
                type="danger"
                plain
                @click="
                  reject('second', '社区方二审未通过，活动已拒绝！', '20')
                "
                >拒绝</el-button
              >
            </el-card>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
import { addOrder, changeOrderState, updateOrder } from "@/api/order";
import {
  updateActivity,
  updateDetailState,
  getItemByGuid,
  updateItemState,
} from "@/api/activity";
import { delFiles } from "@/api/files";
import { addInform } from "@/api/inform";
import { getLocal } from "@/utils/handleCache";
import { notice } from "@/utils/message";
import { mapGetters } from "vuex";
import Regular from "@/utils/regular.js";

export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      let regular = new Regular();
      if (value == "") {
        callback(new Error("please fill in the contact information"));
      } else if (!regular.mobile(value)) {
        console.log(regular.mobile(value));
        console.log(regular.fixedPhone(value));
        if (!regular.fixedPhone(value)) {
          callback(new Error("Please fill in the currect contact information"));
        }
      } else {
        callback();
      }
    };
    return {
      processInfo: {},
      itemInfo: {},
      uploadFlag: false,
      acceptFlag: true,
      reviewFlag: false,
      role: JSON.parse(getLocal("role")),
      fileList: [],
      detailForm: {
        duty: "",
        phone: "",
      },
      attached: {
        _id: JSON.parse(JSON.parse(getLocal("unitInfo"))).ht_account,
        order_log_id: "",
      },
      rules: {
        duty: [{ required: true, trigger: "blur" }],
        phone: [{ validator: validatePhone, required: true, trigger: "blur" }],
      },
    };
  },

  components: {},

  computed: {
    ...mapGetters(["baseAction"]),
  },

  created() {
    this.processInfo = this.$route.query.info;
    console.log("this.processInfo", this.processInfo);
    if (this.processInfo.detail[1]) {
      this.attached.order_log_id = this.processInfo.detail[1].order_log_id;
      if (this.processInfo.detail[1].order_file) {
        let files = JSON.parse(this.processInfo.detail[1].order_file);
        files.forEach((item) => {
          let num = item.split("/").length;
          let fileName = item.split("/")[num - 1];
          this.fileList.push({ name: fileName, url: item });
        });
      }
    }

    getItemByGuid({
      guid: this.processInfo.ac_guid,
    }).then((res) => {
      this.itemInfo = res.data;
      console.log("res", res);
    });
  },
  methods: {
    acceptTrial(type, message, state) {
      if (type == "first") {
        this.uploadFlag = true;
      } else {
        this.acceptFlag = false;
        this.updateOrderState("2");
        this.updateItemsState("2");
      }
      this.inform(message);
      this.createOrder(message, state);
    },

    reject(type, message, state) {
      if (type == "first") {
        this.uploadFlag = true;
      } else {
        this.acceptFlag = false;
      }
      this.inform(message);
      this.createOrder(message, state);

      // updateDetailState({
      //   guid: this.processInfo.ac_guid,
      //   state: "2",
      // }).then((res) => {
      //   notice("warning", "该活动已停止！");
      // });

      this.updateOrderState("0");
      this.updateItemsState("0");
    },

    updateOrderState(state) {
      updateOrder({
        _id: this.processInfo.ac_order_id,
        state: state,
      }).then((res) => {
        notice("warning", res.message);
      });
    },

    updateItemsState(state) {
      updateItemState({
        guid: this.processInfo.ac_guid,
        state: state,
      }).then((res) => {
        notice("warning", res.message);
      });
    },

    createOrder(message, state) {
      var date = new Date();
      addOrder({
        order_log_id: "",
        order_id: this.processInfo.ac_order_id,
        order_handler_id: JSON.parse(JSON.parse(getLocal("userInfo")))._id,
        order_handler_name: JSON.parse(JSON.parse(getLocal("userInfo")))
          .manager_name,
        order_file: "",
        order_image: "",
        order_describe: message,
        order_state: state,
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
    },

    inform(message) {
      var paramData = {
        handler_id: JSON.parse(JSON.parse(getLocal("userInfo")))._id,
        handler_name: JSON.parse(JSON.parse(getLocal("userInfo"))).manager_name,
        sender_id: "",
        receive_id: "",
        inform_type: "0",
        informContent: message,
      };
      if (JSON.parse(getLocal("role")) == "ht") {
        (paramData.sender_id = this.processInfo.ac_order_ht_guid),
          (paramData.receive_id = this.processInfo.ac_order_cm_guid);
      } else {
        (paramData.sender_id = this.processInfo.ac_order_cm_guid),
          (paramData.receive_id = this.processInfo.ac_order_ht_guid);
      }

      addInform(paramData).then((res) => {
        notice("success", res.message);
        var _self = this;
        setTimeout(() => {
          _self.$router.go(-1);
        }, 0);
      });
    },

    successUpload() {
      this.reviewFlag = true;
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleRemove(file, fileList) {
      delFiles({
        fileName: file.name,
        _id: this.attached._id,
        order_log_id: this.attached.order_log_id,
      })
        .then((res) => {
          notice("success", res.message);
          if (fileList.length == 0) {
            this.reviewFlag = false;
          }
        })
        .catch((err) => {
          notice("error", "服务器错误！ ");
        });
    },

    // 文件送审
    review() {
      var date = new Date();
      var param = {
        order_log_id: this.processInfo.detail[1].order_log_id,
        state: "12",
        order_describe: "一审通过，相关文件已提交！",
        order_handler_name: JSON.parse(JSON.parse(getLocal("userInfo")))
          .manager_name,
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
      };

      changeOrderState(param).then((res) => {
        notice("success", "文件已提交，已通知社区方进行二审！");
        this.inform("文件已提交，请尽快审查！");
        this.processInfo.detail[1].order_state = param.state;
        this.processInfo.detail[1].order_handler_name =
          param.order_handler_name;
        this.processInfo.detail[1].order_submit_time = param.order_submit_time;
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateActivity([
            this.processInfo.ac_guid,
            {
              ac_cm_contact:
                this.detailForm.duty + " - " + this.detailForm.phone,
            },
          ]).then((res) => {
            this.createOrder("二审已通过", "21");
            this.inform("二审通过，项目权限已开启！");
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
@import "../../styles/process/order_details.less";
</style>
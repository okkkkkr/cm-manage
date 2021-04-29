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
            >发起活动</el-button
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
                  <el-form-item label="依托项目" prop="item_guid">
                    <el-select
                      style="width: 100%"
                      v-model="orderInfo.item_guid"
                      filterable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in itemList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="活动名称" prop="activity_name">
                    <el-input v-model="orderInfo.activity_name"></el-input>
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
                  <el-form-item label="投入资金（元）" prop="ac_fund">
                    <el-input v-model="orderInfo.ac_fund"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="活动类别" prop="ac_type">
                    <el-select
                      style="width: 100%"
                      v-model="orderInfo.ac_type"
                      filterable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in acType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
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
      <el-row class="">
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">活动总数</li>
              <li style="font-size: 24px; font-weight: bold">{{ itemNum }}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">当前项目</li>
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
    <div class="host-wrapper">
      <div class="host-member" v-for="item in activityList" :key="item.guid">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ item.ac_name }}</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >查看详情</el-button
            >
          </div>
          <el-row>
            <el-col :span="3">
              <div class="host-detail">
                <div class="text item">
                  <div class="demo-image">
                    <div class="block">
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="item.ac_image"
                        fit="fill"
                      ></el-image>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="21">
              <div class="host-detail">活动介绍</div>
            </el-col>
          </el-row>
        </el-card>
        <div class="separator" style="height: 30px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getValidActivityByGuid, getTypeList } from "@/api/related";
import { getHostList } from "@/api/user";
import { addActivity } from "@/api/activity";
import { getLocal } from "@/utils/handleCache";
import { notice } from "@/utils/message";

export default {
  name: "Fund",
  data() {
    return {
      dialogFormVisible: false,
      itemName: "全部",
      itemNum: "",
      htName: "",
      activityList: [
        {
          guid: "活动guid",
          ac_name: "活动名称",
          ac_address: "活动地址/地点",
          ac_begin_time: "活动开始时间",
          ac_end_time: "活动结束时间",
          ac_introduce: "介绍内容",
          ac_sign_up: "活动报名名额",
          ac_sign_up_ready: "活动已报名",
          ac_ht_contact: "活动负责人（承办方）",
          ac_cm_contact: "活动负责人（社区方）",
          ac_image:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=302487973,3701014649&fm=26&gp=0.jpg",
        },
      ],
      rules: {
        cm_guid: [{ required: true, trigger: "blur" }],
        ht_guid: [{ required: true, trigger: "blur" }],
        ac_type: [{ required: true, trigger: "blur" }],
        ac_fund: [{ required: true, trigger: "blur" }],
        activity_name: [{ required: true, trigger: "blur" }],
        handler_id: [{ required: true, trigger: "blur" }],
      },
      orderInfo: {
        cm_guid: "",
        item_guid: "",
        ht_guid: "",
        ac_type: "",
        ac_fund: "",
        activity_name: "",
        handler_id: "",
        handler_name: "",
      },
      acType: [],
      itemList: [],
      htList: [],
    };
  },
  created() {
    this.itemName = this.$route.query.ac_items_name || "全部";
    this.itemNum = this.$route.query.total || "暂无";
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
    handleCommand(command) {
      this.publishState = command;
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
              this.acType.push({ label: item.type_name, value: item.typeId });
            });
          })
          .catch((err) => {
            notice("error", "服务器出错！");
          });
      }
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
          ).cm_manager_name;
          addActivity(this.orderInfo)
            .then((res) => {
              if (res.code == 200) {
                notice("success", res.message);
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
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/related/publish_info.less";
</style>


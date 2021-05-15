<template>
  <!-- 活动详情 -->
  <div class="details-container">
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

      <p style="margin-top: 30px">
        <i class="el-icon-picture-outline"></i>
        图片简介
      </p>
      <el-row>
        <el-col
          v-for="url in JSON.parse(activityInfo.ac_image)"
          :key="url"
          :span="6"
          style="text-align: left;"
        >
          <img style="height: 200px;" :src="url" />
        </el-col>
      </el-row>

      <el-row class="signUp" v-if="activityInfo.ac_publish == '1'">
        <el-col :span="2"> <i class="el-icon-data-line"></i> 报名进度 </el-col>
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
        <el-col :span="2" style="text-align: center">
          <span class="ac-content">{{ activityInfo.ac_sign_up_ready }}</span>
          <span class="ac-content"> / </span>
          <span class="ac-content">{{ activityInfo.ac_sign_up }}</span>
        </el-col>
        <el-col :span="2">
          <el-button
            @click="signup()"
            :type="
              activityInfo.ac_sign_up_ready == activityInfo.ac_sign_up
                ? 'info'
                : 'success'
            "
            round
            >我要报名</el-button
          >
          <el-dialog
            title="活动报名表"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form
              :model="orderInfo"
              status-icon
              ref="orderInfo"
              :rules="rules"
              label-width="100px"
              class="demo-orderInfo"
              label-position="top"
            >
              <div>
                <el-form-item label="姓名" prop="ac_participate_name">
                  <el-input v-model="orderInfo.ac_participate_name"></el-input>
                </el-form-item>

                <el-form-item label="年龄" prop="ac_participate_age">
                  <el-input v-model="orderInfo.ac_participate_age"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="ac_participate_sex">
                  <el-select
                    style="width: 100%"
                    v-model="orderInfo.ac_participate_sex"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in sex"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="联系电话" prop="ac_participate_phone">
                  <el-input v-model="orderInfo.ac_participate_phone"></el-input>
                </el-form-item>
                <el-form-item
                  label="是否本社区居民"
                  prop="ac_participate_address"
                >
                  <el-select
                    style="width: 100%"
                    v-model="orderInfo.ac_participate_address"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in community"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item style="text-align: center; margin-top: 20px">
                <el-button type="primary" @click="submitForm('orderInfo')"
                  >提交</el-button
                >
                <el-button @click="resetForm('orderInfo')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Regular from "@/utils/regular.js";
import { testSignUp } from "@/api/test";
import { notice } from "@/utils/message";
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
      percent: 0,
      dialogVisible: false,
      detailInfo: {},
      activityInfo: {},
      orderInfo: {
        ac_participate_id: "",
        ac_participate_name: "",
        ac_participate_age: "",
        ac_participate_sex: "",
        ac_participate_phone: "",
        ac_participate_address: "",
        ac_participate_times: "",
        ac_guid: "",
      },
      rules: {
        ac_participate_name: [{ required: true, trigger: "blur" }],
        ac_participate_age: [{ required: true, trigger: "blur" }],
        ac_participate_sex: [{ required: true, trigger: "blur" }],
        ac_participate_phone: [
          { validator: validatePhone, required: true, trigger: "blur" },
        ],
        ac_participate_address: [{ required: true, trigger: "blur" }],
      },
      sex: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "0",
          label: "女",
        },
      ],
      community: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.activityInfo = this.$route.params;
    if (this.activityInfo.ac_sign_up) {
      this.percent = Math.round(
        (this.activityInfo.ac_sign_up_ready / this.activityInfo.ac_sign_up) *
          100
      );
    }
  },

  methods: {
    signup() {
      this.dialogVisible = true;
    },

    handleClose(done) {
      this.dialogVisible = false;
    },

    //表单操作
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.orderInfo.ac_guid = this.activityInfo.guid;
          testSignUp(this.orderInfo).then((res) => {
            notice("success", res.message);
            this.dialogVisible = false;
          });
        } else {
          console.log("error submit!!");
          this.dialogVisible = false;
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
<style lang='less' scoped>
@import "../styles/related/activity_info.less";
</style>
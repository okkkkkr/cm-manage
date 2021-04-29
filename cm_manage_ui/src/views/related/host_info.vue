<template>
  <div class="host-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>关键指标</span>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">承办方总数</li>
              <li style="font-size: 24px; font-weight: bold">23</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">当前项目</li>
              <li class="choseItem">全部</li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>
    <el-dialog title="管理员信息" :visible.sync="dialogFormVisible">
      <el-form
        :model="unitForm"
        status-icon
        ref="unitForm"
        :rules="rules"
        label-width="100px"
        class="demo-unitForm"
        label-position="top"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="承办方名称" prop="ht_name">
              <el-input v-model.number="unitForm.ht_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="承办方地址" prop="ht_address">
              <el-select
                style="width: 100%"
                v-model="unitForm.ht_address"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in identity"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="text-align: center; margin-top: 20px">
          <el-button type="primary" @click="submitForm('unitForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('unitForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="host-wrapper">
      <div class="host-member" v-for="item in hostList" :key="item.guid">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ item.ht_name }}</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >查看详情</el-button
            >
          </div>
          <el-row>
            <el-col :span="2">
              <div class="host-detail">
                <div class="text item">
                  <div class="demo-image">
                    <div class="block">
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="item.ht_logo"
                        fit="fill"
                      ></el-image>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="21">
              <div class="unit-name">北理珠青年志愿者协会</div>
              <p class="unit-basic">
                <i class="el-icon-phone"></i>
                0756-7732832
              </p>
              <p class="unit-basic">
                <i class="el-icon-location"></i>
                广东省珠海市香洲区金凤路10号
              </p>
            </el-col>
          </el-row>
        </el-card>
        <div class="separator" style="height: 30px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLocal } from "../../utils/handleCache";
import Regular from "@/utils/regular.js";
import initialAccount from "@/utils/random-account.js";

export default {
  name: "Fund",
  data() {
    return {
      dialogFormVisible: false,
      identity: [
        {
          value: "学生",
          label: "学生",
        },
        {
          value: "社会工作者",
          label: "社会工作者",
        },
      ],
      unitForm: {
        cm_residents_id: "",
        ht_name:"",
        ht_address:""
      },
      rules: {
        ht_name: [{ required: true, trigger: "blur" }],
        ht_address: [{ required: true, trigger: "blur" }],
      },
      hostList: [
        {
          guid: "承办方guid1",
          ht_name: "承办方名称",
          ht_address: "承办方地址",
          ht_introduce: "承办方介绍",
          ht_image: "",
          ht_logo:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=302487973,3701014649&fm=26&gp=0.jpg",
        },
        {
          guid: "承办方guid2",
          ht_name: "承办方名称",
          ht_address: "承办方地址",
          ht_introduce: "承办方介绍",
          ht_image: "",
          ht_logo:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1697271975,1733929650&fm=26&gp=0.jpg",
        },
        {
          guid: "承办方guid3",
          ht_name: "承办方名称",
          ht_address: "承办方地址",
          ht_introduce: "承办方介绍",
          ht_image: "",
          ht_logo:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2239203324,1371079426&fm=26&gp=0.jpg",
        },
        {
          guid: "承办方guid4",
          ht_name: "承办方名称",
          ht_address: "承办方地址",
          ht_introduce: "承办方介绍",
          ht_image: "",
          ht_logo:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1400537201,154413284&fm=26&gp=0.jpg",
        },
      ],
    };
  },
  methods: {
    createUnit() {
      this.dialogFormVisible = true;
      var _self = this;
      setTimeout(function () {
        _self.resetForm("unitForm");
        _self.unitForm.cm_residents_id = initialAccount("resident");
      }, 100);
    },

    //表单操作
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 创建新管理员
          // createAdmin(this.unitForm)
          //   .then((res) => {
          //     if (res.code == 200) {
          //       notice("success", res.message);
          //       this.dialogFormVisible = false;
          //     } else {
          //       notice("warning", res.message);
          //       this.dialogFormVisible = false;
          //     }
          //     this.getUnitList();
          //   })
          //   .catch((err) => {
          //     this.dialogFormVisible = false;
          //     notice("error", "创建失败");
          //   });
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
@import "../../styles/related/host_info.less";
</style>


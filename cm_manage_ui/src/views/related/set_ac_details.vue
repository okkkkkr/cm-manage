<template>
  <!-- 修改活动详情 -->
  <div class="detail-container">
    <div class="hiddenBtn">
      <div>
        <el-button
          @click="detailFlag = !detailFlag"
          :type="detailFlag ? 'primary' : 'danger'"
          icon="el-icon-receiving"
          circle
        ></el-button>
      </div>
      <div style="margin-top: 10px">
        <el-button
          @click="processFlag = !processFlag"
          :type="processFlag ? 'primary' : 'danger'"
          icon="el-icon-tickets"
          circle
        ></el-button>
      </div>
      <div style="margin-top: 10px">
        <el-button
          @click="suppliesFlag = !suppliesFlag"
          :type="suppliesFlag ? 'primary' : 'danger'"
          icon="el-icon-sell"
          circle
        ></el-button>
      </div>
    </div>

    <el-card v-if="detailFlag" class="box-card">
      <div slot="header" class="clearfix">
        <span>活动详情</span>
      </div>
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
            <el-form-item label="活动名称" prop="ac_name">
              <el-input v-model="orderInfo.ac_name"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="ac_begin_time">
              <el-date-picker
                style="width: 100%"
                v-model="orderInfo.ac_begin_time"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="报名名额" prop="ac_sign_up">
              <el-input v-model="orderInfo.ac_sign_up"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="活动类型" prop="ac_type">
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
            <el-form-item label="结束时间" prop="ac_end_time">
              <el-date-picker
                style="width: 100%"
                v-model="orderInfo.ac_end_time"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="活动负责人姓名" prop="ac_contact_name">
              <el-input v-model="orderInfo.ac_contact_name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="投入资金（元）" prop="ac_fund">
              <el-input v-model="orderInfo.ac_fund"></el-input>
            </el-form-item>
            <el-form-item label="活动地址" prop="ac_address">
              <el-input v-model="orderInfo.ac_address"></el-input>
            </el-form-item>
            <el-form-item label="活动负责人电话" prop="ac_contact_phone">
              <el-input v-model="orderInfo.ac_contact_phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="活动介绍内容" prop="ac_introduce">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="orderInfo.ac_introduce"
            maxlength="200"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="活动介绍图片" prop="handler_id">
          <el-upload
            ref="upload"
            class="upload-demo"
            :action="baseAction + '/api/upload/acImage'"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            :auto-upload="true"
            :on-success="successUpload"
            :data="attached"
            :before-remove="beforeRemove"
            :limit="5"
          >
            <el-button slot="trigger" size="middle" type="primary"
              >点击上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且图片大小不超过2M / 张
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item style="text-align: center" v-if="!detailSubmit">
          <el-button type="primary" @click="submitForm('orderInfo')"
            >提交</el-button
          >
          <el-button @click="resetForm('orderInfo')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card v-if="processFlag" class="box-card">
      <div slot="header" class="clearfix">
        <span>活动流程</span>
      </div>
      <el-timeline>
        <el-timeline-item
          v-for="item in processList"
          :key="item.ac_process_steps"
          :timestamp="item.ac_process_title"
        >
        </el-timeline-item>
      </el-timeline>
      <el-button
        v-if="insertFlag && processSubmit"
        @click="insertFlag = false"
        type="primary"
        icon="el-icon-plus"
        circle
        plain
      ></el-button>
      <el-button
        v-if="insertFlag && processSubmit"
        @click="deleteProcess()"
        type="danger"
        icon="el-icon-minus"
        circle
        plain
      ></el-button>

      <el-row v-if="!insertFlag && processSubmit" :gutter="20">
        <el-col :span="4">
          <el-input v-model="processValue" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="20">
          <el-button
            @click="insertProcess()"
            type="primary"
            icon="el-icon-check"
            circle
            plain
          ></el-button>
          <el-button
            @click="insertFlag = true"
            type="danger"
            icon="el-icon-close"
            circle
            plain
          ></el-button>
        </el-col>
      </el-row>

      <div class="submitBtn" v-if="processSubmit">
        <el-button type="primary" @click="submitOrNot('process')"
          >提交</el-button
        >
        <el-button @click="resetList('process')">重置</el-button>
      </div>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card v-if="suppliesFlag" class="box-card">
      <div slot="header" class="clearfix">
        <span>活动物资</span>
      </div>

      <el-table :data="suppliesList" style="width: 100%" border>
        <el-table-column prop="ac_supplies_name" label="物资名称">
        </el-table-column>
        <el-table-column prop="ac_supplies_unit" label="物资单位">
        </el-table-column>
        <el-table-column prop="ac_supplies_num" label="物资数量">
        </el-table-column>
        <el-table-column prop="ac_supplies_price" label="物资单价">
        </el-table-column>
        <el-table-column label="合计（元）">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              {{ scope.row.ac_supplies_num * scope.row.ac_supplies_price }}
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="separator" style="height: 30px"></div>

      <el-button
        v-if="insertSp && suppliesSubmit"
        @click="insertSp = false"
        type="primary"
        icon="el-icon-plus"
        circle
        plain
      ></el-button>
      <el-button
        v-if="insertSp && suppliesSubmit"
        @click="deleteSupplies()"
        type="danger"
        icon="el-icon-minus"
        circle
        plain
      ></el-button>

      <el-row v-if="!insertSp && suppliesSubmit" :gutter="20">
        <el-col :span="4">
          <el-input
            v-model="suppliesVal.supplies_name"
            placeholder="请输入物资名称"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            v-model="suppliesVal.supplies_unit"
            placeholder="请输入物资单位"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            v-model="suppliesVal.supplies_num"
            placeholder="请输入物资数量"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            v-model="suppliesVal.supplies_price"
            placeholder="请输入物资单价"
          ></el-input>
        </el-col>
        <el-col :span="8" v-if="suppliesSubmit">
          <el-button
            @click="insertSupplies()"
            type="primary"
            icon="el-icon-check"
            circle
            plain
          ></el-button>
          <el-button
            @click="clearSpVal()"
            type="danger"
            icon="el-icon-close"
            circle
            plain
          ></el-button>
        </el-col>
      </el-row>

      <div class="submitBtn" v-if="suppliesSubmit">
        <el-button type="primary" @click="submitOrNot('supplies')"
          >提交</el-button
        >
        <el-button @click="resetList('supplies')">重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getLocal, setLocal } from "../../utils/handleCache";
import { getTypeList } from "@/api/related";
import { addAcDetails, addAcSupplies, addAcProcess } from "@/api/activity";
import { delImage } from "@/api/files";
import { notice } from "../../utils/message";
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
      processValue: "",
      fileList: [],
      rules: {
        ac_name: [{ required: true, trigger: "blur" }],
        ac_type: [{ required: true, trigger: "blur" }],
        ac_fund: [{ required: true, trigger: "blur" }],
        ac_address: [{ required: true, trigger: "blur" }],
        ac_begin_time: [{ required: true, trigger: "blur" }],
        ac_end_time: [{ required: true, trigger: "blur" }],
        ac_introduce: [{ required: true, trigger: "blur" }],
        ac_image: [{ required: true, trigger: "blur" }],
        ac_sign_up: [{ required: true, trigger: "blur" }],
        ac_contact_name: [{ required: true, trigger: "blur" }],
        ac_contact_phone: [
          { validator: validatePhone, required: true, trigger: "blur" },
        ],
      },
      orderInfo: {
        ac_name: "",
        ac_type: "",
        ac_fund: "",
        ac_address: "",
        ac_begin_time: "",
        ac_end_time: "",
        ac_introduce: "",
        ac_image: "",
        ac_sign_up: "",
        ac_sign_up_ready: "0",
        ac_contact_name: "",
        ac_contact_phone: "",
        ac_belong_items_id: this.$route.query.itemData.activity_items_id,
        ac_publish: "1",
      },

      processObj: {
        ac_process_steps: "", // 前端自增
        ac_process_title: "",
        ac_process_remark: "",
        ac_process_state: "0",
        order_start_time: "",
        order_finish_time: "",
        ac_guid: "",
      },
      processList: [],

      suppliesVal: {
        supplies_name: "",
        supplies_unit: "",
        supplies_num: "",
        supplies_price: "",
      },

      suppliesObj: {
        ac_supplies_name: "",
        ac_supplies_unit: "",
        ac_supplies_num: "",
        ac_supplies_price: "",
        ac_supplies_remain: "",
        ac_guid: "",
      },
      suppliesList: [],

      attached: {
        _id: this.$route.query.itemData.activity_items_id,
      },
      acType: [],
      ac_detail_guid: "",

      detailFlag: true,
      processFlag: true,
      suppliesFlag: true,
      insertFlag: true,
      insertSp: true,
      detailSubmit: false,
      processSubmit: true,
      suppliesSubmit: true,
    };
  },

  components: {},

  computed: {
    ...mapGetters(["baseAction"]),
  },

  created() {
    getTypeList()
      .then((res) => {
        let items = res.data;
        items.forEach((item) => {
          this.acType.push({
            label: item.type_name,
            value: item.type_name,
          });
        });
      })
      .catch((err) => {
        notice("error", "服务器出错！");
      });
  },

  methods: {
    //表单操作
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addAcDetails(this.orderInfo).then((res) => {
            notice("success", res.message);
            this.ac_detail_guid = res.data;
            this.detailSubmit = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    submitOrNot(type) {
      if (this.detailSubmit) {
        this.submitList(type);
      } else {
        notice("warning", "请先创建并发布活动");
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    submitList(type) {
      if (type == "process") {
        if (this.processList.length < 3) {
          notice("warning", "请填写三个或以上活动流程后提交！");
        } else {
          this.processList.forEach((item, index) => {
            item.ac_guid = this.ac_detail_guid;
            if (index == this.processList.length - 1) {
              addAcProcess(this.processList).then((res) => {
                notice("success", res.message);
                this.processSubmit = false;
              });
            }
          });
        }
      } else {
        if (this.suppliesList.length == 0) {
          notice("warning", "请填写活动相关物资后提交！");
        } else {
          this.suppliesList.forEach((item, index) => {
            item.ac_guid = this.ac_detail_guid;
            if (index == this.suppliesList.length - 1) {
              addAcSupplies(this.suppliesList).then((res) => {
                notice("success", res.message);
                this.suppliesSubmit = false;
              });
            }
          });
        }
      }
    },

    resetList(type) {
      if (type == "process") {
        this.processList.splice(0);
      } else {
        this.suppliesList.splice(0);
      }
    },

    handleRemove(file, fileList) {
      this.setAcImage(fileList);
      delImage({
        fileName: file.name,
        _id: this.attached._id,
      })
        .then((res) => {
          console.log("111111", res);
          notice("success", res.message);
        })
        .catch((err) => {
          notice("error", res.message);
        });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    setAcImage(fileList) {
      let newArray = [];
      if (fileList.length == 0) {
        this.orderInfo.ac_image = "";
      } else {
        fileList.forEach((item, index) => {
          newArray.push(item.response.data);
          if (index == fileList.length - 1) {
            this.orderInfo.ac_image = JSON.stringify(newArray);
            console.log(this.orderInfo.ac_image);
          }
        });
      }
    },

    successUpload(response, file, fileList) {
      this.setAcImage(fileList);
    },

    insertProcess() {
      if (this.processValue == "") {
        notice("error", "请填写活动步骤名称后提交");
      } else {
        let newObj = Object.assign({}, this.processObj);
        newObj.ac_process_steps = this.processList.length + 1;
        newObj.ac_process_title = this.processValue;
        this.processValue = "";

        this.processList.push(newObj);
      }
      this.insertFlag = true;
    },

    deleteProcess() {
      this.processList.splice(this.processList.length - 1, 1);
    },

    checkSpValid() {
      for (let key in this.suppliesVal) {
        if (this.suppliesVal[key] == "") {
          return true;
        }
      }
    },

    clearSpVal() {
      for (let key in this.suppliesVal) {
        this.suppliesVal[key] = "";
      }
      this.insertSp = true;
    },

    insertSupplies() {
      var self = this;
      if (this.checkSpValid()) {
        notice("error", "请填写完整信息后提交！");
        setTimeout(() => {
          self.clearSpVal();
        }, 0);
      } else {
        let newObj = Object.assign({}, this.suppliesObj);
        newObj.ac_supplies_name = this.suppliesVal.supplies_name;
        newObj.ac_supplies_unit = this.suppliesVal.supplies_unit;
        newObj.ac_supplies_num = this.suppliesVal.supplies_num;
        newObj.ac_supplies_price = this.suppliesVal.supplies_price;
        this.suppliesList.push(newObj);
        setTimeout(() => {
          self.clearSpVal();
        }, 0);
      }
    },

    deleteSupplies() {
      this.suppliesList.splice(this.suppliesList.length - 1, 1);
      this.clearSpVal();
    },
  },
};
</script>
<style lang='less' scoped>
.detail {
  &-container {
    background-color: #fdfdfd;
    min-height: 100vh;
    padding: 30px 100px;
  }
}

.submitBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.hiddenBtn {
  position: fixed;
  border-radius: 30px;
  right: 20px;
  padding: 20px 10px;
  background: #eeeeee;
}

/deep/ .el-step__title {
  padding-bottom: 20px !important;
  color: black !important;
}
</style>
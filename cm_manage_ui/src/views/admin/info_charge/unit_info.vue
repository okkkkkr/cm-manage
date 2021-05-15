<template>
  <div class="unit-container">
    <el-card class="box-card">
      <p>
        <i
          class="el-icon-user-solid"
          style="font-size: 20px; color: #409eff"
        ></i>
        <span class="host-title">{{ unitTitle }}</span>
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
        <el-col :span="16">
          <el-button @click="createUnit()" type="primary">新增</el-button>

          <el-dialog :title="unitTitle" :visible.sync="dialogFormVisible">
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
                <el-col :span="8">
                  <el-form-item label="名称" prop="unitName">
                    <el-input v-model="unitForm.unitName"></el-input>
                  </el-form-item>
                  <el-form-item label="初始账号">
                    <el-input
                      :placeholder="unitForm.unitAccount"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式" prop="unitPhone">
                    <el-input v-model.number="unitForm.unitPhone"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pass">
                    <el-input
                      type="password"
                      v-model="unitForm.pass"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="地址" prop="unitAddress">
                    <el-input v-model="unitForm.unitAddress"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input
                      type="password"
                      v-model="unitForm.checkPass"
                      autocomplete="off"
                    ></el-input>
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
        </el-col>
      </el-row>
    </el-card>

    <el-card class="host-list" shadow="hover">
      <el-table
      border
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'guid', order: 'descending' }"
      >
        <el-table-column prop="guid" label="Guid" width="300">
        </el-table-column>
        <el-table-column
          :prop="this.unit == 'cm' ? 'cm_account' : 'ht_account'"
          label="登陆账号"
          sortable
        >
        </el-table-column>
        <el-table-column
          :prop="this.unit == 'cm' ? 'cm_name' : 'ht_name'"
          label="名称"
          sortable
        >
        </el-table-column>
        <el-table-column
          :prop="this.unit == 'cm' ? 'cm_phone' : 'ht_phone'"
          label="联系方式"
        >
        </el-table-column>
        <el-table-column
          :prop="this.unit == 'cm' ? 'cm_address' : 'ht_address'"
          label="详细地址"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="page.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  createCommunity,
  getCommunityList,
  createHost,
  getHostList,
} from "@/api/user.js";
import Regular from "@/utils/regular.js";
import initialAccount from "@/utils/random-account.js";
import {notice} from '@/utils/message.js'

export default {
  beforeRouteEnter(to, from, next) {
    if (to.name == "Host") {
      next((vm) => {
        vm.unitTitle = "承办方信息";
        vm.unit = "ht";
        vm.getUnitList("ht");
      });
    } else {
      next((vm) => {
        vm.unitTitle = "社区方信息";
        vm.unit = "cm";
        vm.getUnitList("cm");
      });
    }
  },

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("please fill in the password again"));
      } else if (value !== this.unitForm.pass) {
        callback(new Error("different"));
      } else {
        callback();
      }
    };
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
      input2: "",
      tableData: [],
      unitTitle: "",
      unit: "",
      dialogFormVisible: false,
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
      unitForm: {
        unitName: "",
        unitAddress: "",
        unitPhone: "",
        unitAccount: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ required: true, trigger: "change" }],
        checkPass: [
          { validator: validatePass, required: true, trigger: "change" },
        ],
        unitName: [{ required: true, trigger: "blur" }],
        unitAddress: [{ required: true, trigger: "blur" }],
        unitPhone: [
          { validator: validatePhone, required: true, trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    "unitForm.pass": {
      deep: true,
      immediate: false,
      handler(newValue) {
        this.unitForm.checkPass = "";
      },
    },
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getUnitList();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getUnitList();
    },

    // 点击表格项
    handleClick(row) {
      console.log(row);
    },

    //表单操作
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.unit == "cm") {
            // 创建新主办方个体
            createCommunity(this.unitForm)
              .then((res) => {
                if (res.code == 200) {
                  notice("success", res.message);
                  this.dialogFormVisible = false;
                } else {
                  notice("warning", res.message);
                  dialogFormVisible = false;
                }
                this.getUnitList();
              })
              .catch((err) => {
                this.dialogFormVisible = false;
                notice("error", res.message);
              });
          } else {
            // 创建新承办方个体
            createHost(this.unitForm)
              .then((res) => {
                if (res.code == 200) {
                  notice("success", res.message);
                  this.dialogFormVisible = false;
                } else {
                  notice("warning", res.message);
                  dialogFormVisible = false;
                }
                this.getUnitList();
              })
              .catch((err) => {
                this.dialogFormVisible = false;
                notice("error", res.message);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //新建个体用户按钮
    createUnit() {
      this.dialogFormVisible = true;
      var _self = this;
      setTimeout(function () {
        _self.resetForm("unitForm");
        _self.unitForm.unitAccount = initialAccount(_self.unit);
      }, 100);
    },

    // 获取个体信息列表
    getUnitList() {
      if (this.unit == "cm") {
        getCommunityList(this.page.pageNum, this.page.pageSize)
          .then((res) => {
            this.tableData = res.data;
            this.page.total = res.total;
          })
          .catch((err) => {
            notice("error", "数据加载出错");
          });
      } else {
        getHostList(this.page.pageNum, this.page.pageSize)
          .then((res) => {
            this.tableData = res.data;
            this.page.total = res.total;
          })
          .catch((err) => {
            notice("error", "数据加载出错");
          });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
@import "../../../styles/admin/unit_info.less";
</style>
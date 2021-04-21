<template>
  <div class="admin-container">
    <el-card class="box-card">
      <p>
        <i
          class="el-icon-user-solid"
          style="font-size: 20px; color: #409eff"
        ></i>
        <span class="host-title">管理员信息</span>
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
                <el-col :span="8">
                  <el-form-item label="姓名" prop="admin_name">
                    <el-input v-model="unitForm.admin_name"></el-input>
                  </el-form-item>
                  <el-form-item label="籍贯" prop="admin_place">
                    <el-input v-model="unitForm.admin_place"></el-input>
                  </el-form-item>
                  <el-form-item label="初始账号">
                    <el-input
                      :placeholder="unitForm.admin_id"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄" prop="admin_age">
                    <el-input v-model.number="unitForm.admin_age"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" prop="admin_phone">
                    <el-input v-model.number="unitForm.admin_phone"></el-input>
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
                  <el-form-item label="性别" prop="admin_sex">
                    <el-select
                      style="width: 100%"
                      v-model="unitForm.admin_sex"
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
                  <el-form-item label="身份证号（二代）" prop="admin_card">
                    <el-input v-model="unitForm.admin_card"></el-input>
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
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="admin_id" label="管理员账号" width="180">
        </el-table-column>
        <el-table-column prop="admin_name" label="姓名" sortable width="180">
        </el-table-column>
        <el-table-column prop="admin_age" label="年龄" width="180">
        </el-table-column>
        <el-table-column prop="admin_sex" label="性别" width="180">
        </el-table-column>
        <el-table-column prop="admin_place" label="籍贯" width="180">
        </el-table-column>
        <el-table-column prop="admin_phone" label="联系方式" width="180">
        </el-table-column>
        <el-table-column prop="admin_card" label="身份证号码" width="180">
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
import { createAdmin,getAdminList} from "@/api/user.js";
import Regular from "@/utils/regular.js";
import initialAccount from "@/utils/random-account.js";
import {notice} from '@/utils/message.js'

export default {
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
    var validateCard = (rule, value, callback) => {
      let regular = new Regular();
      if (value == "") {
        callback(new Error("please fill in the IDCard"));
      } else if (!regular.IDCard(value)) {
        callback(new Error("Please fill in the currect IDCard"));
      } else {
        callback();
      }
    };
    return {
      input2: "",
      tableData: [],
      dialogFormVisible: false,
      sex: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
      unitForm: {
        admin_id: "",
        admin_name: "",
        admin_age: "",
        admin_sex: "",
        admin_place: "",
        admin_phone: "",
        admin_card: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ required: true, trigger: "change" }],
        checkPass: [
          { validator: validatePass, required: true, trigger: "change" },
        ],
        admin_name: [{ required: true, trigger: "blur" }],
        admin_age: [{ required: true, trigger: "blur" }],
        admin_sex: [{ required: true, trigger: "blur" }],
        admin_place: [{ required: true, trigger: "blur" }],
        admin_phone: [
          { validator: validatePhone, required: true, trigger: "blur" },
        ],
        admin_card: [
          { validator: validateCard, required: true, trigger: "blur" },
        ],
      },
    };
  },
  
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getUnitList();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getUnitList();
    },

    handleClick(row) {
      console.log(row);
    },

    //表单操作
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 创建新管理员
          createAdmin(this.unitForm)
            .then((res) => {
              if (res.code == 200) {
                notice("success", res.message);
                this.dialogFormVisible = false;
              } else {
                notice("warning", res.message);
                this.dialogFormVisible = false;
              }
              this.getUnitList();
            })
            .catch((err) => {
              this.dialogFormVisible = false;
              notice("error", "创建失败");
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

    //新建个体用户按钮
    createUnit() {
      this.dialogFormVisible = true;
      var _self = this;
      setTimeout(function () {
        _self.resetForm("unitForm");
        _self.unitForm.admin_id = initialAccount('admin');
      }, 100);
    },

    // 获取管理员信息列表
    getUnitList() {
      getAdminList(this.page.pageNum, this.page.pageSize)
        .then((res) => {
          this.tableData = res.data;
          this.page.total = res.total;
        })
        .catch((err) => {
          notice("error", "数据加载出错");
        });
    }
  },

  created(){
    this.getUnitList();
  },
};
</script>

<style lang="less" scoped>
@import "../../../styles/admin/admin_info.less";
</style>
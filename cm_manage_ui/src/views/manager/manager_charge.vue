<template>
  <div class="manager-container">
    <el-card class="box-card">
      <p>
        <i
          class="el-icon-user-solid"
          style="font-size: 20px; color: #409eff"
        ></i>
        <span class="host-title">管理者信息</span>
      </p>
      <el-row :gutter="50">
        <el-col :span="4">
          <el-input
            placeholder="管理员姓名检索"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            placeholder="联系方式检索"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            placeholder="证件号码检索"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="createUnit()">新增</el-button>
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
                  <el-form-item label="姓名" prop="manager_name">
                    <el-input v-model="unitForm.manager_name"></el-input>
                  </el-form-item>
                  <el-form-item label="籍贯" prop="manager_place">
                    <el-input v-model="unitForm.manager_place"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号码（二代）" prop="manager_card">
                    <el-input v-model="unitForm.manager_card"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄" prop="manager_age">
                    <el-input v-model.number="unitForm.manager_age"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" prop="manager_phone">
                    <el-input
                      v-model.number="unitForm.manager_phone"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="居民id">
                    <el-input :placeholder="unitForm._id" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别" prop="manager_sex">
                    <el-select
                      style="width: 100%"
                      v-model="unitForm.manager_sex"
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
                  <el-form-item label="职位" prop="manager_position">
                    <el-input v-model="unitForm.manager_position"></el-input>
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

    <div class="separator" style="height: 20px"></div>

    <el-card v-if="modify" class="box-card">
      <el-form
        :model="managerForm"
        status-icon
        ref="managerForm"
        :rules="rules"
        label-width="100px"
        class="demo-managerForm"
        label-position="top"
      >
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="姓名" prop="manager_name">
              <el-input v-model="managerForm.manager_name"></el-input>
            </el-form-item>
            <el-form-item label="籍贯" prop="manager_place">
              <el-input v-model="managerForm.manager_place"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码（二代）" prop="manager_card">
              <el-input v-model="managerForm.manager_card"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄" prop="manager_age">
              <el-input v-model.number="managerForm.manager_age"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="manager_phone">
              <el-input v-model="managerForm.manager_phone"></el-input>
            </el-form-item>
            <el-form-item label="居住地址" prop="_id">
              <el-input v-model="managerForm._id" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="manager_sex">
              <el-select
                style="width: 100%"
                v-model="managerForm.manager_sex"
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
            <el-form-item label="职位/等级" prop="manager_position">
              <el-input v-model="managerForm.manager_position"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="text-align: center; margin-top: 20px">
          <el-button type="primary" @click="submitManager()">提交</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="host-list" shadow="hover">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="_id" label="管理者Id" width="180">
        </el-table-column>
        <el-table-column
          :prop="role == 'cm' ? 'cm_manager_name' : 'ht_manager_name'"
          label="姓名"
          sortable
          width="140"
        >
        </el-table-column>
        <el-table-column
          :prop="role == 'cm' ? 'cm_manager_sex' : 'ht_manager_sex'"
          label="性别"
          width="140"
        >
        </el-table-column>
        <el-table-column
          :prop="role == 'cm' ? 'cm_manager_age' : 'ht_manager_age'"
          label="年龄"
          width="140"
        >
        </el-table-column>
        <el-table-column
          :prop="role == 'cm' ? 'cm_manager_place' : 'ht_manager_place'"
          label="籍贯"
          width="140"
        >
        </el-table-column>
        <el-table-column
          :prop="role == 'cm' ? 'cm_manager_position' : 'ht_manager_position'"
          label="职位/等级"
          width="140"
        >
        </el-table-column>
        <el-table-column
          :prop="role == 'cm' ? 'cm_manager_phone' : 'ht_manager_phone'"
          label="联系方式"
          width="180"
        >
        </el-table-column>
        <el-table-column
          :prop="role == 'cm' ? 'cm_manager_card' : 'ht_manager_card'"
          label="身份证号"
          width="180"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="110">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button
              @click="handleDel(scope.row)"
              type="text"
              size="small"
              style="color: #f56c6c"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        @@size-change="handleSizeChange"
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
import { getLocal } from "@/utils/handleCache";
import Regular from "@/utils/regular.js";
import initialAccount from "@/utils/random-account.js";
import {
  addCmManager,
  addHtManager,
  getMgList,
  modifyManager,
  delManager,
} from "@/api/related";
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
      modify: false,
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
      role: JSON.parse(getLocal("role")),
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
      managerForm: {
        _id: "",
        manager_name: "",
        manager_age: "",
        manager_sex: "",
        manager_place: "",
        manager_phone: "",
        manager_position: "",
        manager_card: "",
        guid: "",
        role: "",
      },
      unitForm: {
        _id: "",
        manager_name: "",
        manager_age: "",
        manager_sex: "",
        manager_place: "",
        manager_phone: "",
        manager_position: "",
        manager_card: "",
        guid: "",
      },
      rules: {
        manager_name: [{ required: true, trigger: "blur" }],
        manager_age: [{ required: true, trigger: "blur" }],
        manager_sex: [{ required: true, trigger: "blur" }],
        manager_place: [{ required: true, trigger: "blur" }],
        manager_position: [{ required: true, trigger: "blur" }],
        manager_card: [
          { validator: validateCard, required: true, trigger: "blur" },
        ],
        manager_phone: [
          { validator: validatePhone, required: true, trigger: "blur" },
        ],
      },
      input2: "",
      tableData: [],
    };
  },

  created() {
    this.getUnitList();
  },

  methods: {
    formatter(row, column) {
      return row.address;
    },

    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getUnitList();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getUnitList();
    },

    // 修改信息表单
    submitManager() {
      this.managerForm.role = this.role;
      modifyManager(this.managerForm)
        .then((res) => {
          notice("success", res.message);
          this.modify = false;
          this.getUnitList();
        })
        .catch((err) => {
          notice("error", "居民信息修改失败！");
        });
    },

    handleClick(row) {
      this.modify = true;
      if ((this.role = "cm")) {
        this.managerForm.guid = row.cm_guid;
        this.managerForm.manager_age = row.cm_manager_age;
        this.managerForm.manager_card = row.cm_manager_card;
        this.managerForm.manager_name = row.cm_manager_name;
        this.managerForm.manager_phone = row.cm_manager_phone;
        this.managerForm.manager_place = row.cm_manager_place;
        this.managerForm.manager_position = row.cm_manager_position;
        this.managerForm.manager_sex = row.cm_manager_sex;
        this.managerForm._id = row._id;
      } else {
        this.managerForm.guid = row.ht_guid;
        this.managerForm.manager_age = row.ht_manager_age;
        this.managerForm.manager_card = row.ht_manager_card;
        this.managerForm.manager_name = row.ht_manager_name;
        this.managerForm.manager_phone = row.ht_manager_phone;
        this.managerForm.manager_place = row.ht_manager_place;
        this.managerForm.manager_position = row.ht_manager_position;
        this.managerForm.manager_sex = row.ht_manager_sex;
        this.managerForm._id = row._id;
      }
    },

    handleDel(row) {
      console.log(row);
      delManager({ _id: row._id, role: this.role })
        .then((res) => {
          notice("success", res.message);
          this.getUnitList();
        })
        .catch((err) => {
          notice("error", "服务器错误，信息清除失败！");
        });
    },

    createUnit() {
      this.dialogFormVisible = true;
      var _self = this;
      setTimeout(function () {
        _self.resetForm("unitForm");
        _self.unitForm._id = initialAccount("mg");
      }, 100);
    },

    addSuccess(res) {
      if (res.code == 200) {
        notice("success", res.message);
        this.dialogFormVisible = false;
      } else {
        notice("warning", res.message);
        this.dialogFormVisible = false;
      }
      this.getUnitList();
    },

    addFail(err) {
      this.dialogFormVisible = false;
      notice("error", "创建失败");
    },

    //表单操作
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.unitForm.guid = JSON.parse(
            JSON.parse(getLocal("unitInfo"))
          ).guid;
          if (this.role == "cm") {
            addCmManager(this.unitForm)
              .then((res) => {
                this.addSuccess(res);
              })
              .catch((err) => {
                this.addFail(err);
              });
          } else {
            addHtManager(this.unitForm)
              .then((res) => {
                this.addSuccess(res);
              })
              .catch((err) => {
                this.addFail(err);
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

    cancel() {
      this.modify = false;
    },

    // 获取管理员信息列表
    getUnitList() {
      let param = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        role: this.role,
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
      };
      console.log(param);
      getMgList(param)
        .then((res) => {
          this.tableData = res.data;
          this.page.total = res.total;
        })
        .catch((err) => {
          notice("error", "数据加载出错");
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../styles/manager/manager_charge.less";
</style>
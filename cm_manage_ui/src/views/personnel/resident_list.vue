<template>
  <div class="host-container">
    <el-card v-if="modify" class="box-card">
      <el-form
        :model="residentsForm"
        status-icon
        ref="residentsForm"
        :rules="rules"
        label-width="100px"
        class="demo-residentsForm"
        label-position="top"
      >
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="姓名" prop="cm_residents_name">
              <el-input v-model="residentsForm.cm_residents_name"></el-input>
            </el-form-item>
            <el-form-item label="籍贯" prop="cm_residents_place">
              <el-input v-model="residentsForm.cm_residents_place"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄" prop="cm_residents_age">
              <el-input
                v-model.number="residentsForm.cm_residents_age"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="cm_residents_phone">
              <el-input
                v-model.number="residentsForm.cm_residents_phone"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="cm_residents_sex">
              <el-select
                style="width: 100%"
                v-model="residentsForm.cm_residents_sex"
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
            <el-form-item label="社会身份" prop="cm_residents_identity">
              <el-select
                style="width: 100%"
                v-model="residentsForm.cm_residents_identity"
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
          <el-form-item label="居住地址" prop="cm_residents_address">
            <el-input v-model="residentsForm.cm_residents_address"></el-input>
          </el-form-item>
        </el-row>
        <el-form-item style="text-align: center; margin-top: 20px">
          <el-button type="primary" @click="submitRessidents('residentsForm')"
            >提交</el-button
          >
          <el-button @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <div style="display: flex; justify-content: space-between">
          <div style="display: flex; align-items: center">
            <img
              src="../../assets/images/unit/residents.png"
              style="margin-right: 10px"
              alt=""
            />
            <span>社区居民信息</span>
          </div>
          <el-button type="text" style="font-size: 16px" @click="createUnit()"
            >居民入住登记</el-button
          >

          <el-dialog title="居民信息" :visible.sync="dialogFormVisible">
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
                  <el-form-item label="姓名" prop="cm_residents_name">
                    <el-input v-model="unitForm.cm_residents_name"></el-input>
                  </el-form-item>
                  <el-form-item label="籍贯" prop="cm_residents_place">
                    <el-input v-model="unitForm.cm_residents_place"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄" prop="cm_residents_age">
                    <el-input
                      v-model.number="unitForm.cm_residents_age"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" prop="cm_residents_phone">
                    <el-input
                      v-model.number="unitForm.cm_residents_phone"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别" prop="cm_residents_sex">
                    <el-select
                      style="width: 100%"
                      v-model="unitForm.cm_residents_sex"
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
                  <el-form-item label="社会身份" prop="cm_residents_identity">
                    <el-select
                      style="width: 100%"
                      v-model="unitForm.cm_residents_identity"
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
                <el-form-item label="居住地址" prop="cm_residents_address">
                  <el-input v-model="unitForm.cm_residents_address"></el-input>
                </el-form-item>
              </el-row>
              <el-form-item style="text-align: center; margin-top: 20px">
                <el-button type="primary" @click="submitForm('unitForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('unitForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
      <div class="block">
        <el-table :data="tableData" style="width: 100%; max-height: 80vh" border>
          <el-table-column prop="cm_residents_id" label="Uuid" width="300">
          </el-table-column>
          <el-table-column prop="cm_residents_name" label="姓名">
          </el-table-column>
          <el-table-column prop="cm_residents_age" label="年龄" >
          </el-table-column>
          <el-table-column prop="cm_residents_sex" label="性别">
          </el-table-column>
          <el-table-column prop="cm_residents_place" label="籍贯">
          </el-table-column>
          <el-table-column prop="cm_residents_identity" label="身份">
          </el-table-column>
          <el-table-column
            prop="cm_residents_phone"
            label="联系方式"
          >
          </el-table-column>
          <el-table-column
            prop="cm_residents_paticipate"
            label="参与活动次数"
          >
          </el-table-column>
          <el-table-column
            prop="cm_residents_address"
            label="居住地址"
            width="300"
          >
          </el-table-column>
          <el-table-column
            prop="cm_residents_address"
            label="居住状态"
            width="80"
          >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.cm_residents_state === '1' ? 'success' : 'danger'"
              disable-transitions>{{scope.row.cm_residents_state == '1' ? '居住中':'已搬离'}}</el-tag>
          </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button
                @click="handleDel(scope.row)"
                style="color: #f56c6c"
                type="text"
                size="small"
                >搬离</el-button
              >
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
      </div>
    </el-card>
  </div>
</template>

<script>
import { getLocal } from "../../utils/handleCache";
import Regular from "@/utils/regular.js";
import { notice } from "@/utils/message";
import {
  addResident,
  getResidentsList,
  modifyResidents,
  delResidents,
} from "@/api/residents";


export default {
  name: "Fund",
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
      modify: false,
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
      dialogFormVisible: false,
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
      identity: [
        {
          value: "0",
          label: "学生",
        },
        {
          value: "1",
          label: "社会工作者",
        },
      ],
      unitForm: {
        cm_residents_id: "",
        cm_residents_name: "",
        cm_residents_age: "",
        cm_residents_sex: "",
        cm_residents_place: "",
        cm_residents_phone: "",
        cm_residents_identity: "",
        cm_residents_address: "",
        cm_residents_paticipate: "",
        cm_residents_state:"1",
        cm_guid: "",
      },
      residentsForm: {
        cm_residents_id: "",
        cm_residents_name: "",
        cm_residents_age: "",
        cm_residents_sex: "",
        cm_residents_place: "",
        cm_residents_phone: "",
        cm_residents_identity: "",
        cm_residents_address: "",
        cm_residents_paticipate: "",
        cm_residents_state:"1",
        cm_guid: "",
      },
      rules: {
        cm_residents_name: [{ required: true, trigger: "blur" }],
        cm_residents_age: [{ required: true, trigger: "blur" }],
        cm_residents_sex: [{ required: true, trigger: "blur" }],
        cm_residents_place: [{ required: true, trigger: "blur" }],
        cm_residents_address: [{ required: true, trigger: "blur" }],
        cm_residents_identity: [{ required: true, trigger: "blur" }],
        cm_residents_phone: [
          { validator: validatePhone, required: true, trigger: "blur" },
        ],
      },
      tableData: [],
    };
  },
  created() {
    this.getUnitList();
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
      this.modify = true;
      this.residentsForm = row;
    },
  
    handleDel(row) {
      delResidents({cm_residents_id: row.cm_residents_id}).then(res => {
        notice('success', res.message)
        this.getUnitList();
      }).catch(err => {
        notice('error', "服务器错误，信息清除失败！")
      })
    },

    createUnit() {
      this.dialogFormVisible = true;
      var _self = this;
      setTimeout(function () {
        _self.resetForm("unitForm");
      }, 100);
    },

    //表单操作
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.unitForm.cm_guid = JSON.parse(JSON.parse(getLocal("unitInfo"))).guid;
          // 新增居民信息
          addResident(this.unitForm)
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
              notice("error", "居民信息添加失败");
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

    // 修改信息表单
    submitRessidents() {
      modifyResidents(this.residentsForm)
        .then((res) => {
          notice("success", res.message);
          this.modify = false;
          this.getUnitList();
        })
        .catch((err) => {
          notice("error", "居民信息修改失败！");
        });
    },

    cancel() {
      this.modify = false;
    },

    getUnitList() {
      let param = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
      };
      getResidentsList(param)
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
@import "../../styles/personnel/index.less";
</style>


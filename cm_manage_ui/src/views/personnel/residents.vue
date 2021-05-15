<template>
  <div class="host-container">
    <el-card class="box-card">
      <div class="indicators">
        <span>数据指标</span>
        <el-button @click="viewList()" style="font-size: 16px" type="text"
          >查看居民列表</el-button
        >
      </div>
    </el-card>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <div style="text-align: center" slot="header" class="clearfix">
            <span>社区居民性别比例</span>
          </div>
          <resident-sex></resident-sex>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <div style="text-align: center" slot="header" class="clearfix">
            <span>社区居民年龄比例</span>
          </div>
          <resident-age></resident-age>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <div style="text-align: center" slot="header" class="clearfix">
            <span>社区居民社会身份比例</span>
          </div>
          <resident-id></resident-id>
        </el-card>
      </el-col>
    </el-row>

    <div class="separator" style="height: 30px"></div>

    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <div style="display: flex; justify-content: space-between">
          <div style="display: flex; align-items: center">
            <img
              src="../../assets/images/unit/TOP10.png"
              style="margin-right: 10px"
              alt=""
            />
            <span>社区居民活跃度</span>
          </div>
        </div>
      </div>
      <div class="block">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="index" label="排名" width="50">
          </el-table-column>
          <el-table-column prop="cm_residents_name" label="姓名">
          </el-table-column>
          <el-table-column prop="cm_residents_age" label="年龄">
          </el-table-column>
          <el-table-column prop="cm_residents_sex" label="性别">
            <template slot-scope="scope">
              {{ scope.row.cm_residents_sex == "1" ? "男" : "女" }}
            </template>
          </el-table-column>
          <el-table-column prop="cm_residents_place" label="籍贯">
          </el-table-column>
          <el-table-column prop="cm_residents_identity" label="身份">
            <template slot-scope="scope">
              {{
                scope.row.cm_residents_sex == "1" ? "社会工作者" : "学生或其他"
              }}
            </template>
          </el-table-column>
          <el-table-column prop="cm_residents_phone" label="联系方式">
          </el-table-column>
          <el-table-column prop="cm_residents_paticipate" label="参与次数">
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
                :type="
                  scope.row.cm_residents_state === '1' ? 'success' : 'danger'
                "
                disable-transitions
                >{{
                  scope.row.cm_residents_state == "1" ? "居住中" : "已搬离"
                }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getLocal } from "@/utils/handleCache";
import ResidentAge from "@/views/databoard/resident_age";
import ResidentSex from "@/views/databoard/resident_sex";
import ResidentId from "@/views/databoard/resident_id";
import { getResidentsRank } from "@/api/residents";
import { notice } from "@/utils/message";

export default {
  name: "databoard",
  components: {
    ResidentAge,
    ResidentSex,
    ResidentId,
  },
  data() {
    return {
      tableData: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
    };
  },
  created(){
    this.getUnitList();
  },
  methods: {
    viewList() {
      this.$router.push({ path: "/cm-residents/list" });
    },

    getUnitList() {
      let param = {
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
      };
      getResidentsRank(param)
        .then((res) => {
          console.log(res)
          this.tableData = res.data;
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


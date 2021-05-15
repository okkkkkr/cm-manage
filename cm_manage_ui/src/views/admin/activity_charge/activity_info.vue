<template>
  <div class="activity-container">
    <el-card class="box-card">
      <p>
        <i
          class="el-icon-s-operation"
          style="font-size: 20px; color: #409eff"
        ></i>
        <span class="activity-title">活动发布记录</span>
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
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 20px"></div>

    <div class="block" style="margin-top: 10px">
      <el-table :data="tableData" style="width: 100%; max-height: 500px" border>
        <el-table-column prop="ac_name" label="活动名称">
        </el-table-column>
        <el-table-column
          prop="ac_address"
          label="活动地址/地点"
        >
        </el-table-column>
        <el-table-column
          prop="ac_type"
          label="活动类型"
        >
        </el-table-column>
        <el-table-column
          prop="ac_sign_up"
          label="报名名额"
        >
        </el-table-column>
        <el-table-column
          prop="ac_fund"
          label="活动投入资金（元）"
        >
        </el-table-column>
        <el-table-column
          prop="ac_begin_time"
          label="活动开始时间"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="ac_end_time"
          label="活动结束时间"
          width="220"
        >
        </el-table-column>
        <el-table-column prop="ac_publish" label="当前状态">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag
                size="medium"
                :type="scope.row.ac_publish == '0' ? 'danger' : 'success'"
                >{{
                  scope.row.ac_publish == "1" ? "报名中" : "已截至"
                }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看详情</el-button
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
  </div>
</template>

<script>
import {getAllActivity} from '@/api/search'

export default {
  data() {
    return {
      currentPage: 1,
      tableData: [],
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
    };
  },
  created(){
    this.getUnitList();
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },

    getUnitList() {
      let param = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
      };
      getAllActivity(param)
        .then((res) => {
          this.tableData = res.data;
          this.page.total = res.total;
        })
        .catch((err) => {
          notice("error", "数据加载出错");
        });
    },

    handleClick(row) {
      let itemData = {
        ...row,
        ...this.itemInfo
      };
      console.log(itemData);
      setSession('AcDetail', JSON.stringify(itemData))
      this.$router.replace({ path: "activityInfo" });
    },

    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getUnitList();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getUnitList();
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../styles/admin/activity_info.less';
</style>
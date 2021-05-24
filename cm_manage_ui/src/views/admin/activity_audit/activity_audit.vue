<template>
  <div class="activity-container">
    <el-card class="box-card">
      <p>
        <i
          class="el-icon-user-solid"
          style="font-size: 20px; color: #409eff"
        ></i>
        <span class="host-title">活动审核</span>
      </p>
      <el-row :gutter="50">
        <el-col :span="4">
          <el-input
            placeholder="活动名称检索"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </el-col>
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
      </el-row>
    </el-card>

    <el-card class="host-list" shadow="hover">
      <el-table
        border
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'ac_begin_time', order: 'descending' }"
      >
        <el-table-column prop="ac_name" label="活动名称" width="200">
        </el-table-column>
        <el-table-column prop="ac_type" label="活动类型" sortable>
        </el-table-column>
        <el-table-column
          prop="ac_begin_time"
          label="开始时间"
          sortable
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="ac_end_time"
          label="结束时间"
          sortable
          width="200"
        >
        </el-table-column>
        <el-table-column prop="ac_contact_name" label="活动联系人">
        </el-table-column>
        <el-table-column prop="ac_contact_phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="ac_address" label="活动地址" width="220">
        </el-table-column>
        <el-table-column prop="audit_state" label="审核状态">
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.tag == '-1'
                  ? 'danger '
                  : scope.row.tag == '0'
                  ? 'warning'
                  : 'success'
              "
              disable-transitions
              >{{
                scope.row.tag == "-1"
                  ? "已拒绝 "
                  : scope.row.tag == "0"
                  ? "待审核"
                  : "已通过"
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
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
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next"
        :total="1"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input2: "",
      currentPage: 1,
      tableData: [
        {
          ac_name: "test1的活动",
          ac_type: "教育活动",
          ac_begin_time: "2021-05-11T06:00:00.000Z",
          ac_end_time: "2021-05-11T10:00:00.000Z",
          ac_contact_name: "张三",
          ac_contact_phone: "13169608945",
          ac_address: "test1的活动地址",
          audit_state: "0",
        },
      ],
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    handleClick(row) {
      console.log(row);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../styles/admin/activity_audit.less";
</style>
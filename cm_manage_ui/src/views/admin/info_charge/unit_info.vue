<template>
  <div class="host-container">
    <el-card class="box-card">
      <p>
        <i
          class="el-icon-user-solid"
          style="font-size: 20px; color: #409eff"
        ></i>
        <span class="host-title">承办方信息</span>
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

    <el-card class="host-list" shadow="hover">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="date" label="Guid" width="180">
        </el-table-column>
        <el-table-column prop="name" label="名称" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter">
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
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      tableData: [],
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
.host {
  &-container {
    background-color: #fdfdfd;
    min-height: 100vh;
    padding: 30px 100px;
  }
}

.host-title {
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.host-list {
  margin-top: 20px;
}
</style>
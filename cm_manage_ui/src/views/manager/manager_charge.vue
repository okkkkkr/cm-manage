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
        
      </el-row>
    </el-card>

    <el-card class="host-list" shadow="hover">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="id" label="管理者Id" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="120">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="120">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="120" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="level" label="职位/等级" width="120" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" width="180">
        </el-table-column>
        <el-table-column prop="card" label="身份证号" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >待审核</el-button
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
      input2:'',
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
  @import '../../styles/manager/manager_charge.less';
</style>
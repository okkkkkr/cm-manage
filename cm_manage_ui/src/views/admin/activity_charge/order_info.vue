<template>
  <div class="activity-container">
    <el-card class="box-card">
      <p>
        <i
          class="el-icon-s-operation"
          style="font-size: 20px; color: #409eff"
        ></i>
        <span class="activity-title">项目委托工单记录</span>
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

    <div class="block" style="margin-top: 20px">
      <el-table :data="tableData" style="width: 100%;" border>
        <el-table-column prop="ac_order_id" label="工单ID" width="300">
        </el-table-column>
        <el-table-column prop="ac_order_name" label="活动项目名称">
        </el-table-column>
        <el-table-column prop="cm_name" label="委托方">
        </el-table-column>
        <el-table-column prop="ht_name" label="受理方 ">
        </el-table-column>
        <el-table-column prop="ac_order_state" sortable label="工单状态">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag
                size="medium"
                :type="
                  scope.row.ac_order_state == '0'
                    ? 'danger'
                    : scope.row.ac_order_state == '2'
                    ? 'success'
                    : 'warning'
                "
                >{{
                  scope.row.ac_order_state == "1"
                    ? "审核中"
                    : scope.row.ac_order_state == "0"
                    ? "已拒绝"
                    : "已通过"
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
import { orderRecord } from "@/api/search";

export default {
  data() {
    return {
      currentPage: 1,
      input2:'',
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
      },
      tableData: [],
      finishedList: [
        {
          ac_order_id: "12345",
          ac_order_name: "活动工单8",
          detail: [
            {
              order_state: "0",
              order_submit_time: "2018/4/2 20:46",
              order_handler_name: "处理人",
            },
            {
              order_state: "12",
              order_submit_time: "2018/4/2 20:46",
              order_handler_name: "处理人",
            },
            {
              order_state: "21",
              order_submit_time: "2018/4/2 20:46",
              order_handler_name: "处理人",
            },
            {
              order_state: "31",
              order_submit_time: "2018/4/2 20:46",
              order_handler_name: "处理人",
            },
          ],
        },
      ],
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

    // 列表操作
    handleClick(row) {
      let itemData = {
        ...row,
      };
      this.$router.push({ name: "ItemInfo", params: itemData });
    },

    routerPush(pathName) {
      this.$router.push({ path: pathName });
    },

    getUnitList() {
      let param = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      };
      orderRecord(param).then(res => {
        this.tableData = res.data;
        this.page.total = res.total;
      })
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../styles/admin/order_info.less";
</style>
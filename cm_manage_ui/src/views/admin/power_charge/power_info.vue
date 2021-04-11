<template>
  <div class="power-container">
    <el-card class="box-card">
      <p>
        <i
          class="el-icon-info"
          style="font-size: 20px; color: #409eff"
        ></i>
        <span class="power-title">承办方权限</span>
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

    <div class="another-cont">
      <el-card class="box-card">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-s-home another-icon"></i
              ><span class="unit-info">北京理工大学珠海学院</span>
              <i style="margin-left: 50px;" class="el-icon-location another-icon"></i
              ><span class="unit-info">广东省珠海市香洲区金凤路10号</span>
            </template>
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
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
.power {
  &-container {
    background-color: #fdfdfd;
    min-height: 100vh;
    padding: 30px 100px;
  }
}

.power-title {
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.user-list {
  margin-top: 20px;
}

.another-cont {
  border-radius: 5px;
  padding: 10px;
  background-color: #f7f7f7;
  max-height: 400px;
  overflow-y: scroll;
  .another-icon {
    color: #409eff;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  }

  .unit-info{
    margin-left: 5px;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  }
}

.another-cont::-webkit-scrollbar {
  display: none;
}

/deep/.another-cont .el-card__body {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
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

    <div class="another-cont">
      <el-card class="box-card">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-s-home another-icon"></i
              ><span class="unit-info">唐家社区</span>

              <i  class="el-icon-link combine"></i>

              <i class="el-icon-s-home another-icon"></i
              ><span class="unit-info">北京理工大学珠海学院</span>

              <i style="margin-left: 80px;" class="el-icon-s-flag another-icon"></i
              ><span class="unit-info">暖冬计划</span>
            </template>
            <el-row >
              <el-col :span="4">
                <p>
                  审核人：<span class="another-details">张三</span>
                </p>
                <p>
                  提审时间：<span class="another-details">2018/4/2 20:46</span>
                </p>
              </el-col>
              <el-col :span="4">
                <p>
                  审核状态：<span class="another-details">已通过</span>
                </p>
                <p>
                  审核完成时间：<span class="another-details">2018/4/2 20:46</span>
                </p>
              </el-col>
              <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
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
.activity {
  &-container {
    background-color: #fdfdfd;
    min-height: 100vh;
    padding: 30px 100px;
  }
}

.activity-title {
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
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

  .combine{
    margin: 0 20px;
    color: #f06f58;
    font-size: 14px;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  }

  .another-details{
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
<template>
  <div class="host-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>关键指标</span>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">承办方总数</li>
              <li style="font-size: 24px; font-weight: bold">23</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px;">当前项目</li>
              <li class="choseItem">全部</li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <div class="host-member" v-for="item in hostList" :key="item.guid">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>{{ item.ht_name }}</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >查看详情</el-button
          >
        </div>
        <el-row>
          <el-col :span="3">
            <div class="host-detail">
              <div class="text item">
                <div class="demo-image">
                  <div class="block">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="item.ht_logo"
                      fit="fill"
                    ></el-image>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="21">
            <div class="host-detail">个体介绍</div>
          </el-col>
        </el-row>
      </el-card>
      <div class="separator" style="height: 30px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fund",
  data() {
    return {
      hostList: [
        {
          guid: "承办方guid",
          ht_name: "承办方名称",
          ht_address: "承办方地址",
          ht_introduce: "承办方介绍",
          ht_image: "",
          ht_logo:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=302487973,3701014649&fm=26&gp=0.jpg",
        },
        {
          guid: "承办方guid",
          ht_name: "承办方名称",
          ht_address: "承办方地址",
          ht_introduce: "承办方介绍",
          ht_image: "",
          ht_logo:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1697271975,1733929650&fm=26&gp=0.jpg",
        },
        {
          guid: "承办方guid",
          ht_name: "承办方名称",
          ht_address: "承办方地址",
          ht_introduce: "承办方介绍",
          ht_image: "",
          ht_logo:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2239203324,1371079426&fm=26&gp=0.jpg",
        },
        {
          guid: "承办方guid",
          ht_name: "承办方名称",
          ht_address: "承办方地址",
          ht_introduce: "承办方介绍",
          ht_image: "",
          ht_logo:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1400537201,154413284&fm=26&gp=0.jpg",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.host {
  &-container {
    background-color: #fdfdfd;
    min-height: 100vh;
    padding: 30px;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.indicators {
  ul {
    padding: 0;
    margin: 0;
    height: 60px;
  }

  li {
    list-style: none;
    line-height: 30px;
    text-align: center;
  }

  .choseItem {
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: #409eff
  }
}
</style>


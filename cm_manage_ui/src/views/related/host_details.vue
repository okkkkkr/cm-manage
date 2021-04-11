<template>
  <!-- 承办方详情 -->
  <div class="details-container">
    <el-card class="box-card">
      <el-row class="indicators">
        <el-col :span="3">
          <el-avatar
            shape="square"
            :size="100"
            fit="fill"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          ></el-avatar>
        </el-col>
        <el-col :span="21">
          <div class="unit-name">北理珠青年志愿者协会</div>
          <p class="unit-basic">
            <i class="el-icon-phone"></i>
            0756-7732832
          </p>
          <p class="unit-basic">
            <i class="el-icon-location"></i>
            广东省珠海市香洲区金凤路10号
          </p>
        </el-col>
      </el-row>

      <p>
        <i class="el-icon-chat-line-square"></i>
        承办方简介
      </p>
      <div class="ac-content" style="line-height: 24px">
        Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue
        被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，
        还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种
        支持类库结合使用时，Vue也完全能够为复杂的单页应用提供驱动。
      </div>

      <div class="separator" style="height: 20px"></div>

      <p>
        <i class="el-icon-picture-outline-round"></i>
        承办方图片介绍
      </p>

      <el-carousel :interval="3000" type="card">
          <el-carousel-item v-for="item in site" :key="item.location">
            <el-tooltip
              class="item"
              effect="light"
              :content="item.location"
              placement="top"
            >
              <img :src="item.src" :alt="item.location" />
            </el-tooltip>
          </el-carousel-item>
        </el-carousel>

      <el-row class="teamwork">
        <el-col :span="3">
          <i class="el-icon-data-analysis"></i>
          合作项目
        </el-col>
        <el-col :span="21" style="text-align: right">
          <div class="teamwork-item">进行中：</div>
          <span style="color: #409eff" class="teamwork-info">23</span>
          <div class="teamwork-item">已结束：</div>
          <span style="color: #409eff" class="teamwork-info">112</span>
          <div class="teamwork-item">当前查阅：</div>
          <el-dropdown @command="handleCommand" trigger="click">
            <span
              class="teamwork-info el-dropdown-link"
              :style="{
                color:
                  orderState == '进行中'
                    ? '#67C23A'
                    : orderState == '已结束'
                    ? '#E6A23C'
                    : '#409EFF',
              }"
            >
              {{ orderState }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="进行中">进行中</el-dropdown-item>
              <el-dropdown-item command="已结束">已结束</el-dropdown-item>
              <el-dropdown-item command="全部">全部</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>

      <div class="another-cont">
        <el-card class="box-card">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                审核日志<i class="header-icon el-icon-info another-icon"></i>
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

        <div class="separator" style="height: 10px"></div>

        <el-card class="box-card">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                物资清单<i class="header-icon el-icon-info another-icon"></i>
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

        <div class="separator" style="height: 10px"></div>

        <el-card class="box-card">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                流程清单<i class="header-icon el-icon-info another-icon"></i>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderState: "全部",
       site: [
        {
          location: "场地1",
          src:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=302487973,3701014649&fm=26&gp=0.jpg",
        },
        {
          location: "场地2",
          src:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1697271975,1733929650&fm=26&gp=0.jpg",
        },
        {
          location: "场地3",
          src:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2239203324,1371079426&fm=26&gp=0.jpg",
        },
        {
          location: "场地4",
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1400537201,154413284&fm=26&gp=0.jpg",
        },
      ],
    };
  },

  components: {},

  computed: {},

  methods: {
    handleCommand(command) {
      this.orderState = command;
    },
  },
};
</script>
<style lang='less' scoped>
.details {
  &-container {
    background-color: #fdfdfd;
    min-height: 100vh;
    padding: 30px 100px;
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
  .unit-name {
    font-size: 20px;
    font-weight: bold;
    margin-top: 15px;
    color: #303133;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .unit-basic {
    font-size: 14px;
  }

  .choseItem {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    color: #409eff;
  }
}

.Icon {
  margin-top: 50%;
  text-align: center;
}

.ac-content {
  font-weight: bold;
  color: #303133;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.teamwork {
  height: 30px;
  display: flex;
  align-items: center;
  margin: 50px 0 30px;

  .teamwork-item {
    font-size: 16px;
    display: inline-block;
    margin-left: 20px;
  }

  .teamwork-info {
    font-size: 16px;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
}

.another-cont {
  border-radius: 5px;
  padding: 10px;
  background-color: #f7f7f7;
  max-height: 400px;
  overflow-y: scroll;
}

.another-cont::-webkit-scrollbar {
  display: none;
}

.another-icon {
  color: #fc5531;
  margin-left: 5px;
}

/deep/.another-cont .el-card__body {
  padding-top: 0;
  padding-bottom: 0;
}

/deep/.el-collapse {
  border: none;
}
</style>
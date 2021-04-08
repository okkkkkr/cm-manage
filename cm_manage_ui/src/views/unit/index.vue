<template>
  <div class="unit-container">
    <div id="indicators-wrapper">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>个体简介</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >修改</el-button
          >
        </div>

        <el-row>
          <el-col :span="3">
            <div class="text item">
              <div class="demo-image">
                <div class="block">
                  <span class="demonstration">{{ fit }}</span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="headURL"
                    fit="fill"
                  ></el-image>
                </div>
              </div>
            </div>
          </el-col>

          <el-col :span="21"> 个体介绍 </el-col>
        </el-row>
      </el-card>

      <div class="separator" style="height: 30px"></div>

      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>关键指标</span>
        </div>
        <el-row>
          <el-col v-for="item in indicatorsList" :key="item.title" :span="6">
            <div class="indicators">
              <ul>
                <li style="font-size: 12px">{{ item.title }}</li>
                <li style="font-size: 24px; font-weight: bold">
                  {{ item.value }}
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <div class="separator" style="height: 30px"></div>

      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>活动场地介绍</span>
        </div>
        <div class="block">
          <el-carousel>
            <el-carousel-item v-for="item in site" :key="item.location" >
              <img :src="item.src" :alt="item.location">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { mapActions, mapMutations } from "vuex";
import subTitleBox from "../../components/plug/sub-title-box.vue";

export default {
  components: { subTitleBox },
  name: "Unit",
  computed: {},
  data() {
    return {
      name: "首页",
      userList: {},
      indicatorsList: [
        { title: "活动场次（已举办）", value: "213" },
        { title: "活动项目", value: "86" },
        { title: "社区居民", value: "668" },
        { title: "新的消息", value: "21" },
      ],
      headURL:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2572564972,1979933452&fm=26&gp=0.jpg",
      site:[
        {
          location:"场地1",
          src:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=302487973,3701014649&fm=26&gp=0.jpg"
        },
        {
          location:"场地2",
          src:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1697271975,1733929650&fm=26&gp=0.jpg"
        },
        {
          location:"场地3",
          src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2239203324,1371079426&fm=26&gp=0.jpg"
        },
        {
          location:"场地4",
          src:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1400537201,154413284&fm=26&gp=0.jpg"
        },
      ]
    };
  },
  created() {},
  methods: {
    ...mapActions("unit", ["TEST_AXIOS"]), // （param1: 路径，param2: 函数名）

    test() {
      const _self = this;
      this.TEST_AXIOS()
        .then((res) => {
          _self.name = "Finish Successful";
        })
        .catch((error) => {
          console.log(error);
          _self.name = "Finish But Failure";
        });
    },
  },
  mounted() {
    this.test();
  },
};
</script>

<style lang="less" scoped>
.unit {
  &-container {
    background-color: #fdfdfd;
    height: 100vh;
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

/deep/.el-card__header {
  background-color: #f7f7f7;
  padding: 10px 20px;
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
  }
}
</style>

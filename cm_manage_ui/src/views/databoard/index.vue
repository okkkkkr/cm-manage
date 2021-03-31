<template>
  <div class="dashboard-container">
    {{ name }}
    <el-row :gutter="20" class="board_wrapper">
      <el-col :span="18" class="content_wrapper">
        <div class="content_left" style="border: 1px solid red">
          <div id="minor_board">
            <el-row :gutter="20" class="board_wrapper">
              <el-col class="content_wrapper" :span="8">
                <sub-title-box style="border: 2px solid green" title="板块1" height="20%" size="big" weight="true" line="true">
                  <div slot="titleContent">
                    <span>3,524.42</span>
                    <span>↓</span>
                    <span>0.55%</span>
                  </div>
                  <div slot="mainContent" style="height:100%">
                    <img style="width: 100%; height: 100%;" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3445537515,3371307135&fm=26&gp=0.jpg" alt="">
                  </div>
                  
                </sub-title-box>
              </el-col>
              <el-col :span="8" class="content_wrapper">
                <sub-title-box style="border: 2px solid green" title="板块2" height="20%" size="big" weight="true">

                </sub-title-box>
              </el-col>
              <el-col :span="8" class="content_wrapper">
                <sub-title-box style="border: 2px solid green" title="板块3" height="20%" size="big" weight="true">

                </sub-title-box>
              </el-col>
            </el-row>
            
          </div>
          <div id="main_board" style="border: 1px solid blue">
            <sub-title-box style="border: 2px solid green" title="主视图" height="10%" size="big" weight="true">

            </sub-title-box>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="content_wrapper">
        <div class="content_right" style="border: 1px solid red">
          <div id="sider_top" style="border: 1px solid yellow"></div>
          <div class    ="dash_box" style="border: 1px solid green"></div>
          <div id="sider_down" style="border: 1px solid blue"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { mapActions, mapMutations } from "vuex";
import subTitleBox from "../../components/plug/sub-title-box.vue";

export default {
  components: { subTitleBox },
  name: "Databoard",
  computed: {},
  data() {
    return {
      name: "首页",
      userList: {},
    };
  },
  created() {},
  methods: {
    ...mapActions("databoard", ["TEST_AXIOS"]), // （param1: 路径，param2: 函数名）

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
.dashboard {
  &-container {
    height: 100vh;
    margin: 30px;
  }
}

.board_wrapper,
.content_wrapper {
  height: 100%;
}

.content_left {
  height: 100%;
  #minor_board {
    height: 30%;
  }

  #main_board {
    height: 70%;
  }
}

.content_right {
  height: 100%;
  #sider_top {
    height: 39%;
  }

  .dash_box{
    height: 2%;
  }

  #sider_down {
    height: 59%;
  }
}
</style>

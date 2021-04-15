<template>
  <div class="unit-container">
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
        <el-col :span="6">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">活动场次（已举办）</li>
              <li style="font-size: 24px; font-weight: bold">
                213
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">活动项目</li>
              <li style="font-size: 24px; font-weight: bold">
                86
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">社区居民</li>
              <li style="font-size: 24px; font-weight: bold">
                686
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">新的消息</li>
              <li style="font-size: 24px; font-weight: bold">
                21
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>活动场地</span>
      </div>
      <div class="block">
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
      </div>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
          <span>管理员列表</span>
      </div>
      <div class="block">
        <el-table :data="tableData" style="width: 100%" height="500">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="管理员信息"></el-form-item>
                <el-form-item
                  v-for="item in props.row.activityList"
                  :key="item.guid"
                >
                  <el-row>
                    <el-col :span="6">
                      <span>{{ item.ac_name }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.ac_address }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.ac_begin_time }}</span>
                    </el-col>
                    <el-col :span="6"></el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="cm_residents_name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="cm_residents_age" label="年龄" width="120">
          </el-table-column>
          <el-table-column prop="cm_residents_sex" label="性别" width="120">
          </el-table-column>
          <el-table-column prop="cm_residents_place" label="籍贯" width="120">
          </el-table-column>
          <el-table-column
            prop="cm_residents_identity"
            label="职位"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="cm_residents_phone"
            label="联系方式"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="cm_residents_paticipate"
            label="身份证号"
            width="200"
          >
          </el-table-column>
          
        </el-table>
      </div>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
          <span>物资信息</span>
      </div>
      <div class="block">
        <el-table :data="tableData" style="width: 100%" height="500">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="管理员信息"></el-form-item>
                <el-form-item
                  v-for="item in props.row.activityList"
                  :key="item.guid"
                >
                  <el-row>
                    <el-col :span="6">
                      <span>{{ item.ac_name }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.ac_address }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.ac_begin_time }}</span>
                    </el-col>
                    <el-col :span="6"></el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="cm_residents_name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="cm_residents_age" label="年龄" width="120">
          </el-table-column>
          <el-table-column prop="cm_residents_sex" label="性别" width="120">
          </el-table-column>
          <el-table-column prop="cm_residents_place" label="籍贯" width="120">
          </el-table-column>
          <el-table-column
            prop="cm_residents_identity"
            label="职位"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="cm_residents_phone"
            label="联系方式"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="cm_residents_paticipate"
            label="身份证号"
            width="200"
          >
          </el-table-column>
          
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { mapActions, mapMutations } from "vuex";

export default {
  name: "Unit",
  computed: {},
  data() {
    return {
      name: "首页",
      userList: {},
      headURL:
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2572564972,1979933452&fm=26&gp=0.jpg",
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
      tableData: [
        {
          cm_residents_id: "201621323",
          cm_residents_name: "王小虎",
          cm_residents_age: "18",
          cm_residents_sex: "1",
          cm_residents_place: "广东珠海",
          cm_residents_phone: "12345678910",
          cm_residents_identity: "1",
          cm_residents_address: "广东省珠海市香洲区金凤路10号",
          cm_residents_paticipate: "5",
          cm_guid: "社区guid",
          activityList: [
            {
              guid: "12334142312",
              ac_name: "活动1",
              ac_address: "地址1",
              ac_begin_time: "时间1",
            },
            {
              guid: "12334142312",
              ac_name: "活动2",
              ac_address: "地址2",
              ac_begin_time: "时间2",
            },
            {
              guid: "12334142312",
              ac_name: "活动3",
              ac_address: "地址3",
              ac_begin_time: "时间3",
            },
            {
              guid: "12334142312",
              ac_name: "活动4",
              ac_address: "地址4",
              ac_begin_time: "时间4",
            },
            {
              guid: "12334142312",
              ac_name: "活动5",
              ac_address: "地址5",
              ac_begin_time: "时间5",
            },
          ],
        },
      ],
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

    // 列表操作
    handleClick(row) {
      console.log(row);
    },
  },
  mounted() {
    // this.test();
  },
};
</script>

<style lang="less" scoped>
.unit {
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
}

.place-pic {
  position: relative;
  .place-tips {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    background-color: #f7f7f7;
    opacity: 0.5;
  }
}

/deep/.el-card__header {
  background-color: #f7f7f7;
  padding: 10px 20px;
}

/deep/.el-carousel__container {
  margin-left: 5%;
}
</style>

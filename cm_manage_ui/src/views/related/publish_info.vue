<template>
  <div class="activity-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <div style="width: 100%; display: flex; align-items: center; justify-content: space-between;">
        <span>关键指标</span>
        <el-button type="text" style="font-size: 16px;">发起活动</el-button>
        </div>
      </div>
      <el-row class="">
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">活动总数</li>
              <li style="font-size: 24px; font-weight: bold">238</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">当前项目</li>
              <li>
                <el-dropdown @command="handleCommand" trigger="click">
                  <span
                    class="choseItem el-dropdown-link"
                    :style="{
                      color: publishState == '已发布' ? '#409EFF' : '#E6A23C',
                    }"
                  >
                    {{ publishState }}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="已发布">已发布</el-dropdown-item>
                    <el-dropdown-item command="审核中">审核中</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <div class="order-info">
      <span class="host">合作承办方</span>
      <span class="host-name">全部</span>
    </div>
    <div class="host-wrapper">
      <div class="host-member" v-for="item in activityList" :key="item.guid">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ item.ac_name }}</span>
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
                        :src="item.ac_image"
                        fit="fill"
                      ></el-image>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="21">
              <div class="host-detail">活动介绍</div>
            </el-col>
          </el-row>
        </el-card>
        <div class="separator" style="height: 30px"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fund",
  data() {
    return {
      publishState: "已发布",
      activityList: [
        {
          guid: "活动guid",
          ac_name: "活动名称",
          ac_address: "活动地址/地点",
          ac_begin_time: "活动开始时间",
          ac_end_time: "活动结束时间",
          ac_introduce: "介绍内容",
          ac_sign_up: "活动报名名额",
          ac_sign_up_ready: "活动已报名",
          ac_ht_contact: "活动负责人（承办方）",
          ac_cm_contact: "活动负责人（社区方）",
          ac_image:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=302487973,3701014649&fm=26&gp=0.jpg",
        },
        {
          guid: "活动guid",
          ac_name: "活动名称",
          ac_address: "活动地址/地点",
          ac_begin_time: "活动开始时间",
          ac_end_time: "活动结束时间",
          ac_introduce: "介绍内容",
          ac_sign_up: "活动报名名额",
          ac_sign_up_ready: "活动已报名",
          ac_ht_contact: "活动负责人（承办方）",
          ac_cm_contact: "活动负责人（社区方）",
          ac_image:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1697271975,1733929650&fm=26&gp=0.jpg",
        },
        {
          guid: "活动guid",
          ac_name: "活动名称",
          ac_address: "活动地址/地点",
          ac_begin_time: "活动开始时间",
          ac_end_time: "活动结束时间",
          ac_introduce: "介绍内容",
          ac_sign_up: "活动报名名额",
          ac_sign_up_ready: "活动已报名",
          ac_ht_contact: "活动负责人（承办方）",
          ac_cm_contact: "活动负责人（社区方）",
          ac_image:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2239203324,1371079426&fm=26&gp=0.jpg",
        },
        {
          guid: "活动guid",
          ac_name: "活动名称",
          ac_address: "活动地址/地点",
          ac_begin_time: "活动开始时间",
          ac_end_time: "活动结束时间",
          ac_introduce: "介绍内容",
          ac_sign_up: "活动报名名额",
          ac_sign_up_ready: "活动已报名",
          ac_ht_contact: "活动负责人（承办方）",
          ac_cm_contact: "活动负责人（社区方）",
          ac_image:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1400537201,154413284&fm=26&gp=0.jpg",
        },
      ],
    };
  },
  methods: {
    handleCommand(command) {
      this.publishState = command;
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../styles/related/publish_info.less';
</style>


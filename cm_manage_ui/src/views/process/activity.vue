<template>
  <div class="activity-container">
    <div class="activity-info">
      <span class="activity-status">执行中</span>
      <span class="activity-nums">12</span>
      <div class="activity-item" style="margin-left: 50px;">
        合作承办方: <span class="item-name">全部</span>
      </div>
      <div class="activity-item">
        当前项目: <span class="item-name">全部</span>
      </div>
    </div>
    <div class="ongoing">
      <div class="ongoing-member" v-for="item in hostList" :key="item.guid">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ item.ht_name }}</span>
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

    <div class="separator" style="height: 50px"></div>

    <div class="activity-info">
      <span class="activity-status">已结束</span>
      <span class="activity-nums">12</span>
      <div class="activity-item" style="margin-left: 50px;">
        合作承办方: <span class="item-name">全部</span>
      </div>
      <div class="activity-item">
        当前项目: <span class="item-name">全部</span>
      </div>
    </div>
    <div class="finished">
      <div class="finished-member" v-for="item in hostList" :key="item.guid">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ item.ht_name }}</span>
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
  @import '../../styles/process/activity.less';
</style>


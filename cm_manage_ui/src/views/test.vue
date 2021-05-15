<template>
  <div class="activity-container">
    <div class="activity-info">
      <span class="activity-status">活动列表</span>
      <span class="activity-nums">12</span>
    </div>
    <div class="ongoing">
      <div class="ongoing-member" v-for="(item,index) in hostList" :key="item.guid">
        <el-card class="box-card" shadow="hover" style="cursor: pointer;" @click.native.prevent="viewDetails(index)">
          <div slot="header" class="clearfix">
            <span>{{ item.ac_name }}</span>
          </div>
          <el-row>
            <el-col :span="3">
              <div class="host-detail">
                <div class="text item">
                  <div class="demo-image">
                    <div class="block">
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="JSON.parse(item.ac_image)[0]"
                        fit="fill"
                      ></el-image>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="21">
              <div class="detail-wrapper">
                <div class="host-detail">活动地址：{{ item.ac_address }}</div>
                <div class="host-detail">活动时间：<span style="color: #409EFF;"> {{ item.ac_begin_time }}</span> 至 <span style="color: #409EFF;">{{ item.ac_end_time }} </span></div>
                <div class="host-detail">报名情况：<span :style="{color: item.ac_sign_up_ready/item.ac_sign_up < 0.5 ? '#409EFF':'#E6A23C'}"> {{ item.ac_sign_up_ready }}</span> / <span>{{ item.ac_sign_up }}</span></div>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <div class="separator" style="height: 30px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { testGetActivity } from '@/api/test'
import { setSession } from "@/utils/handleCache";
export default {
  name: "Test",
  data() {
    return {
      hostList: [],
    };
  },
  created(){
    testGetActivity().then(res => {
      this.hostList = res.data
    })
  },
  methods: {
    viewDetails(index){
      this.$router.push({ name: "ActivityDetails", params: this.hostList[index] });
    }
  },
};
</script>

<style lang="less" scoped>
  .activity {
    &-container {
      background-color: #fdfdfd;
      min-height: 90vh;
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
  
    .choseItem {
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
      color: #409eff;
    }
  }
  
  .activity-info {
    font-size: 20px;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    width: 100%;
    .activity-nums {
      margin-left: 20px;
      color: #409eff;
    }
  
    .activity-item {
      float: right;
      .item-name {
        color: #409eff;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  
  .ongoing,
  .finished {
    max-height: 90vh;
    overflow-y: scroll;
    background-color: #F7F7F7;
    padding: 20px;
    border-radius: 5px;
  }
  
  .ongoing::-webkit-scrollbar,
  .finished::-webkit-scrollbar {
    display: none;
  }

  .detail-wrapper{
    line-height: 30px;
  }
</style>


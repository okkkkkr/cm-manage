<template>
  <div class="inform-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>关键指标</span>
      </div>
      <el-row class="">
        <el-col :span="8">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">消息总数</li>
              <li style="font-size: 24px; font-weight: bold">238</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">当前查阅</li>
              <li>
                <el-dropdown @command="handleCommand" trigger="click">
                  <span
                    class="choseItem el-dropdown-link"
                    :style="{
                      color: viewState == '已查阅' ? '#67C23A' : '#E6A23C',
                    }"
                  >
                    {{ viewState }}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="已查阅">已查阅</el-dropdown-item>
                    <el-dropdown-item command="未查阅">未查阅</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="indicators">
            <ul>
              <li style="font-size: 12px">未读消息</li>
              <li style="font-size: 24px; font-weight: bold; color: #409eff">
                23
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <div class="inform-box">
      <div class="inform-item" v-for="(item, index) in informList" :key="item.inform_id">
        <el-card class="box-card">
          <div slot="header" class="clearfix" >
            <span>活动工单进度通知</span>
            <el-popconfirm :title="item.inform_state == 0 ? '是否修改状态为已读？':'是否修改状态为未读？'" @onConfirm="confirmState(index)">
            <i :style="{color: item.inform_state == 0 ? '#409EFF':'#67C23A'}" slot="reference" class="el-icon-message-solid switch-state"></i>
            </el-popconfirm>
          </div>
          <div class="inform-content" style="cursor: pointer;" @click="informJump()">
            <p>发送人：<span style="font-weight: bold;">{{ item.inform_person }}</span></p>
            <p>通知方：<span style="font-weight: bold;">{{ item.inform_sender }}</span></p>
            <p>通知内容：<span style="font-weight: bold;">{{ item.inform_content }}</span></p>
            <p><span style="color: #409EFF;font-weight: bold;">{{ item.inform_time }}</span></p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {getInform, updateInform, getInformList} from '@/api/inform'
import { getLocal } from "@/utils/handleCache";
import { notice } from "@/utils/message";

export default {
  name: "Fund",
  data() {
    return {
      viewState: "未查阅",
      informList: [
        {
          inform_id: "123",
          inform_person: "张三",
          inform_sender: "通知发出方id",
          inform_receiver: "通知接收id",
          inform_content: "通知内容",
          inform_time: "2018/4/2 20:46",
          inform_state: '0'
        },
        {
          inform_id: "1234",
          inform_person: "张三",
          inform_sender: "通知发出方id",
          inform_receiver: "通知接收id",
          inform_content: "通知内容",
          inform_time: "2018/4/2 20:46",
          inform_state: '0'
        },
        {
          inform_id: "1235",
          inform_person: "张三",
          inform_sender: "通知发出方id",
          inform_receiver: "通知接收id",
          inform_content: "通知内容",
          inform_time: "2018/4/2 20:46",
          inform_state: '0'
        },
        {
          inform_id: "1236",
          inform_person: "张三",
          inform_sender: "通知发出方id",
          inform_receiver: "通知接收id",
          inform_content: "通知内容",
          inform_time: "2018/4/2 20:46",
          inform_state: '0'
        },
        {
          inform_id: "1237",
          inform_person: "张三",
          inform_sender: "通知发出方id",
          inform_receiver: "通知接收id",
          inform_content: "通知内容",
          inform_time: "2018/4/2 20:46",
          inform_state: '0'
        },
        {
          inform_id: "1238",
          inform_person: "张三",
          inform_sender: "通知发出方id",
          inform_receiver: "通知接收id",
          inform_content: "通知内容",
          inform_time: "2018/4/2 20:46",
          inform_state: '0'
        },
      ],
    };
  },

  created(){
    this.getMessage('0')
  },
  methods: {
    handleCommand(command) {
      this.viewState = command;
      if(command == '已查阅'){
        this.getMessage('1')
      }else{
        this.getMessage('0')
      }
    },

    getMessage(state){
      getInform({
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
        role: JSON.parse(getLocal("role")),
        state: state
        }).then(res => {
        this.informList = res.data;
      })
    },

    getAllMessageNum(){
      getInformList({
        guid: JSON.parse(JSON.parse(getLocal("unitInfo"))).guid,
        role: JSON.parse(getLocal("role")),
      }).then(res => {
        this.allMessageNum = res.data.length;
      })
    },

    //切换阅读状态
    confirmState(index){
        this.informList[index].inform_state = this.informList[index].inform_state == '0' ? '1':'0';
        updateInform({
          inform_id: this.informList[index].inform_id,
          inform_state: this.informList[index].inform_state
        }).then(res => {
          if(this.informList[index].inform_state == '0'){
            notice('sucess',`${this.informList[index].inform_id}状态切换为已读！`)
          }else{
            notice('sucess',`${this.informList[index].inform_id}状态切换为未读！`)
          }
        })
    },

    informJump(){
      this.$router.push({path: '/process/order'})
    }
  },
};
</script>

<style lang="less" scoped>
  @import '../../styles/related/my_inform.less';
</style>


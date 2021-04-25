<template>
  <!-- 修改个人信息 -->
  <div class="details-container">
    <el-card class="box-card">
      <el-row class="indicators">
        <el-col :span="2">
          <el-avatar
            v-if="logo !=''"
            shape="square"
            :size="100"
            fit="fill"
            :src="logo"
          ></el-avatar>

          <el-upload
            v-else
            style="width: 100%;"
            :action="baseAction + '/api/upload/image'"
            :data="attachedLogo"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

        </el-col>
        <el-col :span="21">
          <div class="unit-name">{{unitInfo.name}}</div>
          <div class="unit-basic">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input
                  placeholder="请输入联系方式"
                  v-model="unitInfo.phone"
                  clearable
                  suffix-icon="el-icon-phone"
                >
                </el-input
              ></el-col>
              <el-col :span="12"
                ><el-input
                  placeholder="请输入地址"
                  v-model="unitInfo.location"
                  clearable
                  suffix-icon="el-icon-location"
                >
                </el-input
              ></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <p style="margin-top: 30px">
        <i class="el-icon-chat-line-square"></i>
        承办方简介
      </p>
      <div class="ac-content" style="line-height: 24px">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="unitInfo.introduce"
          maxlength="200"
          show-word-limit
        >
        </el-input>
      </div>

      <div class="separator" style="height: 20px"></div>
      <el-row style="height: 220px">
        <el-col :span="20">
          <p>
            <i class="el-icon-picture-outline-round"></i>
            承办方图片介绍<span style="color: #409eff; font-weight: bold"
              >（图片不可超过5张）</span
            >
          </p>
          <el-upload
            ref="upload"
            class="upload-demo"
            :action="baseAction + '/api/upload/image'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            :auto-upload="true"
            :data="attachedInd"
            :before-remove="beforeRemove"
            :on-success="handleIndSuccess"
            :limit='5'
          >
            <el-button slot="trigger" size="middle" type="primary"
              >点击上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且图片大小不超过2M / 张
            </div>
          </el-upload>
        </el-col>
        <el-col :span="4" class="submit-btn">
          <el-button @click="submitForm()" type="primary">提交</el-button>
          <el-button type="danger">取消</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getLocal,setLocal } from "../../utils/handleCache";
import { delFiles } from "@/api/files";
import { modifyInfo } from "@/api/user"
import { notice } from "../../utils/message";

export default {
  data() {
    return {
      orderState: "全部",
      unitInfo: {
        guid:"",
        name:"",
        location: "",
        phone: "",
        introduce:"",
        role:""
      },
      attachedLogo: {
        _id: JSON.parse(JSON.parse(getLocal("unitInfo"))).cm_account,
        type:"logo",
        role: JSON.parse(getLocal("role"))
      },
      attachedInd: {
        _id: JSON.parse(JSON.parse(getLocal("unitInfo"))).cm_account,
        type:"introduce",
        role: JSON.parse(getLocal("role"))
      },
      logo:"",
      fileList: [],
    };
  },

  components: {},

  computed: {
    ...mapGetters(["baseAction"]),
  },

  mounted() {
    this.setInfo();
    this.setFileList();
  },

  methods: {
    handleRemove(file, fileList) {
      delFiles({
        fileName: file.name,
        _id: this.attachedInd._id,
      })
        .then((res) => {
          console.log("111111",res)
          notice("success", res.message);
          console.log(res)
          setLocal('unitInfo', JSON.stringify(res.data[0]));
        })
        .catch((err) => {
          notice("error", res.message);
        });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handlePreview(file) {
      console.log(file);
    },

    handleAvatarSuccess(res, file){
      this.logo = res.data
      setLocal('unitInfo', JSON.stringify(res.data[0]));
      this.logo = res.data[0].cm_logo
    },
    handleIndSuccess(res, file){
      console.log("res",res.data[0])
      setLocal('unitInfo', JSON.stringify(res.data[0]));
    },

    setInfo(){
      let info = JSON.parse(JSON.parse(getLocal('unitInfo')));
      let role = JSON.parse(getLocal('role'))
      this.unitInfo.guid = info.guid
      this.unitInfo.name = role == 'cm' ? info.cm_name : info.ht_name
      this.unitInfo.phone = role == 'cm' ? info.cm_phone : info.ht_phone
      this.unitInfo.location = role == 'cm' ? info.cm_address : info.ht_address
      this.unitInfo.introduce = role == 'cm' ? info.cm_introduce : info.ht_introduce
      this.logo = role == 'cm' ? info.cm_logo : info.ht_logo
    },

    setFileList(){
      let info = JSON.parse(JSON.parse(getLocal('unitInfo')));
      if(JSON.parse(getLocal('role')) == 'cm'){
        let imgList = JSON.parse(info.cm_image);
        imgList.forEach(item => {
          let num = item.split('/').length;
          let imgName = item.split('/')[num - 1];
          this.fileList.push({name: imgName, url: item});
        });
      }else{
        let imgList = JSON.parse(info.ht_image);
        imgList.forEach(item => {
          let num = item.split('/').length;
          let imgName = item.split('/')[num - 1];
          this.fileList.push({name: imgName, url: item});
        });
      }
    },

    submitForm(){
      this.unitInfo.role = JSON.parse(getLocal('role'));
      modifyInfo(this.unitInfo).then(res => {
        notice('success', res.message);
        this.$router.push({path: '/unit'})
      }).catch(err => {
        notice('error', "服务器出错，修改信息失败！")
      })
    }

  },
};
</script>
<style lang='less' scoped>
  @import url('../../styles/unit/unit_details.less');
</style>
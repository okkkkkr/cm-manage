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
          <div class="unit-name">北理珠青年志愿者协会</div>
          <div class="unit-basic">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input
                  placeholder="请输入联系方式"
                  v-model="phone"
                  clearable
                  suffix-icon="el-icon-phone"
                >
                </el-input
              ></el-col>
              <el-col :span="12"
                ><el-input
                  placeholder="请输入地址"
                  v-model="location"
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
          v-model="introduce"
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
              >（图片3~5张）</span
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
          >
            <el-button slot="trigger" size="middle" type="primary"
              >点击上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-col>
        <el-col :span="4" class="submit-btn">
          <el-button type="primary">提交</el-button>
          <el-button type="danger">取消</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getLocal } from "../../utils/handleCache";
import { delFiles } from "@/api/files";
import { notice } from "../../utils/message";

export default {
  data() {
    return {
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
      fileList: [
        // {
        //   name: "a83a4c9603c4439938bba14a49d7aca.png",
        //   url:
        //     "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=302487973,3701014649&fm=26&gp=0.jpg",
        // },
        // {
        //   name: "login_bc.png",
        //   url:
        //     "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2239203324,1371079426&fm=26&gp=0.jpg",
        // },
      ],
      orderState: "全部",
      location: "广东省珠海市香洲区金凤路10号",
      phone: "0756-7732832",
      introduce:
        "Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue也完全能够为复杂的单页应用提供驱动。",
      site: [
        {
          src:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=302487973,3701014649&fm=26&gp=0.jpg",
        },
        {
          src:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1697271975,1733929650&fm=26&gp=0.jpg",
        },
        {
          src:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2239203324,1371079426&fm=26&gp=0.jpg",
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1400537201,154413284&fm=26&gp=0.jpg",
        },
      ],
      siteList: [
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=302487973,3701014649&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1697271975,1733929650&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2239203324,1371079426&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1400537201,154413284&fm=26&gp=0.jpg",
      ],
    };
  },

  components: {},

  computed: {
    ...mapGetters(["baseAction"]),
  },

  methods: {
    handleRemove(file, fileList) {
      delFiles({
        fileName: file.name,
        _id: this.attachedInd._id,
      })
        .then((res) => {
          notice("success", res.message);
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
    }
  },
};
</script>
<style lang='less' scoped>
  @import url('../../styles/unit/unit_details.less');
</style>
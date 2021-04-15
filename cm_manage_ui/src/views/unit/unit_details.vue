<template>
  <!-- 修改个人信息 -->
  <div class="details-container">
    <el-card class="box-card">
      <el-row class="indicators">
        <el-col :span="2">
          <el-avatar
            shape="square"
            :size="100"
            fit="fill"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          ></el-avatar>
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
      <el-row style="height: 220px;">
        <el-col :span="20">
          <p>
            <i class="el-icon-picture-outline-round"></i>
            承办方图片介绍<span style="color: #409eff; font-weight: bold"
              >（图片3~5张）</span
            >

            <el-upload
              style="margin-top: 20px"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </p>
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
export default {
  data() {
    return {
      orderState: "全部",
      location: "广东省珠海市香洲区金凤路10号",
      phone: "0756-7732832",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
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

  computed: {},

  methods: {
    handleCommand(command) {
      this.orderState = command;
    },

    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
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
    margin-top: 20px;
    width: 50%;
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

.imgWrapper {
  width: 100px;
  height: 100px;
  margin-left: 10px;
  border-radius: 5px;
}

.submit-btn{
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

/deep/.another-cont .el-card__body {
  padding-top: 0;
  padding-bottom: 0;
}

/deep/.el-collapse {
  border: none;
}
</style>
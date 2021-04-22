<template>
  <div style="width: 500px; height: 300px; margin: 20px auto">
    <el-upload
      ref="upload"
      class="upload-demo"
      :action="baseAction + '/api/upload/image'"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
      :auto-upload="false"
      :data="attached"
    >
      <el-button slot="trigger" size="middle" type="primary"
        >点击上传</el-button
      >
      <el-button
        style="margin-left: 10px"
        size="middle"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>

    <!-- <button @click="start()">开始</button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import {open} from '../api/login';

export default {
  data() {
    return {
      attached:{
        type:"logo",
        _id:"uuid125"
      },
      fileList: [
        // {
        //   name: "",
        //   url:"",
        // }
      ],
    };
  },
  computed: {
    ...mapGetters(["baseAction"]),
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    submitUpload() {
      this.$refs.upload.submit();
    },

    start(){
      open();
    }
  },
};
</script>
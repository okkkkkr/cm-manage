<template>
  <!-- 活动详情 -->
  <div class="details-container">
    <el-row>
  <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
    <el-card class="box-card">
      <el-row>
        <el-col :span="11">
          <div class="indicators">
            <ul>
              <li>
                <el-avatar
                  shape="square"
                  :size="100"
                  fit="fill"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                ></el-avatar>
              </li>
              <li class="unit-name">广东省珠海市香洲区唐家社区</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="Icon">
            <div class="img-wrapper">
              <div class="dot"></div>
              <div class="wave"></div>
              <img
                src="../../../assets/images/activity_details/shakehands.png"
                alt=""
              />
            </div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="indicators">
            <ul>
              <li>
                <el-avatar
                  shape="square"
                  :size="100"
                  fit="fill"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                ></el-avatar>
              </li>
              <li class="unit-name">北理珠青年志愿者协会</li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card class="box-card">
      <p>
        <i class="el-icon-time"></i>
        活动时间：<span style="color: #409eff" class="ac-content"
          >2018/4/2 20:46</span
        >
        &nbsp;<span class="ac-content">至</span>&nbsp;
        <span style="color: #409eff" class="ac-content">2018/4/2 20:46</span>
      </p>
      <el-row class="activity_basic">
        <el-col :span="8">
          <p>
            <i class="el-icon-document"></i>
            活动名称：<span class="ac-content">XXX活动</span>
          </p>
          <p style="padding-top: 15px">
            <i class="el-icon-suitcase"></i>
            依托项目：<span class="ac-content">XXX活动</span>
          </p>
        </el-col>
        <el-col :span="8">
          <p>
            <i class="el-icon-place"></i>
            活动地点：<span class="ac-content">XXX小区</span>
          </p>
          <p style="padding-top: 15px">
            <i class="el-icon-user"></i>
            负责人（社区方）：<span class="ac-content">XXX</span>
          </p>
        </el-col>
        <el-col :span="8">
          <p>
            <i class="el-icon-loading"></i>
            发布状态：<span class="ac-content">XXX广场</span>
          </p>
          <p style="padding-top: 15px">
            <i class="el-icon-user"></i>
            负责人（承办方）：<span class="ac-content">XXX</span>
          </p>
        </el-col>
      </el-row>
      <p>
        <i class="el-icon-data-analysis"></i>
        活动内容
      </p>
      <div class="ac-content" style="line-height: 24px">
        Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue
        被设计为可以自底向上逐层应用。Vue
        的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue
        也完全能够为复杂的单页应用提供驱动。
      </div>

      <el-row class="signUp">
        <el-col :span="3"> <i class="el-icon-data-line"></i> 报名进度 </el-col>
        <el-col :span="18">
          <div>
            <el-progress
              :text-inside="true"
              :stroke-width="24"
              :percentage="40"
              status="success"
            ></el-progress>
          </div>
        </el-col>
        <el-col :span="3" style="text-align: center">
          <span class="ac-content">40</span>
          <span class="ac-content"> / </span>
          <span class="ac-content">100</span>
        </el-col>
      </el-row>
    </el-card>

    <div class="separator" style="height: 30px"></div>
    <div class="another-cont">
      <el-card class="box-card">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              审核日志<i class="header-icon el-icon-info another-icon"></i>
            </template>
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <div class="separator" style="height: 10px"></div>

      <el-card class="box-card">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              物资清单<i class="header-icon el-icon-info another-icon"></i>
            </template>
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      <div class="separator" style="height: 10px"></div>

      <el-card class="box-card">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              流程清单<i class="header-icon el-icon-info another-icon"></i>
            </template>
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang='less' scoped>
@import "../../../styles/admin/activity_details.less";
</style>
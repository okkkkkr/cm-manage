<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import SubTitleBox from '../src/components/plug/sub-title-box'

// 全局注册模块
Vue.component('sub-title-box', SubTitleBox);

export default {
  name: 'App'
}
</script>


<template>
  <div class="sub_title_box_wrapper">
    <div class="sub_title_box" :class="[line == 'true' ? 'divider' : '']" :style="{ height: height}">
      <div :style="{ width: width }" class="sub_title"
        :class="[ weight == 'true' ? 'boldWeight' : '',size == 'big'? 'bigSize': size == 'middle'? 'middleSize': 'smallSize']" >
        {{ title }}
      </div>
      
      <!-- 标题内容 -->
      <div class="title_content" :style="{ width: Width }">
         <slot name="titleContent"></slot>
      </div>
      
    </div>

    <!-- 主内容 -->
    <div class="sub_title_box_content" :style="{ height: Height }">
       <div class="main_content">
          <slot name="mainContent"></slot>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题区域'
    },

    size: {
      type: String,
      default: "middle",
    },

    width: {
      type: String,
      default: "30%",
    },

    height: {
      type: String,
      default: "100%",
    },

    weight: {
      type: String,
      default: 'true',
    },
    line: {
       type: String,
       default: 'false'
    }
  },
  data() {
    return {
       Height:"",
       Width:""
    };
  },

  components: {},

  computed: {},

  methods: {},

  mounted(){
     this.Height = (1 - (parseInt(this.height)/100))*100 + "%"
     this.Width = (1 - parseInt(this.width)/100)*100 + "%"
     console.log(this.Width)
  }
};
</script>
<style lang='less' scoped>
.sub_title_box_wrapper {
  width: 100%;
  height: 100%;
  padding: 0 15px 15px 15px;
}

.sub_title_box_content {
   padding-top: 15px;
  .main_content{
     height: 100%;
  }
}

.sub_title_box {
  display: flex;
  align-items: center;
  
  .sub_title,
  .title_content {
    display: inline-block;
  }
  .title_content{
     text-align: right;
  }
}

.bigSize {
  font-size: 18px;
}

.middleSize {
  font-size: 14px;
}

.smallSize {
  font-size: 12px;
}

.boldWeight {
  font-weight: bold;
}

.divider{
   border-bottom: 1px solid #888888;
}
</style>
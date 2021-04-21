<template>
  <div class="login-container">
    <video src="../../assets/bg.mp4" loop muted autoplay id="bg-video"></video>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">活动综合管理与服务</h3>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="账号"
          name="account"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        id="SUBMIT"
        :loading="loading"
        type="success"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登 录</el-button
      >

      <div class="tips">智慧社区不是喊口号，落地才是硬道理！</div>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { notice } from "@/utils/message";
import { getLocal } from "@/utils/handleCache";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
      },
      loginRules: {
        account: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  computed: {},
  methods: {
    ...mapActions("global", ["LOGIN", "GET_INFO"]),

    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    // 登录
    handleLogin() {
      var role = JSON.parse(getLocal("role"));
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.LOGIN(this.loginForm).then((response) => {
            if (response == 'TokenPass') {
              if (role != "ad") {
                this.$router.push({ path: "/unit" });
              } else {
                this.$router.push({ path: "/ad-audit/index" });
              }
            } else {
              this.GET_INFO(response).then((res) => {
                notice("success", "登录成功");
                if (role != "ad") {
                  this.$router.push({ path: "/unit" });
                } else {
                  this.$router.push({ path: "/ad-audit/index" });
                }
              });
            }
          });
        } else {
          notice("warning", "请填写用户名及密码");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;

#bg-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  background: url("../../assets/images/login_bc.png") no-repeat;
  background-size: cover;
}

.login-container {
  min-height: 100%;
  width: 100%;
  // background: url("../../assets/images/login_bc.png") no-repeat;
  // background-size: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
    letter-spacing: 2px;
    z-index: 999;
    animation: tipsBreath 2s ease-in-out infinite alternate;
  }

  @keyframes tipsBreath {
    0% {
      color: rgba(218, 178, 115, 0);
    }
    100% {
      color: rgba(218, 178, 115, 1);
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

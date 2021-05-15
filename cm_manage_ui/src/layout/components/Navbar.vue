<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="logo" :src="logo" class="user-avatar" />
          <img v-else src="../../assets/images/admin.png" class="user-avatar" />
          <div class="account-info">
            <div class="role">
              {{ role || "管理员" }}
            </div>
            <div class="name">{{ name }}</div>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item divided> 注销登录 </el-dropdown-item>
          </router-link>
          <!-- <el-dropdown-item  @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { getLocal } from "@/utils/handleCache";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  data() {
    return {
      name:
        JSON.parse(JSON.parse(getLocal("unitInfo"))).cm_name ||
        JSON.parse(JSON.parse(getLocal("unitInfo"))).ht_name ||
        JSON.parse(JSON.parse(getLocal("unitInfo"))).admin_name,
      logo:
        JSON.parse(JSON.parse(getLocal("unitInfo"))).cm_logo ||
        JSON.parse(JSON.parse(getLocal("unitInfo"))).ht_logo,
      role:
        JSON.parse(getLocal("role")) == "cm"
          ? "社区方"
          : JSON.parse(getLocal("role")) == "ht"
          ? "承办方"
          : "管理员",
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    // async logout() {
    //   await this.$store.dispatch('user/logout')
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // }
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .account-info {
          display: inline-block;
          margin-left: 5px;

          .role {
            line-height: 25px;
            font-size: 16px;
            font-weight: bold;
          }

          .name {
            line-height: 20px;
          }
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

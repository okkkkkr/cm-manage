<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in filterMenu"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { getLocal } from "@/utils/handleCache";
export default {
  data() {
    return {
      filterMenu: [],
    };
  },
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },

  methods: {
    routes() {
      let routeList = this.$router.options.routes;
      var role = JSON.parse(getLocal("role"));

      // 根据用户过滤路由
      routeList.map((item, index) => {
        if (role == "ad") {
          if (item.meta.belong == 'ad') {
            this.filterMenu.push(item);
          }
        } else {
          if (item.meta.belong == role || item.meta.belong == "all") {
            this.filterMenu.push(item);
          }
        }
      });
    },
  },

  mounted() {
    this.routes();
  },
};
</script>

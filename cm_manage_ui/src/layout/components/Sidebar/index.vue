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
export default {
  data() {
    return {
      filterMenu: [],
      Auth: 'cm',
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
    routes(auth) {
      let routeList = this.$router.options.routes;
      console.log("routerList", routeList);
      // 根据用户过滤路由

      if (auth == "ad") {
        routeList.map((item, index) => {
          if (item.children) {
            if (item.children[0].meta.belong == 'ad') {
              this.filterMenu.push(item)
            }
          }
        });
      } else {
        routeList.map((item, index) => {
        if (item.children) {
          if(item.children[0].meta.belong == 'ad'){
            item.splice(index, 1)
          }else{
            for (let i = 0; i < item.children.length; i++) {
            if (item.children[i].meta.belong !== auth && item.children[i].meta.belong !== "all") {
              console.log("path",item.children[i].path)
              item.children.splice(i, 1);
            }
          }
          }
        }
        this.filterMenu.push(item);
      });
      }
    },
  },

  mounted() {
    this.routes(this.Auth);
  },
};
</script>

<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar.vue";

export default {
  name: "app",
  components: {
    MainTabBar,
  },
  methods: {
    reload() {
      this.isRouterAlive = falsethis.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>

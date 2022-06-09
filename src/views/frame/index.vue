<template>
  <div style="height: 100%;">
    <div name="header"
      style="background-color: rgb(0, 21, 41); display: flex; flex-direction: row; align-items: center; width: 100%;box-sizing: border-box;flex-shrink: 0;position: fixed; z-index: 1100;top: 0px;left: auto;right: 0px;">
      <logo-bar style="display: inline-block; padding-left: 10px; padding-right: 150px;" />
      <search-bar style="display: inline-block;  padding-right: 50px;" />
      <setting-bar
        style="display: flex; flex-direction: row; align-items: center; align-content:center; padding-left: 50px; background-color: seashell; border-radius: 30px; height: 50px; margin-right: 50px;" />
    </div>
    <a-layout-sider breakpoint="md" collapsed-width="0"
      style="position: fixed; height: 100%;top: 70px;transition: margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;">
      <side-bar />
    </a-layout-sider>
    <a-layout class="layout"
      :style="{ backgroundColor: 'rgb(227, 242, 253)', paddingLeft: layoutLeft, paddingTop: '75px', transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms' }"
      breakpoint="md" @onCollapse="onCollapse" @breakpoint="onBreakpoint">
      <a-layout-content style="padding: 20px;">
        <div style="background-color: #fff; padding: 24px; border-radius: 16px;">
          <router-view :fn="fn" :baseData="baseData" />
        </div>
        <a-layout-footer style="width:100%; background-color: rgb(227, 242, 253);">
          <footer-bar />
        </a-layout-footer>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup>
//模块引入
import { ref, defineComponent } from 'vue';
import logoBar from '@/views/frame/components/logobar.vue';
import searchBar from '@/views/frame/components/searchbar.vue';
import settingBar from '@/views/frame/components/settingbar.vue';
import sideBar from '@/views/frame/components/sidebar.vue';
import footerBar from '@/views/frame/components/footerbar.vue';
const props = defineProps({
  fn: Function,
  baseData: Object
})
const onBreakpoint = (broken) => {
  console.log('onBreakpoint', broken)
  layoutLeft.value = broken ? '0px' : '200px';
};
const onCollapse = (collapsed, type) => {
  console.log('collapsed', collapsed, type);
};
window.matchMedia('(max-width: 768px)').addEventListener('change', (e) => {
  e.matches ? onBreakpoint(true) : onBreakpoint(false);
});

</script>

<script>
//本地变量和函数
let layoutLeft = ref('200px');
export default defineComponent({
  name: "app",
  setup() {
    return {
      layoutLeft,
      onBreakpoint
    };
  }
});
</script>

<style>
html,
body,
#app {
  height: 100%;
  background-color: rgb(227, 242, 253);
}
</style>

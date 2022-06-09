<template>
  <a-menu v-model:selectedKeys="_home.selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1">
      <user-outlined />
      <span class="nav-text">nav 1</span>
    </a-menu-item>
    <a-menu-item key="2">
      <video-camera-outlined />
      <span class="nav-text">nav 2</span>
    </a-menu-item>
    <a-menu-item key="3">
      <upload-outlined />
      <span class="nav-text">nav 3</span>
    </a-menu-item>
    <a-menu-item key="4">
      <user-outlined />
      <span class="nav-text">nav 4</span>
    </a-menu-item>
  </a-menu>
</template>

<script setup>
import { reactive } from 'vue';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';
let _home = reactive({ name: '主页', selectedKeys: ['2'] });

const props = defineProps({
  fn: Function
})

function onHomeClick() {
  _home.name = _home.name === '主页' ? 'Home' : '主页';
  props.fn('点击了主页');
}
const onBreakpoint = broken => {
  console.log('onBreakpoint', broken)
};

const onCollapse = (collapsed, type) => {
  console.log('collapsed', collapsed, type);
};

</script>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
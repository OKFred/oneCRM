<template>
  <div style="height: 100%;">
    this is home
    <a-button type="primary" size="large" @click="this.$router.push('/setting')">
      go to settting
    </a-button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
let _home = reactive({ name: '主页', selectedKeys: ['2'] });

const props = defineProps({
  fn: Function
})

function onHomeClick() {
  _home.name = _home.name === '主页' ? 'Home' : '主页';
  props.fn('点击了主页');
}
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
</style>
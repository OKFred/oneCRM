
<template>
  Ant Design ©2022 Created by Ant UED, Modifed By Fred
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
<style>
</style>

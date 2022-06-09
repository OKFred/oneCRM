<template>
  <frameWork :fn="fn" :baseData="baseData" />
</template>

<script setup>
//模块引入
import { reactive } from 'vue';
import frameWork from '@/views/frame/index.vue';

//全局变量 & 函数
let baseData = reactive({ name: 'baseData', selectedKeys: ['2'] });
let name = 'fred';

function fn(str) {
  console.log(str);
  console.log(name);
};
</script>
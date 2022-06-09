<script setup>
//导入模块
//import HelloWorld from './components/HelloWorld.vue'
import Home from './view/home/index.vue'

//声明变量
let name = 'fred';

function fn (str) {
  console.log(str);
  console.log(name);
};

</script>

<template>
  <Home />
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" :name="name" :fn="fn" /> -->
</template>

<style>
html,body,#app {
  height: 100%;
  background-color: pink;
}
</style>

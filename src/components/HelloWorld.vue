<template>
  <div>
    <h1>{{ msg }} {{ name }}</h1>
    <button type="button" @click="count++">count is: {{ count }}</button>
    <br />
    <br /><a-checkbox :checked="count % 2 == 0 ? true : false ">Checkbox</a-checkbox>
    <br />
    <br /><a-button type="primary">Primary Button</a-button>
    <br /><a-button @click="fn(1)">Default Button</a-button>
    <br /><a-button type="dashed">Dashed Button</a-button>
    <br /><a-button type="text">Text Button</a-button>
    <br /><a-button type="link">Link Button</a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  msg: String,
  name: String,
  fn: Function,
})
const count = ref(0)
</script>

<style scoped>
a {
  color: #42b983;
}
</style>

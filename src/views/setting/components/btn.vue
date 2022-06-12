<template>
    <div>
        <button type="button" @click="count++">count is: {{ count }}</button>
        <br />
        <br />
        <a-checkbox :checked="count % 2 == 0 ? true : false">Checkbox</a-checkbox>
        <br />
        <br />
        <a-button type="primary">Primary Button</a-button>
        <br />
        <a-button @click="">Default Button</a-button>
        <br />
        <a-button @click="showGlobal" type="dashed">Dashed Button</a-button>
        <br />
        <a-button type="text">Text Button</a-button>
        <br />
        <a-button type="link">Link Button</a-button>
    </div>
</template>

<script setup>
//模块引入
import { ref } from 'vue'

//父系入参
let props = defineProps({
    globalObj: Object,
})

//本地变量
const count = ref(0)

//本地函数
function showGlobal() {
    console.log(props.globalObj)
}
</script>

<style scoped>
a {
    color: #42b983;
}
</style>

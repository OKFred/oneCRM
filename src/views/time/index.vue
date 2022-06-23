<template>
    <div>
        <a-typography-title :level="3" style="padding-bottom: 1rem"
            >时间管理
        </a-typography-title>
        <todoList :globalObj="globalObj" :localObj="localObj" />
    </div>
</template>

<script setup>
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/time/languages.js'
import todoList from '@/views/time/components/todoList.vue'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({
    name: 'time',
    todoToday: [],
    newTodo: false,
})

const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

onUpdated(() => {
    console.log('time: onUpdated')
})
onMounted(() => {
    console.log('time: onMounted')
})
onActivated(() => {
    console.log('time: onActivated')
})
onDeactivated(() => {
    console.log('time: onDeactivated')
})
</script>

<style></style>

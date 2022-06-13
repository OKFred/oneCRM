<template><div>This is order.</div></template>

<script setup>
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/order/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({ name: 'order' })

const langPack = computed(() => {
    return languages[props.globalObj.locale]
})

onUpdated(() => {
    console.log('order: onUpdated')
})
onMounted(() => {
    console.log('order: onMounted')
})
onActivated(() => {
    console.log('order: onActivated')
})
onDeactivated(() => {
    console.log('order: onDeactivated')
})
</script>

<style>
</style>

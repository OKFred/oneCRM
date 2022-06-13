<template><div>This is customer.</div></template>

<script setup>
//模块引入
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/customer/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({ name: 'customer' })

const langPack = computed(() => {
    return languages[props.globalObj.locale]
})

onUpdated(() => {
    console.log('customer: onUpdated')
})
onMounted(() => {
    console.log('customer: onMounted')
})
onActivated(() => {
    console.log('customer: onActivated')
})
onDeactivated(() => {
    console.log('customer: onDeactivated')
})
</script>

<style>
</style>

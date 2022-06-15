<template><div>This is Revenue. Always look for a higher performance.</div></template>

<script setup>
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/revenue/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({ name: 'revenue' })

const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

onUpdated(() => {
    console.log('revenue: onUpdated')
})
onMounted(() => {
    console.log('revenue: onMounted')
})
onActivated(() => {
    console.log('revenue: onActivated')
    showModal(false,'this page is under construction...');
})
onDeactivated(() => {
    console.log('revenue: onDeactivated')
})
</script>

<style></style>

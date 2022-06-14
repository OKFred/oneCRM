<template><div>This is Profile.</div></template>

<script setup>
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/profile/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({ name: 'profile' })

const langPack = computed(() => {
    return languages[props.globalObj.locale]
})

onUpdated(() => {
    console.log('profile: onUpdated')
})
onMounted(() => {
    console.log('profile: onMounted')
})
onActivated(() => {
    console.log('profile: onActivated')
})
onDeactivated(() => {
    console.log('profile: onDeactivated')
})
</script>

<style></style>

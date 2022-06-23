<template>
    <div>
        <h3>客户管理</h3>
        <customerTable :globalObj="globalObj" :localObj="localObj" />
        <customerChart :globalObj="globalObj" />
    </div>
</template>

<script setup>
//模块引入
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import customerTable from '@/views/customer/components/customerTable.vue'
import customerChart from '@/views/customer/components/customerChart.vue'
import languages from '@/views/customer/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({ name: 'customer' })

const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

onUpdated(() => {
    console.log('customer: onUpdated')
})
onMounted(() => {
    console.log('customer: onMounted')
})
onActivated(() => {
    console.log('customer: onActivated')
    let urlParams = new URLSearchParams(location.search.replace(`?`, ''))
    let task = urlParams.get('task') //todo 自动任务
})
onDeactivated(() => {
    console.log('customer: onDeactivated')
})
</script>

<style></style>

<template>
    <div>
        <a-row type="flex">
            <a-col :xs="{ span: 24 }" :sm="{ span: 24 }"
                ><customerTable :globalObj="globalObj" :localObj="localObj" />
            </a-col>
        </a-row>
        <a-row type="flex">
            <a-col
                :xs="{ span: 24, order: 3 }"
                :sm="{ span: 12, order: 3 }"
                :xl="{ span: 12, order: 1 }"
                ><salesRevenueChart :globalObj="globalObj" />
            </a-col>
            <a-col
                :xs="{ span: 24, order: 2 }"
                :sm="{ span: 12, order: 2 }"
                :xl="{ span: 9, order: 2 }"
                ><customerChart :globalObj="globalObj" />
            </a-col>
            <a-col
                :xs="{ span: 24, order: 1 }"
                :sm="{ span: 24, order: 1 }"
                :xl="{ span: 3, order: 3 }"
            >
                <br />
                <span style="font-weight: bold; font-size: 1rem;">客户管理 & 图表分析</span>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
//模块引入
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import customerTable from '@/views/customer/components/customerTable.vue'
import customerChart from '@/views/customer/components/customerChart.vue'
import salesRevenueChart from '@/views/customer/components/salesRevenueChart.vue'
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

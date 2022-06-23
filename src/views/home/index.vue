<template>
    <div style="height: 100%">
        <a-row type="flex">
            <a-col :xs="{ span: 15 }" :sm="{ span: 15 }">工作进度</a-col>
            <a-col :xs="{ span: 1 }" :sm="{ span: 1 }"> </a-col>
            <a-col :xs="{ span: 8 }" :sm="{ span: 8 }"
                >{{ new Date().Format('yyyy-MM-dd hh:mm') }}。又是新的一天。☀</a-col
            >
        </a-row>
        <a-row type="flex">
            <a-col
                :xs="{ span: 24, order: 3 }"
                :sm="{ span: 12, order: 3 }"
                :xl="{ span: 6, order: 1 }"
            >
                <chartSalesFunnel
                    :globalObj="globalObj"
                    :chartData="localObj.chartDataSalesFunnel"
                />
            </a-col>
            <a-col
                :xs="{ span: 24, order: 2 }"
                :sm="{ span: 12, order: 2 }"
                :xl="{ span: 10, order: 2 }"
            >
                <chartNewLeads :globalObj="globalObj" :chartData="localObj.chartDataNewLeads" />
            </a-col>
            <a-col
                :xs="{ span: 24, order: 1 }"
                :sm="{ span: 24, order: 1 }"
                :xl="{ span: 8, order: 3 }"
            >
                <br />
                <b>待办事项</b>
                <ul style="font-size: 1rem;">
                    <li>09:00 打开电脑</li>
                    <li>09:10 查看客户邮件</li>
                    <li style="color: red">09:30 内部会议</li>
                    <li>12:00 午休时间</li>
                    <li>14:00 系统功能优化</li>
                    <li>14:20 点个下午茶</li>
                    <li>16:30 在线培训</li>
                    <li>18:00 下班打卡</li>
                </ul>
            </a-col>
        </a-row>
        <br />
    </div>
</template>

<script setup>
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/home/languages.js'
import chartNewLeads from '@/views/home/components/chartNewLeads.vue'
import chartSalesFunnel from '@/views/home/components/chartSalesFunnel.vue'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({ name: 'home', chartDataNewLeads: [], chartDataSalesFunnel: [] })

const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

onUpdated(() => {
    console.log('home: onUpdated')
})
onMounted(() => {
    console.log('home: onMounted')
    todayFollowReady()
    dailyDistributeReady()
})
onActivated(() => {
    console.log('home: onActivated')
})
onDeactivated(() => {
    console.log('home: onDeactivated')
})

function todayFollowReady(msg) {
    let plotData = [
        { name: '当前库容', value: 750 },
        { name: '总客户数', value: 660 },
        { name: '已联系上', value: 180 },
    ]
    localObj.chartDataSalesFunnel = plotData
}

function dailyDistributeReady(msg) {
    let plotData = [
        { 分类: '待注册', 数量: 50 },
        { 分类: '邮箱退信', 数量: 20 },
        { 分类: '90d注册', 数量: 100 },
        { 分类: '90d升级', 数量: 88 },
        { 分类: '90d咨询', 数量: 77 },
        { 分类: '12h联系', 数量: 24 },
    ]
    localObj.chartDataNewLeads = plotData
}
</script>

<style scoped>
.site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
}

#components-layout-demo-top .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
    float: right;
    margin: 16px 0 16px 24px;
}
</style>

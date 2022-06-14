<template>
    <div style="height: 100%">
        <div id="c1"></div>
        this is home
        <br />
        <a-button type="secondary" size="large" @click="toggleGraph()"> show graph </a-button>
        <a-button type="secondary" size="large" @click="toggleGraph('hide')"> hide graph </a-button>
    </div>
</template>

<script setup>
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/home/languages.js'
import { Chart } from '@antv/g2'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({ name: 'home', chart: null })

const langPack = computed(() => {
    return languages[props.globalObj.locale]
})

onUpdated(() => {
    console.log('home: onUpdated')
})
onMounted(() => {
    console.log('home: onMounted')
})
onActivated(() => {
    console.log('home: onActivated')
})
onDeactivated(() => {
    console.log('home: onDeactivated')
})

const data = reactive([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
])
function toggleGraph(hide) {
    queryResult(!hide, hide ? 'hide graph' : 'show graph')
    if (hide) {
        if (localObj.chart != null) localObj.chart.hide()
        return
    }
    if (localObj.chart != null) return localObj.chart.show()
    // Step 1: 创建 Chart 对象
    localObj.chart = new Chart({
        container: 'c1', // 指定图表容器 ID
        autoFit: true,
        height: 300, // 指定图表高度
    })

    // Step 2: 载入数据源
    localObj.chart.data(data)

    // Step 3: 创建图形语法，绘制柱状图
    localObj.chart.interval().position('genre*sold')

    // Step 4: 渲染图表
    localObj.chart.render()
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

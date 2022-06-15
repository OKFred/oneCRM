<template>
    <div style="height: 100%; width: 50%">
        <div id="c1"></div>
        <br />
        <a-button type="secondary" size="large" @click="toggleGraph()"> show graph </a-button>
        <a-button type="secondary" size="large" @click="toggleGraph('hide')"> hide graph </a-button>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import languages from '@/views/customer/languages.js'
import { Chart } from '@antv/g2'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({
    name: 'home',
    chart: null,
    data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
    ],
})
const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

function toggleGraph(hide) {
    queryResult(!hide, hide ? 'hide graph' : 'show graph')
    if (hide) {
        if (localObj.chart != null) localObj.chart.hide()
        return
    }
    if (localObj.chart != null) return localObj.chart.show()
    graphMaker()
}

function graphMaker() {
    localObj.chart = new Chart({
        container: 'c1', // 指定图表容器 ID
        autoFit: true,
        height: 300, // 指定图表高度
    })

    // Step 2: 载入数据源
    localObj.chart.data(localObj.data)

    // Step 3: 创建图形语法，绘制柱状图
    localObj.chart.interval().position('genre*sold')

    // Step 4: 渲染图表
    localObj.chart.render()
} //创建 Chart 对象
</script>

<style scoped></style>

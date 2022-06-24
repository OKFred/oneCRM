<template>
    <div style="display: flex; flex-direction: column; justify-content: center">
        <div id="chartNewLeads"></div>
    </div>
</template>

<script setup>
//模块引入
import { reactive, watch, computed } from 'vue'
import languages from '@/views/customer/languages.js'
import { Chart } from '@antv/g2'

//父系入参
const props = defineProps({
    globalObj: Object,
    chartData: Array,
})
//本地变量和函数
let localObj = reactive({ chart: null, chartData: [] })

watch(
    () => props.chartData,
    (newValue, oldValue) => {
        if (newValue && newValue.length) {
            localObj.chartData = newValue
            toggleGraph()
        }
    },
)

const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

function toggleGraph(hide) {
    if (hide) {
        if (localObj.chart != null) localObj.chart.hide()
        return
    }
    if (localObj.chart != null) return localObj.chart.show()
    try {
        graphMaker()
    } catch (e) {
        console.log(e.message)
    }
}
function graphMaker() {
    localObj.chart = new Chart({
        container: 'chartNewLeads', // 指定图表容器 ID,
        padding: [30, 30, 30, 30] /* 上边 | 左边右边 | 下边 */,
        autoFit: true,
        height: 400, // 指定图表高度
    })
    // Step 2: 载入数据源
    localObj.chart.data(localObj.chartData)
    // Step 3: 创建图形语法，绘制柱状图
    localObj.chart
        .interval({
            theme: {
                defaultColor: 'red',
            },
        })
        .style('分类', (value) => {
            if (/90d/.test(value)) return { fill: 'sandybrown' }
            if (/12h/.test(value)) return { fill: 'orange' }
            return { fill: 'lightcoral' }
        })
        .position('分类*数量')
    // Step 4: 渲染图表
    localObj.chart.render()
} //创建 Chart 对象
</script>

<style scoped></style>

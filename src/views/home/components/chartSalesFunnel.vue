<template>
    <div>
        <div id="chartSalesFunnel"></div>
    </div>
</template>

<script setup>
//模块引入
import { reactive, watch, computed } from 'vue'
import languages from '@/views/customer/languages.js'
import DataSet from '@antv/data-set'
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
    const { DataView } = DataSet
    const dv = new DataView().source(localObj.chartData)
    const data = dv.rows
    localObj.chart = new Chart({
        container: 'chartSalesFunnel',
        autoFit: true,
        height: 400,
        padding: [60, 100, 60, 10] /* 上边 | 左边右边 | 下边 */,
    })
    localObj.chart.theme = {
        // 修改内置主题的某些配置
        defaultColor: 'red',
    }
    localObj.chart.data(data)
    localObj.chart.axis(false)
    localObj.chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl:
            '<li style="margin-bottom:4px;list-style-type:none;padding: 0;">' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '{name}<br/>' +
            '<span style="padding-left: 16px;line-height: 16px;">数量：{value}</span><br/>' +
            '</li>',
    })
    localObj.chart.coordinate('rect').transpose().scale(1, -1)
    localObj.chart
        .interval()
        .adjust('symmetric')
        .position('name*value')
        .shape('funnel')
        .color('name', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'])
        .label(
            'name*value',
            (name, value) => {
                return {
                    content: `${name} ${value}`,
                }
            },
            {
                offset: 35,
                labelLine: {
                    style: {
                        lineWidth: 1,
                        stroke: 'rgba(0, 0, 0, 0.15)',
                    },
                },
            },
        )
        .tooltip('name*value', (name, value) => {
            return {
                name,
                value,
            }
        })
        .animate({
            appear: {
                animation: 'fade-in',
            },
            update: {
                annotation: 'fade-in',
            },
        })

    localObj.chart.interaction('element-active')
    localObj.chart.on('beforepaint', () => {
        localObj.chart.annotation().clear(true)
        const chartData = localObj.chart.getData()
        // 中间标签文本
        chartData.forEach((obj) => {
            localObj.chart.annotation().text({
                top: true,
                position: {
                    action: obj.name,
                },
                content: +obj.value, // 显示的文本内容
                style: {
                    stroke: null,
                    fill: '#fff',
                    textAlign: 'center',
                },
            })
        })
    })
    localObj.chart.render()
} //创建 Chart 对象
</script>

<style scoped></style>

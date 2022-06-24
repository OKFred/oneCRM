<template>
    <div>
        <div id="chartSalesConversion"></div>
        <hr />
        <div style="display: flex; flex-direction: column; justify-content: center">
            <a-button type="secondary" size="large" @click="toggleGraph()">
                {{ langPack.graph.show }}
            </a-button>
            <a-button type="secondary" size="large" @click="toggleGraph('hide')">
                {{ langPack.graph.hide }}
            </a-button>
        </div>
    </div>
</template>

<script setup>
//模块引入
import { reactive, computed } from 'vue'
import languages from '@/views/customer/languages.js'
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({ name: 'home', chart: null })

const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

function toggleGraph(hide) {
    if (hide) {
        if (localObj.chart != null) localObj.chart.hide()
        return
    }
    if (localObj.chart != null) return localObj.chart.show()
    graphMaker()
}

function graphMaker() {
    const { DataView } = DataSet
    const dv = new DataView().source([
        { action: '浏览网站', pv: 50000 },
        { action: '放入购物车', pv: 35000 },
        { action: '生成订单', pv: 25000 },
        { action: '支付订单', pv: 15000 },
        { action: '完成交易', pv: 8000 },
    ])
    dv.transform({
        type: 'map',
        callback(row) {
            row.percent = row.pv / 50000
            return row
        },
    })
    const data = dv.rows
    localObj.chart = new Chart({
        container: 'chartSalesConversion',
        autoFit: true,
        height: 500,
        padding: [60, 100, 60, 10] /* 上边 | 左边右边 | 下边 */,
    })
    localObj.chart.data(data)
    localObj.chart.axis(false)
    localObj.chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl:
            '<li style="margin-bottom:4px;list-style-type:none;padding: 0;">' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '{name}<br/>' +
            '<span style="padding-left: 16px;line-height: 16px;">浏览人数：{pv}</span><br/>' +
            '<span style="padding-left: 16px;line-height: 16px;">占比：{percent}</span><br/>' +
            '</li>',
    })
    localObj.chart.coordinate('rect').transpose().scale(1, -1)
    localObj.chart
        .interval()
        .adjust('symmetric')
        .position('action*percent')
        .shape('funnel')
        .color('action', ['brown', 'lightcoral', 'orange', 'orangered', 'red'])
        .label(
            'action*pv',
            (action, pv) => {
                return {
                    content: `${action} ${pv}`,
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
        .tooltip('action*pv*percent', (action, pv, percent) => {
            return {
                name: action,
                percent: +percent * 100 + '%',
                pv,
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
                    action: obj.action,
                    percent: 'center',
                },
                content: +obj.percent * 100 + '%', // 显示的文本内容
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

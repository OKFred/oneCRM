<template>
    <div>
        <div id="chartWorldMap"></div>
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

async function graphMaker() {
    let mapData = await getWorldGeoData()
    let earthData = await getEarthQuakeData()
    localObj.chart = new Chart({
        container: 'chartWorldMap',
        autoFit: true,
        height: 500,
        padding: [0, 20, 40],
    })
    // force sync scales
    localObj.chart.scale({
        x: { sync: true },
        y: { sync: true },
    })
    localObj.chart.coordinate('rect').reflect('y')
    localObj.chart.legend(false)
    localObj.chart.axis(false)

    // style the tooltip
    localObj.chart.tooltip({
        showTitle: false,
        shared: true,
        showMarkers: false,
        containerTpl: '<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>',
        itemTpl:
            '<tr data-index="{index}"><td style="padding:5px;background-color:#545454;">{name}</td><td style="padding:5px;background-color:#fff;color:#000;">{value}</td></tr>',
        domStyles: {
            'g2-tooltip': {
                borderRadius: '2px',
                backgroundColor: '#DDDDDD',
                padding: 0,
                border: '1px solid #333',
            },
        },
    })
    // data set
    const ds = new DataSet()

    // draw the map
    const dv = ds
        .createView('back')
        .source(mapData, {
            type: 'GeoJSON',
        })
        .transform({
            type: 'geo.projection',
            projection: 'geoMercator',
            as: ['x', 'y', 'centroidX', 'centroidY'],
        })
    const bgView = localObj.chart.createView()
    bgView.data(dv.rows)
    bgView.tooltip(false)
    bgView.polygon().position('x*y').style({
        fill: '#DDDDDD',
        stroke: '#b1b1b1',
        lineWidth: 0.5,
        fillOpacity: 0.85,
    })

    // draw the bubble plot
    const userData = ds.createView().source(earthData)
    userData.transform({
        type: 'map',
        callback: (obj) => {
            const projectedCoord = dv.geoProjectPosition([obj.lng * 1, obj.lat * 1], 'geoMercator')
            obj.x = projectedCoord[0]
            obj.y = projectedCoord[1]
            obj.deaths = obj.deaths * 1
            obj.magnitude = obj.magnitude * 1
            return obj
        },
    })
    const pointView = localObj.chart.createView()
    pointView.data(userData.rows)
    pointView
        .point()
        .position('x*y')
        .size('deaths', [2, 30])
        .shape('circle')
        .color('#FF2F29')
        .tooltip('date*location*lat*lng*deaths*magnitude')
        .style({
            fillOpacity: 0.45,
        })
        .state({
            active: {
                style: {
                    lineWidth: 1,
                    stroke: '#FF2F29',
                },
            },
        })
    pointView.interaction('element-active')
    localObj.chart.render()
} //创建 Chart 对象

//数据获取
async function getWorldGeoData() {
    let res = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/world.geo.json')
    let result = await res.json()
    return result //mapData
}
async function getEarthQuakeData() {
    let res = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/earthquake.json')
    let result = await res.json()
    return result //data
}
</script>

<style scoped></style>

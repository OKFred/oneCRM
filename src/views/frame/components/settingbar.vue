<template>
    <div>
        <a-avatar src="https://joeschmoe.io/api/v1/random" />
        <span style="padding-right: 40px"></span>
        <img :src="svgURL" :style="svgObj.str" alt="my-logo" />
        <span style="padding-right: 20px; padding-right: 20px"></span>
        <div
            :style="{
                position: fixed,
                right: '0px',
                width: pageObj.settingWidth,
                height: '200%',
                transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                zIndex: 1100,
                backgroundColor: 'seashell',
            }"
        >
            <div>settings</div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import svgURL from '@/assets/setting.svg'
let pageObj = reactive({
    settingWidth: '0px',
})
let svgObj = reactive({
    deg: 0,
    str: `transform: rotate(360deg); translateZ(0px);`,
})
setInterval(() => {
    svgObj.deg =
        svgObj.deg < 200
            ? svgObj.deg + 9
            : svgObj.deg < 300
            ? svgObj.deg + 6
            : svgObj.deg < 360
            ? svgObj.deg + 3
            : 0
    svgObj.str = `transform: rotate(${svgObj.deg}deg); translateZ(0px);`
}, 50)

function toggleSetting() {
    console.log('toggleSetting')
    pageObj.settingWidth = pageObj.settingWidth === '0px' ? '33%' : '0px'
} //切换设置面板
</script>

<template>
    <div>
        <!-- 未登录不显示头像 -->
        <a-avatar
            v-if="props.globalObj.login.hasLogin"
            src="https://joeschmoe.io/api/v1/random"
            @click="goLogin()"
            :style="{
                width: '30px',
                height: '30px',
                marginRight: '20px',
                display: globalObj.display.breaked ? 'none' : 'block',
            }"
        />
        <img :src="svgURL" :style="localObj.svg.str" alt="my-logo" @click="toggleSetting" />
        <div
            :style="{
                position: 'fixed',
                right: '0px',
                top: '75px',
                width: localObj.panel.width,
                height: '75%',
                transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                zIndex: 1100,
                backgroundColor: '#fff',
                opacity: '0.8',
                transition: 'width ease-in-out 225ms',
                borderRadius: '4px',
                boxShadow:
                    'rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px',
            }"
            @click="toggleSetting"
        >
            <h2>设置 settings</h2>
            <hr />
            <div style="display: flex; flex-direction: column">
                <span @click.prevent="(e) => e.stopPropagation()"
                    ><a-switch
                        v-model:checked="localObj.switch.language"
                        checked-children="中文"
                        un-checked-children="English"
                        @change="toggleLocale"
                    />
                    {{ langPack.settings.language }}</span
                >
                <br />
                <span @click.prevent="(e) => e.stopPropagation()"
                    ><a-switch
                        v-model:checked="localObj.switch.rightClick"
                        :checked-children="langPack.confirm.enable"
                        :un-checked-children="langPack.confirm.disable"
                        @change="toggleRightClick"
                    />
                    {{ langPack.settings.rightClick }}</span
                >
                <br />
                <span @click.prevent="(e) => e.stopPropagation()"
                    ><a-switch
                        v-model:checked="localObj.switch.mode"
                        :checked-children="langPack.confirm.enable"
                        :un-checked-children="langPack.confirm.disable"
                        @change="toggleMode"
                    />
                    {{ langPack.settings.mode }}</span
                >
                <a-button
                    type="primary"
                    size="large"
                    style="bottom: 5px; position: absolute"
                    block
                    v-show="globalObj.login.hasLogin"
                    @click="goLogin(true)"
                    >{{ langPack.settings.logout }}</a-button
                >
            </div>
        </div>
    </div>
</template>

<script setup>
//模块引入
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'

import svgURL from '@/assets/setting.svg'
import languages from '@/views/frame/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({
    name: 'setting',
    panel: {
        width: '0px',
    },
    switch: {
        language: true, //zhCN-enUS
        rightClick: true, //是否禁用右键菜单
        mode: false,
    },
    svg: {
        deg: 0,
        str: `transform: rotate(360deg); translateZ(0px);`,
    },
})

const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

/* onUpdated(() => {
    console.log('setting: onUpdated')
}) */
onMounted(() => {
    console.log('setting: onMounted')
})
onActivated(() => {
    console.log('setting: onActivated')
})
onDeactivated(() => {
    console.log('setting: onDeactivated')
})
setInterval(() => {
    localObj.svg.deg =
        localObj.svg.deg < 200
            ? localObj.svg.deg + 9
            : localObj.svg.deg < 300
            ? localObj.svg.deg + 6
            : localObj.svg.deg < 360
            ? localObj.svg.deg + 3
            : 0
    localObj.svg.str = `transform: rotate(${localObj.svg.deg}deg); translateZ(0px);`
}, 50)

function toggleSetting() {
    let panelWidth = props.globalObj.display.breaked ? '50%' : '30%'
    localObj.panel.width = localObj.panel.width === '0px' ? panelWidth : '0px'
} //切换设置面板

function toggleLocale() {
    props.globalObj.locale.language == 'zhCN'
        ? props.globalObj.setLocale({ language: 'enUS' })
        : props.globalObj.setLocale({ language: 'zhCN' })
} //切换语言

function toggleRightClick() {
    props.globalObj.display.rightClick
        ? props.globalObj.setDisplay({ rightClick: false })
        : props.globalObj.setDisplay({ rightClick: true })
} //切换右键菜单

function toggleMode() {
    props.globalObj.display.mode
        ? props.globalObj.setDisplay({ mode: false })
        : props.globalObj.setDisplay({ mode: true })
} //切换工作模式

async function goLogin(logout) {
    console.log('go login')
    //if (logout) await //doLogout()
    props.globalObj.setTab({
        currentTab: 'login',
    })
}
</script>

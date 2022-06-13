<template>
    <div>
        <a-avatar
            src="https://joeschmoe.io/api/v1/random"
            @click="this.$router.push('/profile')"
            :style="{
                marginRight: '20px',
                display: globalObj.breaked ? 'none' : 'block',
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
            <h3>设置 settings</h3>
            <div>
                <span @click.prevent="(e) => e.stopPropagation()"
                    ><a-switch
                        v-model:checked="localObj.switch.checked1"
                        checked-children="中文"
                        un-checked-children="English"
                        @change="toggleLocale"
                /></span>
                <br />
                <span @click.prevent="(e) => e.stopPropagation()"
                    ><a-switch
                        v-model:checked="localObj.switch.checked2"
                        checked-children="1"
                        un-checked-children="0"
                /></span>
                <br />
                <span @click.prevent="(e) => e.stopPropagation()"
                    ><a-switch v-model:checked="localObj.switch.checked3">
                        <template #checkedChildren><check-outlined /></template>
                        <template #unCheckedChildren><close-outlined /></template> </a-switch
                ></span>
            </div>
        </div>
    </div>
</template>

<script setup>
//模块引入
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
import svgURL from '@/assets/setting.svg'
import languages from '@/views/profile/languages.js'

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
        checked1: true,
        checked2: false,
        checked3: false,
    },
    svg: {
        deg: 0,
        str: `transform: rotate(360deg); translateZ(0px);`,
    },
})

const langPack = computed(() => {
    return languages[props.globalObj.locale]
})

/* onUpdated(() => {
    console.log('profile: onUpdated')
}) */
onMounted(() => {
    console.log('profile: onMounted')
})
onActivated(() => {
    console.log('profile: onActivated')
})
onDeactivated(() => {
    console.log('profile: onDeactivated')
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
    localObj.panel.width = localObj.panel.width === '0px' ? props.globalObj.breaked ? '50%' : '30%' : '0px';
} //切换设置面板

function toggleLocale() {
    props.globalObj.locale == 'zhCN'
        ? props.globalObj.setLocale('enUS')
        : props.globalObj.setLocale('zhCN')
} //切换语言
</script>

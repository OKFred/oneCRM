<template>
    <div>
        <span class="logo-icon" style="font-size: 24px; color: Dodgerblue">
            <font-awesome-icon icon="phone" />
        </span>
        <span
            class="logo-name"
            :style="{
                color: 'snow',
                fontSize: '2rem',
                paddingLeft: '10px',
                display: globalObj.breaked ? 'none' : 'block',
            }"
            >CRM</span
        >
        <span
            class="sidebar-icon"
            :style="{
                color: 'white',
                fontSize: '1.5rem',
                paddingLeft: globalObj.breaked ? '15px' : '45px',
            }"
        >
            <font-awesome-icon
                icon="angles-left"
                @click="toggleSidebar"
                :style="{
                    transform: localObj.sidebarIcon.transform,
                    transition: 'transform 225ms ease-in-out',
                }"
            />
        </span>
    </div>
</template>

<script setup>
//模块引入
import { reactive, watch, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/frame/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})

//本地变量和函数
let localObj = reactive({
    sidebarIcon: {
        transform: 'rotate(0deg)',
    },
})

watch(
    () => props.globalObj.sidebarCollapse,
    (newValue, oldValue) => {
        //console.log('sidebar 已收起?', newValue)
        localObj.sidebarIcon.transform = newValue ? 'rotate(180deg)' : 'rotate(0deg)'
        /* ... */
    },
)

function toggleSidebar() {
    let collapse = !props.globalObj.sidebarCollapse
    props.globalObj.setSidebarCollapse(collapse)
} //侧边栏收起展开

</script>

<style scoped></style>

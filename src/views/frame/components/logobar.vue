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
                display: globalObj.display.breaked ? 'none' : 'block',
            }"
            >CRM</span
        >
            <!-- 未登录不显示侧边栏开关 -->
        <span
                v-if="props.globalObj.login.hasLogin"
            class="sidebar-toggle-icon"
            :style="{
                color: 'white',
                fontSize: '1.5rem',
                paddingLeft: globalObj.display.breaked ? '15px' : '45px',
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
    () => props.globalObj.sidebar.collapse,
    (newValue, oldValue) => {
        localObj.sidebarIcon.transform = newValue ? 'rotate(180deg)' : 'rotate(0deg)'
        /* ... */
    },
)

function toggleSidebar() {
    let collapse = !props.globalObj.sidebar.collapse
    props.globalObj.setSidebar({ collapse })
} //侧边栏收起展开
</script>

<style scoped></style>

<template>
    <a-menu v-model:selectedKeys="localObj.tab" theme="dark" mode="inline">
        <a-menu-item
            key="home"
            @click="checkAndRedirect('home')"
            @mouseenter="onColor"
            @mouseleave="offColor"
        >
            <span class="nav-icon" style="font-size: 16px">
                <font-awesome-icon icon="house-chimney" />
            </span>
            <span class="nav-text" style="padding: 10px">{{ langPack.tab.Home }}</span>
        </a-menu-item>
        <a-menu-item
            key="customer"
            @click="checkAndRedirect('customer')"
            @mouseenter="onColor"
            @mouseleave="offColor"
        >
            <span class="nav-icon" style="font-size: 16px">
                <font-awesome-icon icon="users" />
            </span>
            <span class="nav-text" style="padding: 10px">{{ langPack.tab.Customer }}</span>
        </a-menu-item>
        <a-menu-item
            key="time"
            @click="checkAndRedirect('time')"
            @mouseenter="onColor"
            @mouseleave="offColor"
        >
            <span class="nav-icon" style="font-size: 16px">
                <font-awesome-icon icon="business-time" />
            </span>
            <span class="nav-text" style="padding: 10px">{{ langPack.tab.Time }}</span>
        </a-menu-item>
        <a-menu-item
            key="revenue"
            @click="checkAndRedirect('revenue')"
            @mouseenter="onColor"
            @mouseleave="offColor"
        >
            <span class="nav-icon" style="font-size: 16px">
                <font-awesome-icon icon="money-bill-trend-up" />
            </span>
            <span class="nav-text" style="padding: 10px">{{ langPack.tab.Revenue }}</span>
        </a-menu-item>
    </a-menu>
</template>

<script setup>
//模块引入
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/frame/languages.js'
import router from '@/router/index' // 跳路由
import { useRoute } from 'vue-router' // 获取路由参数

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({
    name: 'sidebar',
})

const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

onUpdated(() => {
    console.log('sidebar: onUpdated')
})
onMounted(() => {
    console.log('sidebar: onMounted')
})
onActivated(() => {
    console.log('sidebar: onActivated')
})
onDeactivated(() => {
    console.log('sidebar: onDeactivated')
})

function onColor(e) {
    Array.from(e.target.children).forEach((child) => {
        child.style.color = 'pink'
    })
}

function offColor(e) {
    Array.from(e.target.children).forEach((child) => {
        child.style.color = 'white'
    })
}

function checkAndRedirect(path) {
    if (!props.globalObj.login.hasLogin)
        return queryResult(false, langPack.value.warning.loginFirst)
    return router.push(`/${path}`)
    let route = useRoute()
    console.log(route.query.id)
    console.log(route.params.id)
}
</script>

<style>
.ant-layout-sider-zero-width-trigger {
    display: none;
}
</style>

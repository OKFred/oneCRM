<template>
    <a-menu v-model:selectedKeys="localObj.tab" theme="dark" mode="inline">
        <a-menu-item key="Home" @click="this.$router.push('/')" @mouseenter="onColor" @mouseleave="offColor">
            <span class="nav-icon" style="font-size: 16px;">
                <font-awesome-icon icon="house-chimney" />
            </span>
            <span class="nav-text" style="padding: 10px">{{ langPack.tab.Home }}</span>
        </a-menu-item>
        <a-menu-item key="Customer" @click="this.$router.push('/customer')" @mouseenter="onColor" @mouseleave="offColor">
            <span class="nav-icon" style="font-size: 16px;">
                <font-awesome-icon icon="users" />
            </span>
            <span class="nav-text" style="padding: 10px">{{ langPack.tab.Customer }}</span>
        </a-menu-item>
        <a-menu-item key="Order" @click="this.$router.push('/order')" @mouseenter="onColor" @mouseleave="offColor">
            <span class="nav-icon" style="font-size: 16px;">
                <font-awesome-icon icon="basket-shopping" />
            </span>
            <span class="nav-text" style="padding: 10px">{{ langPack.tab.Order }}</span>
        </a-menu-item>
        <a-menu-item key="Profile" @click="this.$router.push('/profile')" @mouseenter="onColor" @mouseleave="offColor">
            <span class="nav-icon" style="font-size: 16px;">
                <font-awesome-icon icon="address-card" />
            </span>
            <span class="nav-text" style="padding: 10px">{{ langPack.tab.Profile }}</span>
        </a-menu-item>
    </a-menu>
</template>

<script setup>
//模块引入
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/frame/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({
    name: 'sidebar',
})

const langPack = computed(() => {
    return languages[props.globalObj.locale]
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
    Array.from(e.target.children).forEach(child => {
        child.style.color = 'pink';
    })
}

function offColor(e) {
    Array.from(e.target.children).forEach(child => {
        child.style.color = 'white';
    })
}
</script>

<style>
.ant-layout-sider-zero-width-trigger {
    display: none;
} 
</style>

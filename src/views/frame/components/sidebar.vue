<template>
    <a-menu v-model:selectedKeys="localObj.tab" theme="dark" mode="inline">
        <a-menu-item key="Home" @click="this.$router.push('/')">
            <span style="font-size: 16px; color: white;">
                <font-awesome-icon icon="house-chimney" />
            </span>
            <span class="nav-text" style="padding: 10px;">{{ langPack.tab.Home }}</span>
        </a-menu-item>
        <a-menu-item key="Customer" @click="this.$router.push('/customer')">
            <span style="font-size: 16px; color: white;">
                <font-awesome-icon icon="users" />
            </span>
            <span class="nav-text" style="padding: 10px;">{{ langPack.tab.Customer }}</span>
        </a-menu-item>
        <a-menu-item key="Order" @click="this.$router.push('/order')">
            <span style="font-size: 16px; color: white;">
                <font-awesome-icon icon="basket-shopping" />
            </span>
            <span class="nav-text" style="padding: 10px;">{{ langPack.tab.Order }}</span>
        </a-menu-item>
        <a-menu-item key="Profile" @click="this.$router.push('/profile')">
            <span style="font-size: 16px; color: white;">
                <font-awesome-icon icon="address-card" />
            </span>
            <span class="nav-text" style="padding: 10px;">{{ langPack.tab.Profile }}</span>
        </a-menu-item>
    </a-menu>
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
let localObj = reactive({ name: 'sidebar', tab: ['Home'] })

const langPack = computed(() => {
    return languages[props.globalObj.locale]
})

watch(
    () => props,
    (val, preVal) => {
        //val为修改后的值,preVal为修改前的值
        console.log('关注到props有变化' /*  val, preVal */)
    },
    {
        //如果加了这个参数，值为true的话，就消除了惰性，watch会在创建后立即执行一次
        //那么首次执行，val为默认值,preVal为undefined
        //immediate: true,
        //这个参数代表监听对象时，可以监听深度嵌套的对象属性
        //比如message是一个对象的话，可以监听到message.a.b.c，也就是message下的所有属性
        deep: true,
    },
)

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
</script>

<style scoped>
</style>

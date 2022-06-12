<template>
    <a-menu v-model:selectedKeys="pageObj.tab" theme="dark" mode="inline">
        <a-menu-item key="Home" @click="this.$router.push('/')">
            <user-outlined />
            <span class="nav-text">{{ Languages[props.globalObj.locale].tab.Home }}</span>
        </a-menu-item>
        <a-menu-item key="PrivateSearch" @click="changeLocale">
            <video-camera-outlined />
            <span class="nav-text">{{ langPack.tab.PrivateSearch }}</span>
        </a-menu-item>
        <a-menu-item key="KWA">
            <upload-outlined />
            <span class="nav-text">{{ props.globalObj.locale }}</span>
        </a-menu-item>
        <a-menu-item key="4">
            <user-outlined />
            <span class="nav-text">{{ props.fatherCount }}</span>
        </a-menu-item>
    </a-menu>
</template>

<script setup>
//模块引入
import { reactive, watch, computed, onMounted, onActivated, onUpdated } from 'vue'
import Languages from '@/views/frame/languages.js'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue'

//父系入参
const props = defineProps({
    globalObj: Object,
    increment: Function,
    fatherCount: Number,
})
//本地变量和函数
let langPack = Languages[props.globalObj.locale] //语言包
let pageObj = reactive({ name: 'sidebar', tab: ['Home'] })

computed({
    langPack: () => {
        console.log('计算一下...');
        return Languages[props.globalObj.locale]
    },
})

watch(
    () => props,
    (val, preVal) => {
        //val为修改后的值,preVal为修改前的值
        console.log('关注到props有变化', val, preVal)
    },
    {
        //如果加了这个参数，值为true的话，就消除了惰性，watch会在创建后立即执行一次
        //那么首次执行，val为默认值,preVal为undefined
        immediate: true,
        //这个参数代表监听对象时，可以监听深度嵌套的对象属性
        //比如message是一个对象的话，可以监听到message.a.b.c，也就是message下的所有属性
        deep: true,
    },
)

function changeLocale() {
    props.globalObj.locale == 'zhCN'
        ? (props.globalObj.locale = 'enUS')
        : (props.globalObj.locale = 'zhCN')
    props.increment()
}

onUpdated(() => {
    console.log('sidebar: onUpdated')
    console.log('props:', props, props.globalObj.locale)
    console.log('pageObj:', pageObj.tab[0])
    console.log('langPack:', langPack)
})
onMounted(() => {
    console.log('sidebar: onMounted')
})
onActivated(() => {
    console.log('sidebar: onActivated')
})
</script>

<style scoped>
.site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
}

#components-layout-demo-top .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
    float: right;
    margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
    background: #141414;
}
</style>

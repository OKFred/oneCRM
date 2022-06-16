<template>
    <div style="height: 100%">
        <loginForm :globalObj="globalObj" />
    </div>
</template>

<script setup>
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/login/languages.js'
import loginForm from '@/views/login/components/loginForm.vue'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({ name: 'login' })

const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

onUpdated(() => {
    console.log('login: onUpdated')
})
onMounted(() => {
    console.log('login: onMounted')
})
onActivated(() => {
    console.log('login: onActivated')
    if (props.globalObj.login.hasLogin) props.globalObj.setLogin({ hasLogin: false, loginInfo: {} })
}) //已登录的话清除下登录信息
onDeactivated(() => {
    console.log('login: onDeactivated')
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
</style>

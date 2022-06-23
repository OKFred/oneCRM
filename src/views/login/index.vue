<template>
    <div style="height: 100%">
        <loginForm :globalObj="globalObj" />
    </div>
</template>

<script setup>
//模块引入
import { reactive, watch, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
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

watch(
    () => props.globalObj.msgs[localObj.name],
    (newValue, oldValue) => {
        if (newValue) distribute(newValue)
    },
    { immediate: true },
) //处理来自App.vue的消息分发

onUpdated(() => {
    console.log('login: onUpdated')
})
onMounted(() => {
    console.log('login: onMounted')
    //queryConfig() //查询配置
})
onActivated(() => {
    console.log('login: onActivated')
    if (props.globalObj.login.hasLogin) props.globalObj.setLogin({ hasLogin: false, loginInfo: {} })
}) //已登录的话清除下登录信息
onDeactivated(() => {
    console.log('login: onDeactivated')
})

function distribute(msg) {
    //console.log('%c' + localObj.name, 'color: orangered;', msg) //debug
    if (msg.info.for == '读取配置清单') {
        configReady(msg)
    } else if (msg.info.for == '登录邮箱') {
        loginReady(msg)
    }
}

async function loginReady(msg) {
    let { result, status } = msg.response
    if (status) {
        queryResult(true, langPack.value.form.loginSuccess)
        //queryConfig() //重新获取一遍配置
    } else {
        queryResult(false, langPack.value.form.loginFailed)
    }
}

function configReady(msg) {
    //⭐全局配置数据⭐
    console.log('配置清单已就位')
    let data = msg.response.data
    props.globalObj.setBaseData(data)
    if (!data.status) queryResult(false, '未初始化')
    else {
        queryResult(true, langPack.value.form.hasLoggedIn)
        let imageUrl = orionData.imageUrl
        let userName = orionData.crmUserName
        setTimeout(() => {
            props.globalObj.setLogin({ hasLogin: true, loginInfo: { imageUrl, userName } })
        }, 1000)
    } //登录成功, 自动跳转到主页
}
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

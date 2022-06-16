<template>
    <frameWork :globalObj="globalObj" />
    <noteBar :globalObj="globalObj" />
    <modalBar :globalObj="globalObj" />
</template>

<script setup>
//模块引入
import { reactive } from 'vue'
import 'ant-design-vue/dist/antd.css'

//通用
import '@/base/proto_date.js'
import '@/base/proto_node.js'
import '@/base/proto_string.js'
import '@/base/network.js'

//项目
import frameWork from '@/views/frame/index.vue'
import noteBar from '@/views/frame/notebar.vue'
import modalBar from '@/views/frame/modalbar.vue'
import CountryRegions from '@/base/CountryRegions.js'

//全局变量 & 函数
let globalObj = reactive({
    name: 'globalObj',
    tab: {
        currentTab: 'Home',
    },
    setTab: function (obj) {
        this.tab = { ...this.tab, ...obj }
    }, //设置当前tab
    locale: {
        language: 'zhCN',
    },
    setLocale: function (obj) {
        this.locale = { ...this.locale, ...obj }
    }, //设置语言
    login: {
        hasLogin: false,
        loginInfo: {},
    },
    setLogin: function (obj) {
        this.login = { ...this.login, ...obj }
    }, //设置登录信息
    sidebar: {
        collapse: false,
    },
    setSidebar: function (obj) {
        this.sidebar = { ...this.sidebar, ...obj }
        if (this.sidebar.collapse) console.log('sidebar 已收起?', this.sidebar.collapse)
    }, //设置侧边栏
    display: {
        breaked: false,
        rightClick: true,
        mode: true,
    }, //分辨率断点
    setDisplay: function (obj) {
        this.display = { ...this.display, ...obj }
    },
    checkBreakPoint: function () {
        let matches = window.matchMedia('(max-width: 768px)').matches
        if (matches) onBreakpoint(true)
        else onBreakpoint(false)
        return matches
    }, //是否是小屏
    notification: {
        params: [],
    }, //消息提示
    setNotification: function (obj) {
        this.notification = { ...this.notification, ...obj }
    },
    modal: {
        params: [],
        show: false,
        result: false,
    }, //对话框(传参，显示，结果)
    setModal: function (obj) {
        this.modal = { ...this.modal, ...obj }
        console.log(this.modal.result ? 'ok' : 'cancel')
    },
})

window.CountryRegions = CountryRegions
window.queryResult = (type, info) => {
    globalObj.notification.params = [type, info]
}
window.showModal = (type, info) => {
    globalObj.modal.params = [type, info]
}
window.oncontextmenu = function (e) {
    if (!globalObj.display.rightClick) e.preventDefault()
} //右键菜单是否禁用

window.matchMedia('(max-width: 768px)').addEventListener('change', (e) => {
    onBreakpoint(e.matches)
}) //未登录时，也就没有侧边栏和它的断点接口，所以不用 @breakpoint API
if (window.matchMedia('(max-width: 768px)').matches) onBreakpoint(true) //小屏则设置断点（毕竟默认值是大屏）

function onBreakpoint(breaked) {
    console.log('断点 ?', breaked)
    globalObj.display.breaked = breaked
} //分辨率断点


/* var rpcDataStr = JSON.stringify(rpc);
function prepareMsg(What) {
    let rpcData = JSON.parse(rpcDataStr);
    return rpcData.find((obj) => obj.info.for === What);
window.prepareMsg = prepareMsg;
} //查找RPC */
</script>

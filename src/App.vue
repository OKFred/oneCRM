<template>
    <frameWork :globalObj="globalObj" />
</template>

<script setup>
//模块引入
import { reactive } from 'vue'

//通用
import '@/base/proto_date.js'
import '@/base/proto_node.js'
import '@/base/proto_string.js'
import '@/base/network.js'

//项目
import frameWork from '@/views/frame/index.vue'
import CountryRegions from '@/base/CountryRegions.js'

//全局变量 & 函数
window.CountryRegions = CountryRegions
let globalObj = reactive({
    name: 'globalObj',
    currentTab: 'home',
    setCurrentTab: function (currentTab) {
        this.currentTab = currentTab
    }, //设置当前tab
    locale: 'zhCN',
    setLocale: function (locale) {
        this.locale = locale
    }, //设置语言
    sidebarCollapse: false,
    setSidebarCollapse: function (sidebarCollapse) {
        this.sidebarCollapse = sidebarCollapse
    }, //侧边栏是否收起
    breaked: false,
    setBreaked: function (breaked) {
        this.breaked = breaked
    }, //分辨率断点
})

/* var rpcDataStr = JSON.stringify(rpc);
function prepareMsg(What) {
    let rpcData = JSON.parse(rpcDataStr);
    return rpcData.find((obj) => obj.info.for === What);
window.prepareMsg = prepareMsg;
} //查找RPC */
</script>

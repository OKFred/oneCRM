<template>
    <frameWork :globalObj="globalObj" />
    <noteBar :globalObj="globalObj" :params="localObj.params" />
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
import noteBar from '@/views/frame/notebar.vue'
import CountryRegions from '@/base/CountryRegions.js'

//全局变量 & 函数
window.CountryRegions = CountryRegions
window.queryResult = (type, info) => {
    localObj.params = [type, info]
}

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

//本地变量和函数
let localObj = reactive({
    params: [],
}) //消息提示

/* var rpcDataStr = JSON.stringify(rpc);
function prepareMsg(What) {
    let rpcData = JSON.parse(rpcDataStr);
    return rpcData.find((obj) => obj.info.for === What);
window.prepareMsg = prepareMsg;
} //查找RPC */
</script>

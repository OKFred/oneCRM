<template>
    <frameWork :globalObj="globalObj" :setLocale="setLocale" />
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

/* var rpcDataStr = JSON.stringify(rpc);
function prepareMsg(What) {
    let rpcData = JSON.parse(rpcDataStr);
    return rpcData.find((obj) => obj.info.for === What);
window.prepareMsg = prepareMsg;
} //查找RPC */

//全局变量 & 函数
window.CountryRegions = CountryRegions
let globalObj = reactive({
    name: 'globalObj',
    currentPage: 'home',
    setCurrentPage: (page) => {
        let newObj = {...globalObj};
        newObj.currentPage = page;
        globalObj = (newObj);
    },
    locale: 'zhCN',
    setLocale: (locale) => {
        let newObj = {...globalObj};
        newObj.locale = locale;
        globalObj = (newObj);
        console.log('setting locale', globalObj.locale);
    },
})
const setLocale =()=> globalObj.locale = 'enUS';
</script>

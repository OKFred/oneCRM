<template></template>

<script setup>
//模块引入
import { computed, watch } from 'vue'
import { notification } from 'ant-design-vue'
import languages from '@/views/frame/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object
})

//本地变量和函数
const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

watch(
    () => props.globalObj.notification.params,
    (newValue /* , oldValue */) => {
        if (newValue) queryResult(...newValue)
    },
)
notification.config({
    maxCount: 3,
    placement: 'bottomRight',
    onClick: () => {},
})
function queryResult(type, info) {
    let noteType = type ? 'success' : 'error'
    let noteInfo = typeof info === 'object' ? JSON.stringify(info) : info
    notification[noteType]({
        message: langPack.value.notification.title,
        description: noteInfo,
        duration: type ? 3 : 7,
    })
}
</script>

<style>
.ant-notification {
    z-index: 9999;
}
.ant-notification-notice-message {
    font-weight: bold;
}
.ant-notification-notice-description {
    font-size: 1rem;
}
</style>

<template>
    <a-modal :ok-text="langPack.modal.ok" :cancel-text="langPack.modal.cancel"
        v-model:visible="localObj.modal.visible" />
</template>

<script setup>
//模块引入
import { reactive, computed, watch } from 'vue'
import { Modal } from 'ant-design-vue';
import languages from '@/views/frame/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
    params: Array,
})

//本地变量和函数
let localObj = reactive({
    modal: {
        visible: false,
    },
})
const langPack = computed(() => {
    return languages[props.globalObj.locale]
})

watch(
    () => props.params,
    (newValue /* , oldValue */) => {
        if (newValue) queryResult(...newValue)
    },
)

function queryResult(type, info) {
    let noteType = type ? 'success' : 'error'
    let noteInfo = typeof info === 'object' ? JSON.stringify(info) : info
    Modal.confirm({
        title: noteType,
        content: noteInfo,
        onOk: () => console.log('ok'),
        onCancel: () => console.log('cancel')
    })
}
</script>

<style>
/* .ant-notification {
    z-index: 9999;
}
.ant-notification-notice-message {
    font-weight: bold;
}
.ant-notification-notice-description {
    font-size: 1rem;
} */
</style>

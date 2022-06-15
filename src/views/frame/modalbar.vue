<template>
    <a-modal
        :ok-text="langPack.modal.ok"
        :cancel-text="langPack.modal.cancel"
        v-model:visible="localObj.modal.visible"
    />
</template>

<script setup>
//模块引入
import { reactive, computed, watch } from 'vue'
import { Modal } from 'ant-design-vue'
import languages from '@/views/frame/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})

//本地变量和函数
let localObj = reactive({
    modal: {
        visible: false,
    },
})
const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

watch(
    () => props.globalObj.modal.params,
    (newValue /* , oldValue */) => {
        if (newValue) showModal(...newValue)
    },
)

function showModal(content, title) {
    let modalContent = typeof content === 'object' ? JSON.stringify(content) : content;
    let modalTitle = title !== undefined ? title : langPack.value.modal.title;
    if (props.globalObj.modal.show) return false; //当前已经有对话框了
    setTimeout(onShow, 0); //对话框显示中...
    Modal.confirm({
        title: modalTitle,
        content: modalContent,
        closable: true,
        onOk,
        onCancel,
    })
}

function onOk() {
    props.globalObj.setModal({ show: false, result: true })
}
function onCancel() {
    props.globalObj.setModal({ show: false, result: false })
}
function onShow() {
    props.globalObj.setModal({ show: true })
}
</script>

<style>
</style>

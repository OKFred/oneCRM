<template>
    <a-modal
        :ok-text="langPack.modal.ok"
        :cancel-text="langPack.modal.cancel"
        v-model:visible="localObj.modal.visible"
        :destroyOnClose="true"
        width="50%"
        :title="localObj.modal.title"
        @ok="onOk"
        @cancel="onCancel"
        :closable="true"
        ><div v-if="localObj.modal.htmlContent" v-html="localObj.modal.htmlContent"></div>
        <div v-if="localObj.modal.content">{{ localObj.modal.content }}</div></a-modal
    >
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
        htmlContent: '',
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

function showModal(content, title, isHTML = true) {
    console.log('running')
    let modalContent = typeof content === 'object' ? JSON.stringify(content) : content
    let modalTitle = title !== undefined ? title : langPack.value.modal.title
    if (localObj.modal.visible) return false //当前已经有对话框了
    localObj.modal.title = modalTitle
    if (isHTML) {
        localObj.modal.htmlContent = modalContent
        localObj.modal.content = ''
    } else {
        localObj.modal.htmlContent = ''
        localObj.modal.content = modalContent
    }
    localObj.modal.visible = true;
    /* Modal.confirm({
        title: modalTitle,
        content: modalContent,
        closable: true,
        onOk,
        onCancel,
    }) */
}

function onOk() {
    props.globalObj.setModal({ result: true })
    localObj.modal.visible = false;
}
function onCancel() {
    props.globalObj.setModal({ result: false })
    localObj.modal.visible = false;
}
</script>

<style></style>

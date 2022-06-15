<template>
    <a-table
        :columns="localObj.tableColumns"
        :data-source="localObj.tableRows"
        bordered
        sticky
        class="ant-table-striped"
        :row-selection="{ onChange: onSelectChange, onSelectAll }"
    >
        <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">
                <a>{{ text }}</a>
            </template>
        </template>
        <template #title
            ><div>
                <span style="margin-bottom: 16px">
                    <a-tooltip placement="top">
                        <template #title>
                            <span>{{ langPack.table.header }}</span>
                        </template>
                        <a-button
                            type="primary"
                            :disabled="!localObj.selectedIndex.length"
                            :loading="localObj.loading"
                            @click="takeAction"
                        >
                            {{ localObj.actionName }}
                        </a-button>
                    </a-tooltip>
                </span>
            </div></template
        >
        <template #footer>
            <div style="display: flex; flex-direction: row; justify-content: space-between">
                <span>{{ langPack.table.footer }}</span>
                <span>
                    <template v-if="localObj.selectedIndex.length">
                        {{ `${langPack.table.selectCount}: ${localObj.selectedIndex.length}` }}
                    </template>
                </span>
            </div>
        </template>
    </a-table>
</template>

<script setup>
//模块引入
import { reactive, computed } from 'vue'
import languages from '@/views/customer/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})

//本地变量和函数
const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

const localObj = reactive({
    selectedIndex: [],
    loading: false,
    actionName: langPack.value.table.apply,
    tableRows: [
        {
            key: '0',
            name: 'John Brown',
            money: '￥300,000.00',
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '1',
            name: 'Jim Green',
            money: '￥1,256,000.00',
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            money: '￥120,000.00',
            address: 'Sidney No. 1 Lake Park',
        },
    ],
    tableColumns: [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Cash Assets',
            dataIndex: 'money',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ],
})

function takeAction() {
    console.log('执行操作...')
    localObj.loading = true
    localObj.actionName = langPack.value.table.applying
    setTimeout(endAction, 2000) //demo
}

function endAction() {
    console.log('操作完成')
    localObj.loading = false
    localObj.selectedIndex = []
    localObj.actionName = langPack.value.table.apply
}

function onSelectChange(selectedIndex) {
    console.log('已选择以下几列', selectedIndex)
    localObj.selectedIndex = selectedIndex
}

function onSelectAll(selectedIndex) {
    console.log('全选', selectedIndex)
}
</script>

<style scoped>
.ant-table-striped :deep(tr:nth-child(odd)) {
    background-color: #fafafa;
}
</style>

<template>
    <a-table
        class="ant-table-striped"
        rowKey="index"
        :row-selection="{
            onChange: localObj.tableFn.onSelectChange,
            onSelectAll: localObj.tableFn.onSelectAll,
        }"
        :customRow="
            (record, index) => {
                return {
                    style: {
                        'background-color':
                            localObj.table.todoList.length + record.index ==
                            localObj.table.tableRows.length
                                ? 'bisque'
                                : '',
                    },
                }
            }
        "
        :columns="localObj.table.tableColumns"
        :data-source="localObj.table.tableRows"
        :loading="localObj.table.loading"
        :selectedRowKeys="localObj.table.selectedRowKeys"
        :pagination="{
            showSizeChanger: localObj.table.showSizeChanger,
            showQuickJumper: localObj.table.showQuickJumper,
            pageSize: localObj.table.page_size,
            pageSizeOptions: localObj.table.pageSizeOptions,
            showTotal: localObj.table.showTotal,
            current: localObj.table.current_page,
            total: localObj.table.total_item,
            onShowSizeChange: localObj.table.onShowSizeChange,
            onChange: localObj.table.onChange,
        }"
        bordered
        sticky
        :scroll="{ y: 400 }"
        ><!-- 👆scroll固定表头&表格长度 -->
        <template #bodyCell="{ column, record, text }">
            <template v-if="column.dataIndex === 'index'">
                {{ text + 1 }}
            </template>
            <template v-if="column.dataIndex === 'name'">
                <a>{{ text }}</a>
            </template>
        </template>
        <template #title
            ><div>
                <span style="margin-bottom: 16px">
                    <a-tooltip placement="top">
                        <template #title>
                            <span>{{ localObj.table.header }}</span>
                        </template>
                        <a-button
                            type="primary"
                            :disabled="
                                !localObj.table.selectedRowKeys ||
                                !localObj.table.selectedRowKeys.length
                            "
                            :loading="localObj.table.loading"
                            @click="localObj.tableFn.takeAction"
                        >
                            {{ localObj.table.actionName }}
                        </a-button>
                    </a-tooltip>
                    <span v-if="localObj.table.todoList"
                        >当前任务数：{{ localObj.table.todoList.length }}</span
                    >
                </span>
            </div></template
        >
        <template #footer>
            <div style="display: flex; flex-direction: row; justify-content: space-between">
                <span>
                    <template
                        v-if="
                            localObj.table.selectedRowKeys && localObj.table.selectedRowKeys.length
                        "
                    >
                        {{
                            `${langPack.table.selectCount}: ${localObj.table.selectedRowKeys.length}`
                        }}
                    </template>
                </span>
                <span style="font-weight: bold; color: orangered; font-size: 1rem">{{
                    localObj.table.footer
                }}</span>
            </div>
        </template>
    </a-table>
</template>

<script setup>
//模块引入
import { reactive, computed, onBeforeMount, onActivated } from 'vue'
import languages from '@/views/customer/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
    localObj: Object,
})

//本地变量和函数
const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

onBeforeMount(() => {
    /* 表格相关 */
    let localObj = props.localObj
    localObj.table = {
        header: '工具栏',
        footer: '客户管理表',
        selectedRowKeys: [],
        loading: false,
        actionName: langPack.value.table.apply,
        tableRows: [],
        tableColumns: [],
        tableCaption: '', //表格 标题

        page_size: 5, //表格 实际页大小
        current_page: 1, //表格 当前页
        total_item: 11, //表格 客户总数
        todoList: '', //表格 所有客户
        //antd table 相关
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '25', '100'],
        showTotal: () => `共${localObj.table.total_item}条`,
        onShowSizeChange: (current_page, page_size) => {
            localObj.table.page_size = page_size
            //localObj.searchFn.queryPrivate()
        },
        onChange: (current_page) => {
            localObj.table.current_page = current_page
            //localObj.searchFn.queryPrivate()
        },
    }
    localObj.tableFn = {
        loadData: function loadData() {
            let rowArr = [
                {"companyName": "Angel Align Limited","countryCN": "英国","localTime": "2023-03-06 17:20:00","lastSingleContactTime": "2023-03-06 17:59:00","lastMemo": "待进一步联系",},
                {"companyName": "Best Sale Online Co., Ltd.","countryCN": "法国","localTime": "2023-03-06 18:20:00","lastSingleContactTime": "2023-03-06 15:30:00","lastMemo": "需要介绍",},
                {"companyName": "Interesting No.1 LLC","countryCN": "美国","localTime": "2023-03-06 12:20:00","lastSingleContactTime": "2023-03-06 22:33:00","lastMemo": "财大气粗",},
                {"companyName": "Royal Machine GMBH","countryCN": "德国","localTime": "2023-03-06 18:20:00","lastSingleContactTime": "2023-03-06 16:14:00","lastMemo": "优质客户",},
                {"companyName": "Italian Food Trade SRL","countryCN": "意大利","localTime": "2023-03-06 18:20:00","lastSingleContactTime": "2023-03-06 16:42:00","lastMemo": "热情好客",},
                {"companyName": "hongfeng Food Co.,Ltd.","countryCN": "中国","localTime": "2023-03-06 23:20:00","lastSingleContactTime": "2023-03-06 09:39:00","lastMemo": "需要面谈",},
                {"companyName": "Financial handler SG Ltd","countryCN": "新加坡","localTime": "2023-03-06 23:20:00","lastSingleContactTime": "2023-03-06 10:10:00","lastMemo": "资金待就位",},
                {"companyName": "Cooling LED SARL","countryCN": "西班牙","localTime": "2023-03-06 18:20:00","lastSingleContactTime": "2023-03-06 17:55:00","lastMemo": "晚点联系",},
                {"companyName": "Canadian Honey Seller Co.","countryCN": "加拿大","localTime": "2023-03-06 11:20:00","lastSingleContactTime": "2023-03-06 07:59:00","lastMemo": "需要咨询",},
                {"companyName": "Japan Noodles","countryCN": "日本","localTime": "2023-03-06 00:20:00","lastSingleContactTime": "2023-03-06 13:36:00","lastMemo": "最近在出差",},
                {"companyName": "Thailand Fruit Trading","countryCN": "泰国","localTime": "2023-03-06 22:20:00","lastSingleContactTime": "2023-03-06 11:23:00","lastMemo": "待开发",}
            ]
            localObj.table.tableRows = localObj.tableFn.rowFormatter(rowArr)
            localObj.table.tableColumns = localObj.tableFn.columnFormatter()
        },
        rowFormatter: function rowFormatter(rowArr, obj) {
            let rows = [...rowArr]
            rows = rows.map((rowObj, index) => {
                return {
                    ...rowObj,
                    index,
                }
            })
            if (obj) {
            }
            return rows
        }, //表格列定义

        columnFormatter: function columnFormatter(obj) {
            let columns = []
            if (true /*localObj.search.searchArea === 'private'*/) {
                columns = [
                    { title: '#', dataIndex: 'index', width: 50 },
                    { title: '公司名', dataIndex: 'companyName', ellipsis: true },
                    { title: '国家', dataIndex: 'countryCN', ellipsis: true },
                    { title: '当地时间', dataIndex: 'localTime', ellipsis: true },
                    {
                        title: '跟进时间',
                        dataIndex: 'lastSingleContactTime',
                        ellipsis: true,
                    },
                    { title: '小记', dataIndex: 'lastMemo', ellipsis: true },
                ]
            }
            if (obj) {
            }
            return columns
        }, //表格列定义

        //表格函数
        takeAction: function takeAction() {
            console.log('执行操作...')
            localObj.table.loading = true
            localObj.table.actionName = langPack.value.table.applying
            setTimeout(localObj.tableFn.endAction, 2000) //demo
        },

        endAction: function endAction() {
            console.log('操作完成')
            localObj.table.loading = false
            console.log(localObj.table.selectedRowKeys)
            localObj.table.selectedRowKeys = []
            console.log(localObj.table.selectedRowKeys)
            localObj.table.actionName = langPack.value.table.apply
        },

        onSelectChange: function onSelectChange(selectedRowKeys, dataArr) {
            console.log('已选择以下几列', selectedRowKeys)
            localObj.table.selectedRowKeys = selectedRowKeys
        },

        onSelectAll: function onSelectAll(selectedRowKeys) {
            console.log('全选', selectedRowKeys)
        },
        onFollowUp: function onFollowUp(e) {
            let id = e.target.innerText
        },
    }
})

onActivated(() => {
    let localObj = props.localObj
    setTimeout(()=>localObj.tableFn.loadData(), 1234)
})
</script>

<style scoped>
.ant-table-striped :deep(tr:nth-child(odd)) {
    background-color: #fafafa;
}
</style>

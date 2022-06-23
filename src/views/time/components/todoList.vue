<template>
    <a-timeline v-if="localObj.todoToday && localObj.todoToday.length">
        <a-timeline-item
            v-for="todoObj of localObj.todoToday"
            :color="Math.abs(todoObj.when - new Date().valueOf()) < 3600000 ? 'red' : 'blue'"
            title="双击删除该待办"
            @dblclick="onTodoCancel(todoObj.todoId)"
            :style="{
                paddingBottom: '15px',
                backgroundColor:
                    todoObj.when <
                    new Date(
                        `${new Date().getFullYear().toString()}-${
                            new Date().getMonth() < 9
                                ? '0' + (new Date().getMonth() + 1).toString()
                                : (new Date().getMonth() + 1).toString()
                        }-${new Date().getDate().toString()} 00:00:00`,
                    ).valueOf()
                        ? 'snow'
                        : 'aliceblue',
            }"
        >
            <template #dot v-if="Math.abs(todoObj.when - new Date().valueOf()) < 3600000"
                ><clock-circle-outlined style="font-size: 16px"
            /></template>
            {{ new Date(todoObj.when).Format('hh:mm') }} {{ todoObj.companyName }}
            {{ todoObj.message }}
            <template #dot v-if="todoObj.VIP"
                ><font-awesome-icon
                    icon="circle-exclamation"
                    style="font-size: 16px; color: orangered" /></template
        ></a-timeline-item>
    </a-timeline>
    <div>
        <a-date-picker
            show-time
            placeholder="日程时间"
            style="padding: 10px"
            @change="onTimeChange"
        />
        <a-input
            type="text"
            placeholder="日程内容"
            style="padding: 10px; width: 30%"
            @change="onMessageChange"
        />
        <a-checkbox @change="onVIPChange" style="padding: 10px">VIP</a-checkbox>
        <a-button type="primary" size="large" style="margin: 10px" @click="onNewTodoAdd"
            >添加</a-button
        >
    </div>
</template>
<script setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue'
//父系入参
const props = defineProps({
    globalObj: Object,
    localObj: Object,
})

const onTimeChange = (value, dateString) => {
    //console.log('Selected Time: ', value, dateString)
    initializeNewTodo()
    props.localObj.newTodo.when = new Date(dateString).valueOf()
}
const onMessageChange = (e) => {
    //console.log('message', e.target.value)
    initializeNewTodo()
    let message = e.target.value
    props.localObj.newTodo.message = message
}
const onVIPChange = (e) => {
    initializeNewTodo()
    let VIP = e.target.checked
    props.localObj.newTodo.VIP = VIP
}

const onNewTodoAdd = () => {
    if (!props.localObj.newTodo) return
    let { message, todoId, when, VIP } = props.localObj.newTodo
    props.localObj.newTodo.todoId = 'todo' + Math.random().toFixed(5)
    if (!message || !when) return queryResult(false, '缺少关键信息')
    VIP = !!VIP
    makeTodo({ message, when, todoId, VIP })
}
function makeTodo({ message, when, todoId, VIP }) {
    let now = new Date().getTime()
    let timeObj = {
        time: now,
        when: when,
    }
    let infoObj = {
        message: message,
        VIP,
        todoId,
    }

    let writeObj = { ...timeObj, ...infoObj }
    props.localObj.todoToday.push(writeObj)
    return
    let queryObj = { request: {}, response: {} }
    queryObj.request.args = [[{ [todoId]: writeObj }], 'write', loginId]
    queryObj.request.ns = ['syncData']
}

function onTodoCancel(todoId) {
    props.localObj.todoToday = props.localObj.todoToday.filter((obj) => obj.todoId !== todoId)
}

function initializeNewTodo() {
    if (!props.localObj.newTodo) props.localObj.newTodo = {}
}
</script>

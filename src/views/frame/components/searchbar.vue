<template>
    <div>
        <span
            v-if="!localObj.search.show"
            class="logo-icon"
            :style="{fontSize: '1.5rem', color: 'Dodgerblue', marginLeft: '20px', transition: 'padding ease-in-out 225ms'}"
            @click="toggleSearchShow"
        >
            <font-awesome-icon icon="magnifying-glass" />
        </span>
        <a-input-search
            v-if="localObj.search.show"
            v-model:value="value2"
            :size="globalObj.breaked ? 'default' : 'large'"
            placeholder="input search text"
            enter-button
            @search="onSearch"
        >
            <template #addonBefore>
                <a-select v-model:value="value3" style="width: 90px">
                    <a-select-option value="Email">Email</a-select-option>
                    <a-select-option value="Company">Company</a-select-option>
                </a-select>
            </template>
        </a-input-search>
    </div>
</template>

<script setup>
//模块引入
import { ref, reactive, watch } from 'vue'

//父系入参
const props = defineProps({
    globalObj: Object,
})

//本地变量和函数
let localObj = reactive({
    search: {
        show: true,
    },
})
const value1 = ref('')
const value2 = ref('mysite')
const value3 = ref('Email')

watch(
    () => props.globalObj.breaked,
    (newValue, oldValue) => {
        console.log('断点了？', newValue)
        localObj.search.show = !newValue;
        /* ... */
    },
)

const onSearch = (searchValue) => {
    console.log('use value', searchValue)
    console.log('or use this.value', value1.value)
    toggleSearchShow();
}

function toggleSearchShow() {
    localObj.search.show = !localObj.search.show
}
</script>

<style>
.ant-select-dropdown {
    z-index: 1090;
}
</style>

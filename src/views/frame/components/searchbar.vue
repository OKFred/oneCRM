<template>
    <div>
        <span
            v-if="!localObj.search.show"
            class="logo-icon"
            :style="{
                fontSize: '1.5rem',
                color: 'Dodgerblue',
                marginLeft: '20px',
                transition: 'padding ease-in-out 225ms',
            }"
            @click="toggleSearchShow"
        >
            <font-awesome-icon icon="magnifying-glass" />
        </span>
        <a-dropdown v-model:visible="localObj.dropdown.show" :placement="'bottomLeft'">
            <template #overlay>
                <a-menu>
                    <a-menu-item key="1" @click="onSearch(localObj.search.value, 'email')">
                        <font-awesome-icon icon="magnifying-glass" />{{ langPack.search.email }}
                        {{ localObj.search.value }}
                    </a-menu-item>
                    <a-menu-item key="2" @click="onSearch(localObj.search.value, 'customer')"
                        ><font-awesome-icon icon="magnifying-glass" />{{
                            langPack.search.customer
                        }}
                        {{ localObj.search.value }}</a-menu-item
                    >
                    <a-menu-item key="3" @click="onSearch(localObj.search.value, 'order')"
                        ><font-awesome-icon icon="magnifying-glass" />{{ langPack.search.order }}
                        {{ localObj.search.value }}</a-menu-item
                    >
                </a-menu>
            </template>
        </a-dropdown>
        <a-input-search
            style="width: 88%"
            class="search-input"
            v-if="localObj.search.show"
            v-model:value="localObj.search.value"
            :size="globalObj.breaked ? 'default' : 'large'"
            :placeholder="langPack.search.placeholder"
            enter-button
            @change="onInputChange"
            @search="(v) => onSearch(v)"
        />
    </div>
</template>

<script setup>
//模块引入
import { ref, reactive, watch, computed } from 'vue'
import languages from '@/views/frame/languages.js'

//父系入参
const props = defineProps({
    globalObj: Object,
})

//本地变量和函数
let localObj = reactive({
    search: {
        show: true,
        value: '',
        backgroundColor: 'grey',
    },
    dropdown: {
        show: false,
    },
})

const langPack = computed(() => {
    return languages[props.globalObj.locale]
})

watch(
    () => props.globalObj.breaked,
    (newValue, oldValue) => {
        //console.log('断点了？', newValue)
        localObj.search.show = !newValue
        /* ... */
    },
)

const onSearch = (searchValue, searchType) => {
    if (searchType) console.log('搜索分类', searchType)
    if (searchValue !== undefined) console.log('搜索了：', searchValue)
    else console.log('什么也没输入')
    if (props.globalObj.breaked) toggleSearchShow()
}

function toggleSearchShow() {
    localObj.search.show = !localObj.search.show
}

function onInputChange(e) {
    let value = e.target.value
    localObj.dropdown.show = !!value
}
</script>

<style>
.search-input > span > input {
    background-color: var(--text-dark);
    border-radius: 5px;
}

.search-input > span > input:focus,
.search-input > span > input:hover {
    background-color: var(--text-light) !important;
}

.ant-dropdown-placement-bottomLeft {
    z-index: 1090 !important;
}
</style>

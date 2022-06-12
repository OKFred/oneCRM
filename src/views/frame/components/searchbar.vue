<template>
    <a-input-search
        v-model:value="value2"
        size="large"
        placeholder="input search text"
        enter-button
        @search="onSearch"
    >
        <template #addonBefore>
                <a-select v-model:value="value3" style="width: 90px">
                    <a-select-option value="Http://">Http://</a-select-option>
                    <a-select-option value="Https://">Https://</a-select-option>
                </a-select>
        </template>
    </a-input-search>
</template>
<script setup>
import { ref } from 'vue'
const value = ref('')

const onSearch = (searchValue) => {
    console.log('use value', searchValue)
    console.log('or use this.value', value.value)
}
const value2 = ref('mysite')
const value3 = ref('Http://')
</script>

<style>
.ant-select-dropdown {
    z-index: 1090;
}
</style>
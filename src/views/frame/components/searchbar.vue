<template>
    <a-input-search v-model:value="value" size="large" placeholder="input search text" enter-button
        @search="onSearch" />
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        const value = ref('');

        const onSearch = searchValue => {
            console.log('use value', searchValue);
            console.log('or use this.value', value.value);
        };

        return {
            value,
            onSearch,
        };
    },

});
</script>
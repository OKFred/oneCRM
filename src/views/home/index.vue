<template>
    <div style="height: 100%">
        this is home
        <br />
        <homeChart :globalObj="globalObj" />
    </div>
</template>

<script setup>
import { reactive, computed, onMounted, onActivated, onDeactivated, onUpdated } from 'vue'
import languages from '@/views/home/languages.js'
import homeChart from '@/views/home/components/homeChart.vue'

//父系入参
const props = defineProps({
    globalObj: Object,
})
//本地变量和函数
let localObj = reactive({ name: 'home', chart: null })

const langPack = computed(() => {
    return languages[props.globalObj.locale.language]
})

onUpdated(() => {
    console.log('home: onUpdated')
})
onMounted(() => {
    console.log('home: onMounted')
})
onActivated(() => {
    console.log('home: onActivated')
})
onDeactivated(() => {
    console.log('home: onDeactivated')
})

</script>

<style scoped>
.site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
}

#components-layout-demo-top .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
    float: right;
    margin: 16px 0 16px 24px;
}
</style>

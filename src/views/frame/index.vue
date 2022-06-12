<template>
    <div style="height: 100%">
        <div
            name="header"
            style="
                background-color: rgb(0, 21, 41);
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;
                box-sizing: border-box;
                flex-shrink: 0;
                position: fixed;
                z-index: 1080;
                top: 0px;
                left: auto;
                right: 0px;
            "
        >
            <logo-bar
                :style="{
                    paddingLeft: '10px',
                    paddingRight: pageObj.logoPaddingRight,
                }"
            />
            <search-bar
                :globalObj="globalObj"
                :style="{
                    paddingLeft: '10px',
                    paddingRight: '50px',
                    transition: 'padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                }"
            />
            <setting-bar
                :globalObj="globalObj"
                style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    align-content: center;
                    padding-left: 50px;
                    background-color: seashell;
                    border-radius: 30px;
                    height: 50px;
                    margin-right: 50px;
                "
            />
        </div>
        <a-layout-sider
            breakpoint="md"
            collapsed-width="0"
            style="
                position: fixed;
                height: 100%;
                top: 70px;
                transition: margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
                z-index: 1080;
            "
        ><div style="color: red; font-size: 22px;">{{count}}</div>
            <side-bar :globalObj="globalObj" :setLocale="setLocale" :increment="increment" :fatherCount="count" />
        </a-layout-sider>
        <a-layout
            class="layout"
            :style="{
                borderRadius: '8px',
                backgroundColor: 'rgb(227, 242, 253)',
                paddingLeft: pageObj.layoutLeft,
                paddingTop: '75px',
                transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
            }"
            breakpoint="md"
        >
            <a-layout-content style="padding: 20px">
                <div style="background-color: #fff; padding: 24px; border-radius: 16px">
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" :globalObj="globalObj" />
                        </keep-alive>
                    </router-view>
                </div>
                <a-layout-footer style="width: 100%; background-color: rgb(227, 242, 253)">
                    <footer-bar />
                </a-layout-footer>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script setup>
//模块引入
import { ref, reactive } from 'vue'
import logoBar from '@/views/frame/components/logobar.vue'
import searchBar from '@/views/frame/components/searchbar.vue'
import settingBar from '@/views/frame/components/settingbar.vue'
import sideBar from '@/views/frame/components/sidebar.vue'
import footerBar from '@/views/frame/components/footerbar.vue'

//父系入参
const props = defineProps({
    globalObj: Object,
    setLocale: Function,
})

    //本地变量和函数
const count = ref(0)
const increment = () => {
count.value++
}
let pageObj = reactive({
    layoutLeft: '200px',
    logoPaddingRight: '130px',
})

const onBreakpoint = (broken) => {
    //console.log('onBreakpoint', broken)
    pageObj.layoutLeft = broken ? '0px' : '200px'
    pageObj.logoPaddingRight = broken ? '0px' : '130px'
} //断点处理

window.matchMedia('(max-width: 768px)').addEventListener('change', (e) => {
    e.matches ? onBreakpoint(true) : onBreakpoint(false)
}) //使用媒体查询监听器，实现响应式布局
</script>

<style>
html,
body,
#app {
    height: 100%;
    background-color: rgb(227, 242, 253);
}
</style>

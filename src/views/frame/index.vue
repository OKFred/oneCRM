<template>
    <div style="height: 100%">
        <div
            class="frame-header"
            style="
                background-color: rgb(0, 21, 41);
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;
                height: 75px;
                position: fixed;
                z-index: 1080;
                top: 0px;
                right: 0px;
            "
        >
            <logo-bar
                class="frame-logo-bar"
                style="display: flex; flex-direction: row; align-items: center; padding-left: 10px"
                :globalObj="globalObj"
            />
            <search-bar
                class="frame-search-bar"
                :globalObj="globalObj"
                :style="{
                    width: '100%',
                    transition: ' padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                    paddingLeft: globalObj.breaked ? '5px' : '25px',
                    marginLeft: globalObj.breaked ? '0px' : '10px',
                }"
            />
            <setting-bar
                class="frame-setting-bar"
                :globalObj="globalObj"
                :style="{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: 'seashell',
                    borderRadius: '30px',
                    height: '40px',
                    paddingLeft: '40px',
                    paddingRight: '40px',
                    marginLeft: globalObj.breaked ? '5px' : '40px',
                    marginRight: globalObj.breaked ? '5px' : '40px',
                }"
            />
        </div>
        <a-layout-sider
            width="180"
            breakpoint="md"
            @breakpoint="onBreakpoint"
            v-model:collapsed="globalObj.sidebarCollapse"
            collapsed-width="0"
            style="position: fixed; height: 100%; top: 71px; z-index: 1080"
        >
            <side-bar :globalObj="globalObj" />
        </a-layout-sider>
        <a-layout
            class="frame-content"
            :style="{
                borderRadius: '8px',
                backgroundColor: 'rgb(227, 242, 253)',
                marginTop: '80px',
                transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                marginLeft: localObj.content.marginLeft,
            }"
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
                    <footer-bar class="frame-foot-bar" />
                </a-layout-footer>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script setup>
//模块引入
import { reactive, watch } from 'vue'
import logoBar from '@/views/frame/components/logobar.vue'
import searchBar from '@/views/frame/components/searchbar.vue'
import settingBar from '@/views/frame/components/settingbar.vue'
import sideBar from '@/views/frame/components/sidebar.vue'
import footerBar from '@/views/frame/components/footerbar.vue'

//父系入参
const props = defineProps({
    globalObj: Object,
})

//本地变量和函数
let localObj = reactive({
    content: {
        marginLeft: '180px',
    },
})

watch(
    () => props.globalObj.sidebarCollapse,
    (newValue, oldValue) => {
        //console.log('sidebar 已收起?', newValue)
        localObj.content.marginLeft = newValue ? '0px' : props.globalObj.breaked ? '0px' : '180px'
    },
)

function onBreakpoint(broken) {
    props.globalObj.setBreaked(broken)
    localObj.content.marginLeft = broken ? '0px' : '180px'
} //分辨率断点
</script>

<style>
:root {
    font-size: 16px;
    font-family: 等线, sans-serif;
    --text-dark: rgb(0, 21, 41);
    --text-light: rgb(255, 255, 255);
    --bg-dark: rgb(0, 21, 41);
    --bg-light: rgb(227, 242, 253);
}

html,
body,
#app {
    height: 100%;
    background-color: rgb(227, 242, 253);
    margin: 0;
    padding: 0;
}

body::-webkit-scrollbar {
    width: 0.5rem;
}

body::-webkit-scrollbar-track {
    background-color: #ccc;
}

body::-webkit-scrollbar-thumb {
    background-color: #ccc;
}
</style>

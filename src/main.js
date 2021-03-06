import { createApp } from 'vue'
import router from './router/index'
import FontAwesomeIcon from "./fontawesome";
import App from './App.vue'
import Antd from 'ant-design-vue';

createApp(App)
    .use(router) //安装路由
    .use(Antd) //安装antd
    .component("FontAwesomeIcon", FontAwesomeIcon) //安装FontAwesomeIcon
    .mount('#app')

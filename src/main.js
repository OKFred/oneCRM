import { createApp } from 'vue'
import router from './router/index'
import FontAwesomeIcon from "./fontawesome";
import App from './App.vue'

createApp(App)
    .use(router) //安装路由
    .component("FontAwesomeIcon", FontAwesomeIcon) //安装FontAwesomeIcon
    .mount('#app')

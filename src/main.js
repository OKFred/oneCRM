import { createApp } from 'vue'
import router from './router/index'
import FontAwesomeIcon from "./fontawesome";
import App from './App.vue'

createApp(App)
    .use(router)
    .component("FontAwesomeIcon", FontAwesomeIcon)
    .mount('#app')

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/setting/index.vue'),
        meta: {
            title: '设置'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
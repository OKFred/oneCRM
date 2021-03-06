import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login.html',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/home.html',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/customer.html',
        name: 'Customer',
        component: () => import('@/views/customer/index.vue'),
        meta: {
            title: '客户管理'
        }
    },
    {
        path: '/time.html',
        name: 'Time',
        component: () => import('@/views/time/index.vue'),
        meta: {
            title: '时间管理'
        }
    },
    {
        path: '/revenue.html',
        name: 'Revenue',
        component: () => import('@/views/revenue/index.vue'),
        meta: {
            title: '业绩'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
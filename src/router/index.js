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
        path: '/customer',
        name: 'Customer',
        component: () => import('@/views/customer/index.vue'),
        meta: {
            title: '客户'
        }
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/order/index.vue'),
        meta: {
            title: '订单'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
            title: '我的'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
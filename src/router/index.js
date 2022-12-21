import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/inicio',
        name: 'inicio',
        component: () => import('../layouts/Principal.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/detalle/:id',
        name: 'item',
        component: () => import('../views/Detalle.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.auth) {
            next()
        }
        else {
            next({ name: 'register' })
        }
    }
    else {
        next()
    }
})

export default router
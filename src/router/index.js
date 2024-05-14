import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'welcome',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/Dashboard.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/users',
            name: 'users',
            component: () => import('../views/UsersView.vue')
        },
        {
            path: '/user/:id',
            name: 'user',
            component: () => import('../views/UserView.vue')
        },
        {
            path: '/create-user',
            name: 'create-user',
            component: () => import('../views/CreateUserView.vue')
        },
        {
            path: '/products',
            name: 'products',
            component: () => import('../views/ProductsView.vue')
        }
        ]
})

export default router
// {
//     path: '/about',
//         name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (About.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import('../views/AboutView.vue')
// }
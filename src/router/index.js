import { createRouter,createWebHistory } from "vue-router";
import LoginPage from '../components/LoginPage.vue'
import SignUpPage from '../components/SignUpPage.vue'

const routes = [
    {path: '/', redirect: '/login'},
    {
        path: '/login',
        name: 'Login', 
        component: LoginPage,
        meta: {title: 'Login - Gaming Portal'}
    },
    {
        path: '/signup',
        name: 'SignUp', 
        component: SignUpPage,
        meta: {title: 'SignUP - Gaming Portal'}
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.afterEach((to) => {
    document.title = to.meta.title || 'Gaming Portal'; // Fallback jika tidak ada meta title
});


export default router
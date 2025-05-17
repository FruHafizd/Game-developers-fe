import { createRouter,createWebHistory } from "vue-router";
import LoginPage from '../components/LoginPage.vue'
import SignUpPage from '../components/SignUpPage.vue'
import DashboardAdmin from '../components/AdministratorPortal/IndexPage.vue'
import ListAdmin from '../components/AdministratorPortal/ListAdminPage.vue'
import ListUser from '../components/AdministratorPortal/AdminListUserPage.vue'
import ManageUser from '../components/AdministratorPortal/AdminManageUserPage.vue'

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
    {
        path: '/admin/list-admin',
        name: 'ListAdmin', 
        component: ListAdmin,
        meta: {title: 'Admin List Admin - Gaming Portal'}
    },
    {
        path: '/admin/dashboard',
        name: 'Dashboard', 
        component: DashboardAdmin,
        meta: {title: 'Admin Dashboard Admin - Gaming Portal'}
    },
    {
        path: '/admin/list-user',
        name: 'ListUser', 
        component: ListUser,
        meta: {title: 'Admin List User - Gaming Portal'}
    },
    {
        path: '/admin/add-user',
        name: 'ManageUser', 
        component: ManageUser,
        meta: {title: 'Admin Manage User - Gaming Portal'}
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
import { createRouter,createWebHistory } from "vue-router";
import LoginPage from '../components/LoginPage.vue'
import SignUpPage from '../components/SignUpPage.vue'
import DashboardAdmin from '../components/AdministratorPortal/IndexPage.vue'
import ListAdmin from '../components/AdministratorPortal/ListAdminPage.vue'
import ListUser from '../components/AdministratorPortal/AdminListUserPage.vue'
import ManageUser from '../components/AdministratorPortal/AdminManageUserPage.vue'
import DetailGame from '../components/GamingPortal/DetailGamesPage.vue'
import DiscoverGame from '../components/GamingPortal/DiscoverGamesPage.vue'
import DashboarUser from '../components/GamingPortal/IndexPage.vue'
import ManageGamesFormUpdate from '../components/GamingPortal/ManageGamesFormUpdatePage.vue'
import ManageGamesForm from '../components/GamingPortal/ManageGamesFormPage.vue'
import ManageGames from '../components/GamingPortal/ManageGamesPage.vue'
import Profile from '../components/GamingPortal/ProfilePage.vue'

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

    {
        path: '/detail-games',
        name: 'DetailGames',
        component: DetailGame,
        meta: {title: 'Detail Game - Gaming Portal'}
    },
    {
        path: '/discover-games',
        name: 'DiscoverGames',
        component: DiscoverGame,
        meta: {title: 'Manage Games - Gaming Portal'}
    },
    {
        path: '/dashboard',
        name: 'DashboarUser',
        component: DashboarUser,
        meta: {title: 'Dashboard - Gaming Portal'}
    },
    {
        path: '/manage-games-form-update',
        name: 'ManageGamesFormUpdate',
        component: ManageGamesFormUpdate,
        meta: {title: 'Manage Games - Gaming Portal'}
    },
    {
        path: '/manage-games-form',
        name: 'ManageGamesForm',
        component: ManageGamesForm,
        meta: {title: 'Manage Games - Gaming Portal'}
    },
    {
        path: '/manage-games',
        name: 'ManageGames',
        component: ManageGames,
        meta: {title: 'Manage Games - Gaming Portal'}
    },

    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {title: 'Profile - Gaming Portal'}
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
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './css/style.css'
import './css/bootstrap.css'
import './js/bootstrap'
import './js/popper'

createApp(App).use(router).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './css/style.css'
import './css/bootstrap.css'

createApp(App).use(router).mount('#app')

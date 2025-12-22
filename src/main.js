// File: src/main.js
import { createApp } from 'vue'
import './style.css'
import App from './app.vue'
import router from './router' // <--- Kita import router tadi

const app = createApp(App)

app.use(router) // <--- Kita suruh Vue pake routernya
app.mount('#app')
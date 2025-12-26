import './assets/main.css'

import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import api from './plugins/axios'
import App from './App.vue'
import router from './router'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
const app = createApp(App)
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
app.use(router)
app.config.globalProperties.$axios = api;
app.mount('#app')

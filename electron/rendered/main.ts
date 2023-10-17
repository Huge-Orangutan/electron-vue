import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import naive from 'naive-ui'
createApp(App).use(createPinia()).use(naive).mount('#app')

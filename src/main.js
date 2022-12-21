import { createApp } from 'vue'
import './style.css'
import router from './router'
import fontawesome from './utils/fontawesome'
import App from './App.vue'

createApp(App)
    .use(router)
    .component(fontawesome[0], fontawesome[1])
    .mount('#app')

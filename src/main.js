import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locale'
import '@/assets/css/global.less';
import store from './store'
import router from './router'
import '@/assets/iconsvg/iconfont.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(i18n)


app.mount('#app')

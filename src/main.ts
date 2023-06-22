import { createApp } from 'vue'
import App from './App.vue'
import layouts from '~/layouts/index'
import { router } from '@/plugins/router'
import pinia from '@/plugins/pinia'
import vuetify from '@/plugins/vuetify'
import Notifications from '@kyvg/vue3-notification'
import '@/assets/styles/styles.scss'
import locales from './locales/index'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(layouts)
app.use(vuetify)
app.use(Notifications)
app.use(locales)

app.mount('#app')

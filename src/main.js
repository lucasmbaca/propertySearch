import './assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'


//VUETIFY
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives
})

//FIREBASE
app.use(VueFire, {
    firebaseApp,
    modules:[VueFireAuth()]
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')

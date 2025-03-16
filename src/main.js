import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/styles.scss'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Field, ErrorMessage } from 'vee-validate'
import GAuth from 'vue3-google-oauth2'
import { CLIENT_ID } from './services/auth'
import './vee-validate-config'

// Config de OAuth2
const gAuthOptions = {
  clientId: CLIENT_ID, // Reemplaza con tu Client ID
  scope: 'https://www.googleapis.com/auth/books', // para acceder a Google Books
  prompt: 'consent', // Solicitar consentimiento explícito
  fetch_basic_profile: true, // Obtener info básica del perfil
  debug: true, // depuración
}

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

app.use(router)

// Usar la autenticación de Google
app.use(GAuth, gAuthOptions)

app.mount('#app')

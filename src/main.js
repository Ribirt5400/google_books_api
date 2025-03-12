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

// Configuración de OAuth2
const gAuthOptions = {
  clientId: CLIENT_ID, // Reemplaza con tu Client ID
  scope: 'https://www.googleapis.com/auth/books', // Alcance para acceder a Google Books
  prompt: 'consent', // Solicitar consentimiento explícito
  fetch_basic_profile: true, // Obtener información básica del perfil
  debug: true, // Habilita la depuración
}

// Crear la aplicación
const app = createApp(App)

// Usar Pinia para el manejo del estado
const pinia = createPinia()
app.use(pinia)

// Usar el router
app.use(router)

// Registrar componentes globales de vee-validate
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)

// Usar la autenticación de Google
app.use(GAuth, gAuthOptions)

// Montar la aplicación
app.mount('#app')

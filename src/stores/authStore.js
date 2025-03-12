import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null, // Obtiene el token al iniciar
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token) // Almacena el token en localStorage
    },
    setUser(user) {
      this.user = user
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token') // Elimina el token de localStorage
      this.router.push('/login') // Redirige al usuario a la página de inicio de sesión
    },
    async checkToken() {
      if (this.token) {
        try {
          const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo', {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          if (!response.ok) {
            this.logout() // Si el token es inválido, cierra la sesión
          }
        } catch (error) {
          this.logout() // Si hay un error, cierra la sesión
        }
      }
    },
    isAuthenticated() {
      return !!this.token // Devuelve true si hay un token
    },
  },
})

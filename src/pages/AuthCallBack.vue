<template>
    <div>Cargando...</div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'

export default {
    mounted() {
        // Extraer el token de la URL
        const hash = window.location.hash.substring(1)
        const params = new URLSearchParams(hash)
        const accessToken = params.get('access_token')

        if (accessToken) {
            // Guardar el token en Pinia
            const authStore = useAuthStore()
            authStore.setToken(accessToken)

            // Redirigir al usuario a la página principal
            this.$router.push('/profile')
        } else {
            console.error('Error: No se recibió el token de Google')
            this.$router.push('/login')
        }
    }
}
</script>
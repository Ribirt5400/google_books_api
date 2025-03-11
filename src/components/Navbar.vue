<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-logo">Mi App de Libros</router-link>
        </div>
        <div class="navbar-links">
            <router-link to="/">Inicio</router-link>
            <router-link to="/profile" v-if="isAuthenticated">Perfil</router-link>
            <router-link to="/login" v-if="!isAuthenticated">Iniciar sesión</router-link>
            <router-link to="/register" v-if="!isAuthenticated">Registrarse</router-link>
            <button v-if="isAuthenticated" @click="logout">Cerrar sesión</button>
        </div>
    </nav>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'; // Importa el store de autenticación

export default {
    name: 'Navbar',
    computed: {
        isAuthenticated() {
            const authStore = useAuthStore();
            return authStore.token !== null; // Verifica si el usuario está autenticado
        },
    },
    methods: {
        logout() {
            const authStore = useAuthStore();
            authStore.logout(); // Cierra la sesión del usuario
            this.$router.push('/login'); // Redirige a la página de inicio de sesión
        },
    },
};
</script>
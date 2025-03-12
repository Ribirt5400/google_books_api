<template>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">Mi App de Libros</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse show" id="navbarNav"> <!-- Agregar `show` para evitar errores -->
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Inicio</router-link>
                    </li>
                    <li class="nav-item" v-if="isAuthenticated">
                        <router-link to="/profile" class="nav-link">Perfil</router-link>
                    </li>
                    <li class="nav-item" v-if="!isAuthenticated">
                        <router-link to="/login" class="nav-link">Iniciar sesión</router-link>
                    </li>
                    <li class="nav-item" v-if="!isAuthenticated">
                        <router-link to="/register" class="nav-link">Registrarse</router-link>
                    </li>
                    <li class="nav-item" v-if="isAuthenticated">
                        <a href="#" class="nav-link" @click="logout">Cerrar sesión</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>


<script>
import { useAuthStore } from '@/stores/authStore';

export default {
    name: 'Navbar',
    computed: {
        isAuthenticated() {
            const authStore = useAuthStore();
            return authStore.isAuthenticated();
        },
    },
    methods: {
        logout() {
            const authStore = useAuthStore();
            authStore.logout();
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
@import './../assets/styles.scss';

/* Fondo con un tono madera oscuro para un estilo clásico */
</style>

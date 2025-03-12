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
/* Fondo con un tono madera oscuro para un estilo clásico */
.navbar {
    background-color: #5D4037;
    /* Marrón oscuro */
    padding: 15px 20px;
    border-bottom: 3px solid #D7B377;
    /* Línea dorada elegante */
}

/* Marca de la app con una tipografía serif elegante */
.navbar-brand {
    font-family: 'Georgia', serif;
    font-size: 1.8rem;
    font-weight: bold;
    color: #FFD700 !important;
    /* Dorado */
}

/* Links del navbar */
.nav-link {
    font-size: 1.1rem;
    font-family: 'Georgia', serif;
    color: #F5F5DC !important;
    /* Beige claro */
    transition: color 0.3s ease;
}

/* Cambio de color al pasar el mouse */
.nav-link:hover {
    color: #FFD700 !important;
    /* Dorado */
}

/* Botón de hamburguesa para dispositivos móviles */
.navbar-toggler {
    border: 2px solid #FFD700;
    /* Dorado */
}

/* Icono del menú hamburguesa */
.navbar-toggler-icon {
    filter: invert(100%);
    /* Lo hace blanco */
}
</style>

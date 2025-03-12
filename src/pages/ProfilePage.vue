<template>
    <div class="profile-page">
        <h1>Mi Perfil</h1>
        <div v-if="isAuthenticated">
            <h2>Mis Estanterías</h2>
            <div v-if="bookshelves.length > 0">
                <div v-for="shelf in bookshelves" :key="shelf.id" class="shelf-card">
                    <h3>{{ shelf.title }}</h3>
                    <router-link :to="`/shelf/${shelf.id}`" class="btn btn-primary">
                        Ver libros
                    </router-link>
                </div>
            </div>
            <div v-else>
                <p>No tienes estanterías creadas.</p>
                <router-link to="/create-shelf" class="btn btn-success">
                    Crear una estantería
                </router-link>
            </div>
        </div>
        <div v-else>
            <p>Debes iniciar sesión para ver tu perfil.</p>
            <router-link to="/login" class="btn btn-primary">Iniciar sesión</router-link>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import { useBooksStore } from '@/stores/booksStore';

export default {
    name: 'ProfilePage',
    data() {
        return {
            bookshelves: [], // Almacena las estanterías del usuario
        };
    },
    computed: {
        isAuthenticated() {
            const authStore = useAuthStore();
            return authStore.token !== null; // Verifica si el usuario está autenticado
        },
    },
    async created() {
        if (this.isAuthenticated) {
            await this.fetchBookshelves(); // Obtiene las estanterías del usuario
        }
    },
    methods: {
        async fetchBookshelves() {
            const booksStore = useBooksStore();
            this.bookshelves = await booksStore.getUserBookshelves(); // Obtiene las estanterías
        },
    },
};
</script>

<style scoped>
/* @import './../assets/styles.scss'; */

.profile-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.shelf-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.shelf-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.shelf-card h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
}

h1 {
    font-size: 2rem;
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

h2 {
    font-size: 1.5rem;
    color: #1D428A;
    margin-bottom: 20px;
}

.btn {
    padding: 10px 20px;
    font-size: 1rem;
    text-decoration: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-primary {
    background-color: #1D428A;
}

.btn-primary:hover {
    background-color: #163b6f;
}

.btn-success {
    background-color: #28a745;
}

.btn-success:hover {
    background-color: #218838;
}

p {
    font-size: 1rem;
    color: #555;
}

@media (max-width: 600px) {
    .profile-page {
        padding: 15px;
    }

    h1 {
        font-size: 1.5rem;
    }

    h2 {
        font-size: 1.2rem;
    }

    .shelf-card {
        flex-direction: column;
        align-items: flex-start;
    }

    .btn {
        width: 100%;
        margin-top: 10px;
    }
}
</style>
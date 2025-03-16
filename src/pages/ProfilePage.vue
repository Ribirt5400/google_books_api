<template>
    <div class="profile-page">
        <div v-if="isAuthenticated">
            <!-- Información del perfil -->
            <div v-if="user">
                <div class="user-info">
                    <img :src="user.picture || 'https://via.placeholder.com/100'" alt="Foto de perfil"
                        class="profile-picture" />
                    <h2>{{ user.name }}</h2>
                    <p>{{ user.email }}</p>
                </div>
            </div>
            <div v-else-if="profileLoading">
                <p>Cargando información del perfil...</p>
            </div>
            <div v-else-if="profileError">
                <p class="error-message">{{ profileError }}</p>
            </div>

            <!-- Estanterías del usuario -->
            <h2>Mis Colecciones</h2>
            <div v-if="shelvesLoading">
                <p>Cargando colecciones...</p>
            </div>
            <div v-else-if="shelvesError">
                <p class="error-message">{{ shelvesError }}</p>
            </div>
            <div v-else>
                <div v-if="bookshelves.length > 0">
                    <div v-for="shelf in bookshelves" :key="shelf.id" class="shelf-card">
                        <h3>{{ shelf.title }}</h3>
                        <router-link :to="`/shelf/${shelf.id}`" class="btn btn-primary">
                            Ver libros
                        </router-link>
                        <!-- Botón para vaciar la colección -->
                        <button @click="clearShelf(shelf.id)" class="btn btn-danger">Vaciar colección</button>
                    </div>
                </div>
                <div v-else>
                    <p>No tienes colecciones creadas.</p>
                </div>
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
import Swal from 'sweetalert2';

export default {
    name: 'ProfilePage',
    data() {
        return {
            user: null, // almacena la info del usuario
            bookshelves: [], // colecciones del usuario
            profileLoading: false, // Indica si se está cargando la info del perfil
            shelvesLoading: false,
            profileError: null, // por si hay un error al obtener la info del perfil
            shelvesError: null,
        };
    },
    computed: {
        isAuthenticated() {
            const authStore = useAuthStore();
            return authStore.isAuthenticated(); // Verifica si el usuario está autenticado
        },
    },
    async created() {
        if (this.isAuthenticated) {
            await this.fetchUserProfile(); // Obtiene la información del perfil
            await this.fetchBookshelves(); // Obtiene las coleccións del usuario
        }
    },
    methods: {
        // Obtener la información del perfil del usuario
        async fetchUserProfile() {
            const authStore = useAuthStore();
            this.profileLoading = true;
            this.profileError = null;

            try {
                this.user = await authStore.fetchUserProfile();
            } catch (error) {
                this.profileError = error.message || 'Error al obtener la información del perfil.';
                console.error(error);
            } finally {
                this.profileLoading = false;
            }
        },

        // Obtener las coleccións del usuario
        async fetchBookshelves() {
            const booksStore = useBooksStore();
            this.shelvesLoading = true;
            this.shelvesError = null;

            try {
                const allShelves = await booksStore.getUserBookshelves();
                // Filtrar coleccións soportadas (IDs del 0 al 6) y ordenarlas por ID
                this.bookshelves = allShelves
                    .filter(shelf => shelf.id >= 0 && shelf.id <= 6)
                    .sort((a, b) => a.id - b.id);
            } catch (error) {
                this.shelvesError = error.message || 'Error al obtener las coleccións.';
                console.error(error);
            } finally {
                this.shelvesLoading = false;
            }
        },

        async clearShelf(shelfId) {
            // Mostrar cuadro de confirmación con SweetAlert2
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción vaciará la colección y no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, vaciar colección',
                cancelButtonText: 'Cancelar',
            });

            if (!result.isConfirmed) return; // Si el usuario cancela, no hacer nada

            const booksStore = useBooksStore();
            this.shelvesLoading = true;
            this.shelvesError = null;

            try {
                await booksStore.clearShelf(shelfId);
                // Actualizar la lista de colecciones después de vaciar
                await this.fetchBookshelves();

                // Mostrar mensaje de éxito
                await Swal.fire({
                    title: '¡Estantería vaciada!',
                    text: 'La colección se ha vaciado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
            } catch (error) {
                this.shelvesError = error.message || 'Error al vaciar la colección.';
                console.error(error);

                // Mostrar mensaje de error
                await Swal.fire({
                    title: 'Error',
                    text: 'No se pudo vaciar la colección.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            } finally {
                this.shelvesLoading = false;
            }
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
    background-color: #f5f1e3;
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
    background-color: #f5f1e3;
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

.error-message {
    color: #dc3545;
    font-weight: bold;
}

.profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
    margin-right: 10px;
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
}

.btn-danger:hover {
    background-color: #c82333;
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
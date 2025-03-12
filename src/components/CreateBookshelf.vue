<template>
    <div class="create-bookshelf">
        <h1>Crear Estantería</h1>
        <form @submit.prevent="createBookshelf">
            <div class="form-group">
                <label for="title">Nombre de la estantería:</label>
                <input type="text" id="title" v-model="title" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Crear Estantería</button>
        </form>
        <div v-if="message" class="mt-3 alert" :class="messageClass">
            {{ message }}
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'; // Importa el store de autenticación

export default {
    name: 'CreateBookshelf',
    data() {
        return {
            title: '', // Nombre de la estantería
            message: '', // Mensaje de éxito o error
            messageClass: '', // Clase CSS para el mensaje
        };
    },
    methods: {
        async createBookshelf() {
            const authStore = useAuthStore();
            const token = authStore.token; // Obtén el token de acceso

            if (!token) {
                this.message = 'Debes iniciar sesión para crear una estantería.';
                this.messageClass = 'alert-danger';
                return;
            }

            try {
                const response = await fetch(
                    'https://www.googleapis.com/books/v1/mylibrary/bookshelves',
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: this.title, // Nombre de la estantería
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error('Error al crear la estantería');
                }

                const data = await response.json();
                this.message = `Estantería "${data.title}" creada correctamente.`;
                this.messageClass = 'alert-success';
                this.title = ''; // Limpia el campo del formulario
            } catch (error) {
                this.message = 'Error al crear la estantería. Inténtalo de nuevo.';
                this.messageClass = 'alert-danger';
                console.error(error);
            }
        },
    },
};
</script>

<style scoped>
.create-bookshelf {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
}

.btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.alert {
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
}

.alert-success {
    background-color: #d4edda;
    color: #155724;
}

.alert-danger {
    background-color: #f8d7da;
    color: #721c24;
}
</style>
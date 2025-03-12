<template>
    <div class="book-details">
        <div v-if="loading">Cargando...</div>
        <div v-if="error">{{ error }}</div>
        <div v-if="book">
            <h1>{{ book.volumeInfo.title }}</h1>
            <img :src="book.volumeInfo.imageLinks?.thumbnail" alt="Portada del libro" />
            <p><strong>Autor(es):</strong> {{ book.volumeInfo.authors?.join(', ') || 'Desconocido' }}</p>
            <div>
                <strong>Descripción:</strong>
                <div v-html="book.volumeInfo.description || 'Descripción no disponible'"></div>
            </div>
            <p><strong>Fecha de publicación:</strong> {{ book.volumeInfo.publishedDate }}</p>
            <p><strong>Editorial:</strong> {{ book.volumeInfo.publisher || 'Desconocida' }}</p>
            <p><strong>Páginas:</strong> {{ book.volumeInfo.pageCount || 'Desconocido' }}</p>
            <p><strong>Idioma:</strong> {{ book.volumeInfo.language || 'Desconocido' }}</p>
        </div>
    </div>
</template>

<script>
import { fetchBookDetails } from '@/services/fetchbooks'; // Importa la función para obtener detalles del libro

export default {
    name: 'BookDetails',
    data() {
        return {
            book: null, // Almacena los detalles del libro
            loading: false, // Estado de carga
            error: null, // Mensaje de error
        };
    },
    async created() {
        await this.loadBookDetails();
    },
    methods: {
        async loadBookDetails() {
            this.loading = true;
            this.error = null;

            try {
                const bookId = this.$route.params.id; // Obtén el ID del libro desde la ruta
                this.book = await fetchBookDetails(bookId); // Obtén los detalles del libro
            } catch (err) {
                this.error = 'Error al cargar los detalles del libro. Inténtalo de nuevo más tarde.';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.book-details {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.book-details img {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
}

.book-details h1 {
    font-size: 2rem;
    margin-bottom: 20px;
}

.book-details p {
    margin-bottom: 10px;
}
</style>
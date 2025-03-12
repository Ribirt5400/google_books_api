<template>
    <div class="homepage-container">
        <h1>Bienvenido a la Biblioteca Digital</h1>
        <SearchBar @search="handleSearch" />
        <div v-if="loading" class="loading">Cargando...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <BookList v-if="!loading && !error" :books="books" />
    </div>
</template>


<script>
import SearchBar from '@/components/SearchBar.vue';
import BookList from '@/components/BookList.vue';
import { useBooksStore } from '@/stores/booksStore';

export default {
    name: 'HomePage',
    components: {
        SearchBar,
        BookList,
    },
    data() {
        return {
            books: [], // Almacena los libros obtenidos de la API
            loading: false, // Estado de carga
            error: null, // Mensaje de error
        };
    },
    methods: {
        async handleSearch(query) {
            const booksStore = useBooksStore();
            this.loading = true;
            this.error = null;

            try {
                if (!query || query.trim() === '') {
                    // Si la consulta está vacía, limpiar la lista de libros
                    this.books = [];
                } else {
                    await booksStore.searchBooks(query, 20); // Pasa el parámetro maxResults (20 en este caso)
                    this.books = booksStore.books; // Actualiza la lista de libros
                }
            } catch (error) {
                this.error = 'Error al buscar libros. Inténtalo de nuevo más tarde.';
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.homepage-container {
    text-align: center;
    padding: 20px;
    background-color: #FAF3E0;
    /* Beige claro */
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: auto;
}

h1 {
    font-size: 28px;
    font-family: 'Garamond', serif;
    color: #8B4513;
    /* Marrón */
    margin-bottom: 20px;
}

.loading {
    font-size: 18px;
    color: #B22222;
    font-weight: bold;
}

.error {
    color: red;
    font-weight: bold;
    margin-top: 10px;
}

/* Responsive */
@media (max-width: 768px) {
    .homepage-container {
        padding: 15px;
        max-width: 90%;
    }

    h1 {
        font-size: 24px;
    }
}
</style>
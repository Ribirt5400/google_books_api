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

            <!-- Botón y menú desplegable para añadir a una colección -->
            <div class="add-to-shelf">
                <button @click.stop="toggleDropdown" class="btn btn-primary">
                    Añadir a colección
                </button>
                <!-- Menú desplegable -->
                <div v-if="showDropdown" class="dropdown-container">
                    <div class="dropdown">
                        <div v-for="shelf in shelves" :key="shelf.id" class="dropdown-item"
                            @click="addToShelf(shelf.id)">
                            {{ shelf.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchBookDetails } from '@/services/fetchbooks'; // Importa la función para obtener detalles del libro
import { useBooksStore } from '@/stores/booksStore';

export default {
    name: 'BookDetails',
    data() {
        return {
            book: null, // detalles del libro
            loading: false, // estado de carga
            error: null, // error
            showDropdown: false, // si el menú desplegable está visible o no
        };
    },
    computed: {
        // Obtener las colecciones del store
        shelves() {
            const booksStore = useBooksStore();
            return booksStore.shelves;
        },
    },
    async created() {
        await this.loadBookDetails();
    },
    methods: {
        async loadBookDetails() {
            this.loading = true;
            this.error = null;

            try {
                const bookId = this.$route.params.id; // ID del libro desde la ruta
                this.book = await fetchBookDetails(bookId); // detalles del libro
            } catch (err) {
                this.error = 'Error al cargar los detalles del libro. Inténtalo de nuevo más tarde.';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown; // cambiar la visibilidad del menú
        },
        async addToShelf(shelfId) {
            const booksStore = useBooksStore();
            try {
                await booksStore.addBookToShelf(shelfId, this.book.id);
                alert('Libro añadido correctamente.');
                this.showDropdown = false; // Cerrar el menú después de añadir el libro
            } catch (error) {
                alert(error.message);
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
    position: relative;
    background-color: #f5f1e3;
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

.add-to-shelf {
    position: relative;
    margin-top: 20px;
}

.dropdown-container {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1000;
    min-width: 150px;
    background-color: #f5f1e3;
}

.dropdown {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 5px;
}

.dropdown-item {
    padding: 8px 16px;
    cursor: pointer;
    font-size: 0.9rem;
}

.dropdown-item:hover {
    background-color: #f8f9fa;
}

.dropdown-item.empty-shelf {
    color: #6c757d;
    pointer-events: none;
}

.btn-primary {
    background-color: #1D428A;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 0.9rem;
    border-radius: 5px;
}

.btn-primary:hover {
    background-color: #163b6f;
}
</style>
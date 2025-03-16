<template>
    <div class="shelf-details">
        <h1>{{ shelfTitle }}</h1>
        <div v-if="loading">
            <p>Cargando libros...</p>
        </div>
        <div v-else-if="error">
            <p class="error-message">{{ error }}</p>
        </div>
        <div v-else>
            <div v-if="books.length > 0">
                <div v-for="book in books" :key="book.id" class="book-card">
                    <h3>{{ book.volumeInfo.title }}</h3>
                    <p>{{ book.volumeInfo.authors?.join(', ') }}</p>
                    <button @click="removeBook(book.id)" class="btn btn-danger">Eliminar</button>
                </div>
            </div>
            <div v-else>
                <p>No hay libros en esta colección.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useBooksStore } from '@/stores/booksStore';
import Swal from 'sweetalert2';

export default {
    name: 'ShelfDetails',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            books: [],
            shelfTitle: '',
            loading: false,
            error: null,
        };
    },
    async created() {
        await this.fetchBooksFromShelf();
    },
    methods: {
        async fetchBooksFromShelf() {
            const booksStore = useBooksStore();
            this.loading = true;
            this.error = null;

            try {
                this.books = await booksStore.fetchBooksFromShelf(this.id);
                const shelf = booksStore.shelves.find((s) => s.id === parseInt(this.id));
                this.shelfTitle = shelf ? shelf.title : 'Estantería desconocida';
            } catch (error) {
                this.error = error.message || 'Error al obtener los libros de la colección.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        async fetchBooksFromShelf() {
            const booksStore = useBooksStore();
            this.loading = true;
            this.error = null;

            try {
                this.books = await booksStore.fetchBooksFromShelf(this.id);
                const shelf = booksStore.shelves.find((s) => s.id === parseInt(this.id));
                this.shelfTitle = shelf ? shelf.title : 'Estantería desconocida';
            } catch (error) {
                this.error = error.message || 'Error al obtener los libros de la colección.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        async removeBook(bookId) {
            // cuadro de confirmación con SweetAlert2
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Este libro se eliminará de la colección.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (!result.isConfirmed) return; // Si el usuario cancela, no hacer nada

            const booksStore = useBooksStore();
            this.loading = true;
            this.error = null;

            try {
                await booksStore.removeBookFromShelf(this.id, bookId);
                // Actualizar la lista de libros después de eliminar
                this.books = this.books.filter((book) => book.id !== bookId);

                // Mostrar mensaje de éxito
                await Swal.fire({
                    title: '¡Libro eliminado!',
                    text: 'El libro ha sido eliminado de la colección.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
            } catch (error) {
                this.error = error.message || 'Error al eliminar el libro.';
                console.error(error);

                // Mostrar mensaje de error
                await Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar el libro.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.shelf-details {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f1e3;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
}

h1 {
    font-family: 'Georgia', serif;
    font-size: 2.5rem;
    color: #5D4037;
    margin-bottom: 20px;
    text-align: center;
    position: relative;

    &::after {
        content: '';
        display: block;
        width: 60px;
        height: 3px;
        background-color: #D7B377;
        margin: 10px auto 0;
    }
}

.loading-message,
.error-message {
    text-align: center;
    font-size: 1.2rem;
    color: #5D4037;
    margin-top: 20px;
}

.error-message {
    color: #c62828;
}

.book-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid rgba(93, 64, 55, 0.1);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }

    h3 {
        font-family: 'Georgia', serif;
        font-size: 1.5rem;
        color: #5D4037;
        margin-bottom: 10px;
    }

    p {
        font-size: 1rem;
        color: #8D6E63;
        margin-bottom: 15px;
    }
}

.btn-danger {
    background-color: #c62828;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Georgia', serif;
    font-size: 1rem;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: darken(#c62828, 10%);
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
}

.no-books-message {
    text-align: center;
    font-size: 1.2rem;
    color: #5D4037;
    margin-top: 20px;
}
</style>
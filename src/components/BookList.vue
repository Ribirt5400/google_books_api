<template>
    <div class="book-list">
        <div v-if="books.length === 0">No se encontraron libros.</div>
        <div v-else class="book-grid">
            <BookCard v-for="book in books" :key="book.id" :book="book" />
        </div>
    </div>
</template>

<script>
import BookCard from './BookCard.vue';

export default {
    components: {
        BookCard,
    },
    props: {
        books: { type: Array, required: true }, // Recibe la lista de libros
    },
};
</script>

<style scoped>
.book-list {
    padding: 20px;
    /* Espaciado alrededor de la cuadrícula */
}

.book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
}

/* Estilos responsive */
@media (max-width: 768px) {
    .book-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        /* Tarjetas más pequeñas en pantallas pequeñas */
    }
}

@media (max-width: 480px) {
    .book-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        /* Tarjetas aún más pequeñas en móviles */
    }
}
</style>
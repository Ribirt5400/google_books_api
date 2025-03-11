<template>
    <div class="book-list">
        <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';
import { useBooksStore } from '@/stores/booksStore';

export default {
    name: 'BookList',
    components: {
        BookCard,
    },
    computed: {
        books() {
            const booksStore = useBooksStore();
            return booksStore.books;
        },
    },
};
</script>

<style scoped>
/* Estilos del listado */
</style>
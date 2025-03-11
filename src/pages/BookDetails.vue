<template>
    <div>
        <h1>{{ book.volumeInfo.title }}</h1>
        <p>{{ book.volumeInfo.description }}</p>
    </div>
</template>

<script>
import { useBooksStore } from '@/stores/booksStore';

export default {
    name: 'BookDetails',
    computed: {
        book() {
            const booksStore = useBooksStore();
            return booksStore.selectedBook;
        },
    },
    async created() {
        const booksStore = useBooksStore();
        await booksStore.setSelectedBook(this.$route.params.id);
    },
};
</script>

<style scoped>
/* Estilos de la página de detalles */
</style>
<template>
    <div class="book-card">
        <img :src="book.volumeInfo.imageLinks?.thumbnail" alt="Portada del libro" />
        <h3>{{ book.volumeInfo.title }}</h3>
        <p>{{ book.volumeInfo.authors?.join(', ') }}</p>
        <router-link :to="{ name: 'book-details', params: { id: book.id } }">Ver detalles</router-link>
    </div>
</template>

<script>
export default {
    name: 'BookCard',
    props: {
        book: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
/* Estilos de la tarjeta */
</style>
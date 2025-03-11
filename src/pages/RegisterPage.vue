<template>
    <div>
        <h1>Bienvenido a la página de inicio</h1>
        <SearchBar />
        <BookList />
    </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import BookList from '@/components/BookList.vue';

export default {
    name: 'HomePage',
    components: {
        SearchBar,
        BookList,
    },
};
</script>

<style scoped>
/* Estilos de la página de inicio */
</style>
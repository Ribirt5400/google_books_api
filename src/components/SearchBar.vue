<template>
    <div class="search-bar">
        <!-- Ejecuta la búsqueda al presionar Enter -->
        <input v-model="query" type="text" placeholder="Buscar libros..." @keyup.enter="search" />
        <button @click="search">Buscar</button>
    </div>
</template>

<script>
import { useBooksStore } from './../stores/booksStore'; // Importamos el store de libros

export default {
    name: 'SearchBar',
    data() {
        return {
            query: '', // Almacena el término de búsqueda
        };
    },
    methods: {
        async search() {
            if (this.query.trim() === '') return; // Evita búsquedas vacías

            const booksStore = useBooksStore(); // Accedemos al store de libros
            await booksStore.searchBooks(this.query); // Ejecutamos la búsqueda
        },
    },
};
</script>

<style scoped>
.search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex-grow: 1;
}

button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #3aa876;
}
</style>
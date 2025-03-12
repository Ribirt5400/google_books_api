<template>
    <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Buscar libros..." @input="handleInput" />
        <button @click="handleSearch">Buscar</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '', // Consulta de búsqueda
        };
    },
    methods: {
        handleInput() {
            // Emitir la consulta solo si no está vacía
            if (this.searchQuery.trim() !== '') {
                this.$emit('search', this.searchQuery);
            } else {
                this.$emit('search', ''); // Emitir una cadena vacía para limpiar los resultados
            }
        },
        handleSearch() {
            // Emitir la consulta cuando el usuario presiona "Buscar"
            this.$emit('search', this.searchQuery);
        },
    },
};
</script>

<style scoped>
.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;
    flex-wrap: wrap;
    /* Permite que se ajuste en pantallas pequeñas */
}

input[type="text"] {
    width: 100%;
    max-width: 300px;
    padding: 8px 12px;
    border: 2px solid #8B4513;
    /* Marrón clásico */
    border-radius: 20px;
    font-size: 16px;
    font-family: 'Garamond', serif;
    background-color: #FAF3E0;
    /* Beige claro */
    color: #000;
}

input[type="text"]::placeholder {
    color: #8B4513;
    font-style: italic;
}

button {
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    background-color: #B22222;
    /* Rojo oscuro */
    color: white;
    font-size: 16px;
    font-family: 'Garamond', serif;
    cursor: pointer;
    transition: background 0.3s ease;
}

button:hover {
    background-color: #8B4513;
    /* Marrón clásico */
}

/* Responsive */
@media (max-width: 600px) {
    .search-container {
        flex-direction: column;
    }

    input[type="text"] {
        width: 90%;
    }
}
</style>
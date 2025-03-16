<template>
  <div>
    <div v-if="loading">Cargando...</div>

    <div v-if="error">{{ error }}</div>

    <!-- Pasar los datos a BookList.vue -->
    <BookList v-if="!loading && !error" :books="books" />
  </div>
</template>

<script>
import BookList from './BookList.vue';

export default {
  components: {
    BookList,
  },
  props: {
    query: { type: String, required: true }, // la consulta de búsqueda
  },
  data() {
    return {
      loading: false, // estado de carga
      error: null,    // error al buscar libros
      books: [],      // lista de libros
    };
  },
  watch: {
    // Observar cambios en la consulta de búsqueda
    query(newQuery) {
      this.fetchBooks(newQuery);
    },
  },
  methods: {
    async fetchBooks(query) {
      this.loading = true;
      this.error = null;

      try {
        // Hacer la petición a la API de Google Books usando fetch
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}`
        );

        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Procesar los datos de la API
        this.books = data.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || ['Autor desconocido'], // Si los autores son desconocidos
          description: item.volumeInfo.description || 'Descripción no disponible', // Si no tiene descripción
          image: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150', // Si no hay portada
        }));
      } catch (err) {
        this.error = 'Error al buscar libros. Inténtalo de nuevo más tarde.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    // Hacer la primera búsqueda al montar el componente
    if (this.query) {
      this.fetchBooks(this.query);
    }
  },
};
</script>
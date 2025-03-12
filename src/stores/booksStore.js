import { defineStore } from 'pinia'
import { fetchBooks } from '@/services/fetchbooks' // Importa la función fetchBooks

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [], // Almacena los libros obtenidos de la API
    loading: false, // Indica si se está cargando la información
    error: null, // Almacena un error en caso de que ocurra
  }),
  actions: {
    async searchBooks(query, maxResults = 20) {
      this.loading = true
      this.error = null

      try {
        this.books = await fetchBooks(query, maxResults) // Llama a la función fetchBooks
      } catch (error) {
        this.error = 'Error al buscar libros. Inténtalo de nuevo más tarde.'
        console.error('Error fetching books:', error)
      } finally {
        this.loading = false
      }
    },
  },
})

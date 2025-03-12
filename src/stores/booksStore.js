import { defineStore } from 'pinia'
import { fetchBooks } from '@/services/fetchbooks' // Importa la función fetchBooks
import { useAuthStore } from '@/stores/authStore' // Importa el store de autenticación

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [], // Almacena los libros obtenidos de la API
    shelves: [], // Almacena las coleccións del usuario
    loading: false, // Indica si se está cargando la información
    shelfBooks: [], // Almacena los libros de una colección
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

    // Obtener las coleccións predefinidas del usuario
    async getUserBookshelves() {
      const authStore = useAuthStore() // Obtiene la instancia del store de autenticación
      const token = authStore.token

      if (!token) {
        throw new Error('Debes iniciar sesión para obtener las coleccións.')
      }

      try {
        const response = await fetch('https://www.googleapis.com/books/v1/mylibrary/bookshelves', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error?.message || 'Error al obtener las coleccións')
        }

        const data = await response.json()
        this.shelves = data.items // Guardar las coleccións en el estado
        return data.items // Retornar las coleccións
      } catch (error) {
        console.error('Error fetching shelves:', error)
        throw error
      }
    },

    async fetchBooksFromShelf(shelfId) {
      const authStore = useAuthStore()
      const token = authStore.token

      if (!token) {
        throw new Error('Debes iniciar sesión para obtener los libros de una colección.')
      }

      this.loading = true
      this.error = null

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/volumes`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error?.message || 'Error al obtener los libros de la colección')
        }

        const data = await response.json()
        // Asegúrate de que data.items sea un array
        this.shelfBooks = data.items || [] // Si no hay libros, devuelve un array vacío
        return this.shelfBooks // Retornar los libros
      } catch (error) {
        this.error = error.message || 'Error al obtener los libros de la colección.'
        console.error('Error fetching books from shelf:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async addBookToShelf(shelfId, bookId) {
      const authStore = useAuthStore()
      const token = authStore.token

      if (!token) {
        throw new Error('Debes iniciar sesión para añadir un libro a la colección.')
      }

      this.loading = true
      this.error = null

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/addVolume`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ volumeId: bookId }),
          },
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error?.message || 'Error al añadir el libro a la colección')
        }

        // Actualizar la lista de libros en la colección
        await this.fetchBooksFromShelf(shelfId)
      } catch (error) {
        this.error = error.message || 'Error al añadir el libro a la colección.'
        console.error('Error adding book to shelf:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async removeBookFromShelf(shelfId, bookId) {
      const authStore = useAuthStore()
      const token = authStore.token

      if (!token) {
        throw new Error('Debes iniciar sesión para eliminar un libro de la colección.')
      }

      this.loading = true
      this.error = null

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/removeVolume?volumeId=${bookId}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error?.message || 'Error al eliminar el libro de la colección')
        }

        // Actualizar la lista de libros en la colección
        await this.fetchBooksFromShelf(shelfId)
      } catch (error) {
        this.error = error.message || 'Error al eliminar el libro de la colección.'
        console.error('Error removing book from shelf:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Vaciar una colección
    async clearShelf(shelfId) {
      const authStore = useAuthStore()
      const token = authStore.token

      if (!token) {
        throw new Error('Debes iniciar sesión para vaciar la colección.')
      }

      this.loading = true
      this.error = null

      try {
        // Obtener la lista de libros en la colección
        const books = await this.fetchBooksFromShelf(shelfId)

        // Verificar si hay libros en la colección
        if (books.length === 0) {
          console.log('La colección ya está vacía.')
          return // No hacer nada si no hay libros
        }

        // Eliminar cada libro de la colección
        for (const book of books) {
          await fetch(
            `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/removeVolume?volumeId=${book.id}`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          )
        }

        // Actualizar la lista de libros en la colección
        await this.fetchBooksFromShelf(shelfId)
      } catch (error) {
        this.error = error.message || 'Error al vaciar la colección.'
        console.error('Error clearing shelf:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})

import { defineStore } from 'pinia'
import { fetchBooks } from './../services/fetchbooks'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    selectedBook: null,
  }),
  actions: {
    async searchBooks(query) {
      this.books = await fetchBooks(query)
    },
    setSelectedBook(book) {
      this.selectedBook = book
    },
  },
})

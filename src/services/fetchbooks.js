import { API_KEY } from '../services/auth'

const API_URL = 'https://www.googleapis.com/books/v1'

export const fetchBooks = async (query, maxResults = 20) => {
  if (!query || query.trim() === '') {
    return []
  }

  const response = await fetch(
    `${API_URL}/volumes?q=${query}&maxResults=${maxResults}&key=${API_KEY}`,
  )
  if (!response.ok) {
    throw new Error('Error fetching books')
  }
  const data = await response.json()
  return data.items || []
}

export const fetchBookDetails = async (bookId) => {
  const response = await fetch(`${API_URL}/volumes/${bookId}?key=${API_KEY}`)

  if (!response.ok) {
    throw new Error('Error fetching book details')
  }

  const data = await response.json()
  return data
}

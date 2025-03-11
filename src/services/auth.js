const clientId = 'AIzaSyCVb62Yiz5NYjNssxk-DpBA0lil8hD4M48' // Reemplaza con tu clientId
const redirectUri = 'http://localhost:5174' // Asegúrate de que coincida con la URI de redireccionamiento

// Función para iniciar el flujo de autenticación
export const login = () => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/books`
  window.location.href = authUrl
}

// Función para intercambiar el código de autorización por un token de acceso
export const getToken = async (code) => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })
  if (!response.ok) {
    throw new Error('Error fetching token')
  }
  return response.json()
}

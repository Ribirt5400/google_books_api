export const API_KEY = 'AIzaSyCVb62Yiz5NYjNssxk-DpBA0lil8hD4M48' // Clave de la API (para peticiones públicas)
export const CLIENT_ID = '1045115965460-07kbq3i0gps2hahuidj9dm6p4eu9vbn6.apps.googleusercontent.com' // ID de cliente de Google
export const redirectUri = 'http://localhost:5173/auth/callback' // URI de redirección

// Función para iniciar el flujo de autenticación
export const login = () => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?
    client_id=${CLIENT_ID}&
    redirect_uri=${redirectUri}&
    response_type=token&
    scope=https://www.googleapis.com/auth/books&
    access_type=offline&
    prompt=consent`

  window.location.href = authUrl // Redirige a la página de autenticación de Google
}

// Función para manejar la redirección de Google y extraer el token
export const handleAuthRedirect = () => {
  const hash = window.location.hash.substring(1) // Elimina el "#" del hash
  const params = new URLSearchParams(hash) // Convierte el hash en un objeto de parámetros
  const accessToken = params.get('access_token') // Obtén el token de acceso

  if (accessToken) {
    localStorage.setItem('token', accessToken) // Guarda el token en localStorage
    return accessToken
  }

  return null // No se encontró un token
}

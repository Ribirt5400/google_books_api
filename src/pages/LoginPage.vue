<template>
    <div class="login-page">
        <h1>Iniciar sesión</h1>
        <!-- Botón de "Iniciar sesión con Google" -->
        <div class="mt-3">
            <button @click="loginWithGoogle" class="btn btn-google">
                <img src="./../assets/img/google-icon.png" alt="Google Logo" class="google-logo" />
                Iniciar sesión con Google
            </button>
        </div>

        <p class="mt-3">
            ¿No tienes una cuenta?
            <router-link to="/register">Regístrate aquí</router-link>.
        </p>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { CLIENT_ID } from '@/services/auth'; // Importa el Client ID
import { useAuthStore } from '@/stores/authStore'; // Importa el store de autenticación
import { handleAuthRedirect } from '@/services/auth'; // Importa las funciones de autenticación

export default {
    name: 'LoginPage',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    methods: {
        onSubmit(values) {
            console.log('Formulario enviado:', values);
            // Aquí iría la lógica para enviar los datos al backend
            alert('Inicio de sesión exitoso (simulado)');
            this.$router.push('/'); // Redirige al usuario a la página de inicio
        },

        // Método para iniciar sesión con Google
        loginWithGoogle() {
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}&response_type=token&scope=openid%20email%20profile%20https://www.googleapis.com/auth/books&include_granted_scopes=true&prompt=consent`; // URL de autenticación de Google


            window.location.href = authUrl; // Redirige a la página de autenticación de Google
        },
    },
    async created() {
        // Manejar la redirección de Google
        const accessToken = handleAuthRedirect(); // Extrae el token de acceso del hash

        if (accessToken) {
            const authStore = useAuthStore();
            authStore.setToken(accessToken); // Guarda el token en el store

            const isValidToken = await authStore.checkToken(); // Verifica si el token es válido
            if (isValidToken) {
                this.$router.push('/'); // Redirige al usuario a la página de inicio
            }

            // Limpia el hash de la URL
            window.location.hash = '';
        }
    },
};
</script>

<style scoped>
.login-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f1e3;
}

.form-group {
    margin-bottom: 15px;
}

.text-danger {
    color: red;
    font-size: 0.9rem;
}

.mt-3 {
    margin-top: 1rem;
}

.btn-google {
    background-color: #ffffff;
    border: 1px solid #ddd;
    color: #757575;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 100%;
}

.btn-google:hover {
    background-color: #f8f8f8;
}

.google-logo {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
</style>
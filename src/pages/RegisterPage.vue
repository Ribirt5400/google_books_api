<template>
    <div class="register-page">
        <h1>Registro de Usuario</h1>
        <Form @submit="onSubmit">
            <div class="form-group">
                <label for="name">Nombre:</label>
                <Field name="name" type="text" class="form-control" rules="required" />
                <ErrorMessage name="name" class="text-danger" />
            </div>

            <div class="form-group">
                <label for="email">Correo electrónico:</label>
                <Field name="email" type="email" class="form-control" rules="required|email" />
                <ErrorMessage name="email" class="text-danger" />
            </div>

            <div class="form-group">
                <label for="password">Contraseña:</label>
                <Field name="password" type="password" class="form-control" rules="required|min:6" />
                <ErrorMessage name="password" class="text-danger" />
            </div>

            <div class="form-group">
                <label for="confirmPassword">Confirmar contraseña:</label>
                <Field name="confirmPassword" type="password" class="form-control"
                    rules="required|confirmed:@password" />
                <ErrorMessage name="confirmPassword" class="text-danger" />
            </div>

            <button type="submit" class="btn btn-primary">Registrarse</button>
        </Form>

        <!-- Botón de "Registrarse con Google" -->
        <div class="mt-3">
            <button @click="registerWithGoogle" class="btn btn-google">
                <img src="./../assets/img/google-icon.png" alt="Google Logo" class="google-logo" />
                Registrarse con Google
            </button>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { CLIENT_ID } from '@/services/auth'; // Importa el Client ID
import { useAuthStore } from '@/stores/authStore'; // Importa el store de autenticación

export default {
    name: 'RegisterPage',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    methods: {
        onSubmit(values) {
            console.log('Formulario enviado:', values);
            // Aquí iría la lógica para enviar los datos al backend
            alert('Registro exitoso (simulado)');
            this.$router.push('/login'); // Redirige al usuario a la página de inicio de sesión
        },

        // Método para registrarse con Google
        registerWithGoogle() {
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}&response_type=token&scope=openid%20email%20profile%20https://www.googleapis.com/auth/books&include_granted_scopes=true&prompt=consent`; // URL de autenticación de Google

            window.location.href = authUrl; // Redirige a la página de autenticación de Google
        },
    },
    async created() {
        // Manejar la redirección de Google
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1)); // Elimina el "#" del hash
            const accessToken = params.get('access_token');

            if (accessToken) {
                const authStore = useAuthStore();
                authStore.setToken(accessToken); // Guarda el token en el store
                await authStore.checkToken(); // Verifica si el token es válido
                this.$router.push('/'); // Redirige al usuario a la página de inicio
            }
        }
    },
};
</script>

<style scoped>
.register-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
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
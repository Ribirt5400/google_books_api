<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'; // Importa el Navbar
import { useAuthStore } from '@/stores/authStore'; // Importa el store de autenticación

export default {
  name: 'App',
  components: {
    Navbar, // Registra el componente
  },
  async created() {
    const authStore = useAuthStore();

    // Verifica el token al cargar la aplicación
    await authStore.checkToken();

    // si el codigo de autorizacion esta presente en la url, lo maneja
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      await authStore.handleAuthCallback(code); // Intercambia el código por un token
      window.history.replaceState({}, document.title, window.location.pathname); // Limpia la URL
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/styles.scss";
</style>
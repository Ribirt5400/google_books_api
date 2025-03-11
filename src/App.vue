<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'; // Importa el Navbar

export default {
  name: 'App',
  components: {
    Navbar, // Registra el componente
  },
};
</script>

<style>
/* Estilos globales (opcional) */
</style>
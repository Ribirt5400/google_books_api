<template>
    <div class="card book-card" @click="goToBookDetails">
        <img :src="book.volumeInfo.imageLinks?.thumbnail" class="card-img-top" alt="Portada del libro" />
        <div class="card-body">
            <h5 class="card-title">{{ book.volumeInfo.title }}</h5>
            <p class="card-text">
                <strong>Autor(es):</strong> {{ book.volumeInfo.authors?.join(', ') || 'Desconocido' }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookCard',
    props: { // Se definen las propiedades que se pueden pasar al componente
        book: {
            type: Object,
            required: true,
        },
    },
    methods: {
        goToBookDetails() {
            this.$router.push({ name: 'book-details', params: { id: this.book.id } });
        },
    },
};
</script>

<style scoped>
.book-card {
    cursor: pointer;
    margin-bottom: 20px;
    transition: transform 0.2s;
    width: 200px;
    /* Ancho fijo para las tarjetas */
    border: 1px solid #ddd;
    /* Borde suave */
    border-radius: 8px;
    /* Esquinas redondeadas */
    overflow: hidden;
    /* Evita que el contenido se desborde */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Sombra suave */
}

.book-card:hover {
    transform: scale(1.05);
    /* Efecto de escala al pasar el mouse */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    /* Sombra más pronunciada al pasar el mouse */
}

.card-img-top {
    width: 100%;
    /* La imagen ocupa todo el ancho de la tarjeta */
    height: 250px;
    /* Altura fija para la imagen */
    object-fit: cover;
    /* Ajusta la imagen sin distorsionarla */
}

.card-body {
    padding: 15px;
    /* Espaciado interno */
}

.card-title {
    font-size: 1rem;
    /* Tamaño del título */
    margin-bottom: 10px;
    /* Espaciado inferior */
    font-weight: bold;
    /* Texto en negrita */
}

.card-text {
    font-size: 0.9rem;
    /* Tamaño del texto */
    color: #555;
    /* Color del texto */
}
</style>
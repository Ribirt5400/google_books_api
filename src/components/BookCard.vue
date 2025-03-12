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
    props: {
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
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-img-top {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.card-body {
    padding: 15px;
}

.card-title {
    font-size: 1rem;
    margin-bottom: 10px;
    font-weight: bold;
}

.card-text {
    font-size: 0.9rem;
    color: #555;
}
</style>
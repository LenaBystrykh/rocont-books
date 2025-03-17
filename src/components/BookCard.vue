<template>
    <div class="book-card">
        <div class="book-card__content">
            <h3>{{ book.title }}</h3>
            <div class="book-card__info">
                <p>{{ book.author }}</p>
                <p>{{ book.year }}</p>
                <p>{{ book.genre }}</p>
            </div>
        </div>
        <img :src="editIcon">
    </div>
</template>

<script setup>
import editIcon from '../assets/file-edit.svg';

const props = defineProps({
    book: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss">
.book-card {
    width: 100%;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    border: 2px solid var(--light-gray);

    &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;

        h3 {
            font-family: Inter;
            font-weight: 400;
            font-size: 16px;
            line-height: 1.2;
            color: var(--dark);
        }
    }

    &__info {
        display: flex;
        gap: 16px;
        font-family: Inter;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
        color: var(--dark-gray);
    }
}
</style>
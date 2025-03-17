<script setup>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import BookCard from '@/components/BookCard.vue';
import { ref } from 'vue';

let books = ref([
  {id: 1, title: 'Как разговаривать с кем угодно, когда угодно, где угодно', author: 'Ларри Кинг', year: 2011, genre: 'Научпоп'},
  {id: 2, title: 'Больше, чем просто красивая. 12 тайных сил женщины, перед которой невозможно устоять', author: 'Кара Кинг', year: 2020, genre: 'Научпоп'},
  {id: 3, title: 'Третье название', author: 'Третий автор', year: 2023, genre: 'Фантастика'},
])
</script>

<template>
  <main>
    <header>
      <div class="search">
        <img src="../assets/logo.svg">
        <div class="search__input-container">
          <img src="../assets/search.svg">
          <BaseInput class="search__input" :placeholder="'Найти ту самую книгу'" />
        </div>
      </div>
      <div class="header">
        <h1>Книги в каталоге</h1>
        <BaseButton :icon="'add'" :text="'Добавить книгу'" />
      </div>
    </header>

    <div class="main-content">
      <div v-for="book in books" :key="book.id">
        <BookCard :book="book" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
main {
  width: 100%;
  height: 100%;
}

header {
  width: 100%;
  height: 130px;
  background: var(--light-gray);
  padding: 16px 40px;
}

.search {
  width: 100%;
  display: flex;
  gap: 25px;
  justify-content: start;
  align-items: center;

  &__input-container {
    width: 100%;
    display: flex;
    position: relative;

    img {
      position: absolute;
      left: 12px;
      top: 10px;
    }

    .search__input {
      padding-left: 36px;
    }
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  h1 {
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
    line-height: 1;
  }
}

.main-content {
  width: 100%;
  padding: 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

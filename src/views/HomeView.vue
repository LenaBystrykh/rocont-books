<script setup>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import BookCard from '@/components/BookCard.vue';
import AddBookModal from '@/components/AddBookModal.vue';
import { useBooksStore } from '@/stores/booksStore';
import { ref } from 'vue';

const booksStore = useBooksStore();
const books = booksStore.books
let showAddModal = ref(false);

function showModal(val) {
  switch (val) {
    case 'add':
      showAddModal.value = true;
    case 'none':
      showAddModal.value = false;
    default:
      showAddModal.value = false;
  }
}

function addBook(book) {
  booksStore.addBook(book);
  showAddModal.value = false;
}
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
        <BaseButton :icon="'add'" :text="'Добавить книгу'" @click="showAddModal = true" />
      </div>
    </header>

    <div class="main-content">
      <div v-for="book in books" :key="book.id">
        <BookCard :book="book" />
      </div>
    </div>
  </main>
  <AddBookModal v-if="showAddModal" @addBook="addBook" @closeModal="showModal('none')" />
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

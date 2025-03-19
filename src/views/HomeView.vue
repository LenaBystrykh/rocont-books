<script setup>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import BookCard from '@/components/BookCard.vue';
import AddBookModal from '@/components/AddBookModal.vue';
import { useBooksStore } from '@/stores/booksStore';
import { ref, watch } from 'vue';

const booksStore = useBooksStore();
const books = ref(booksStore.books)
let showAddModal = ref(false);
let searchValue = ref('');
let isMobileSearchOpen = ref(false);

function clearInput() {
  isMobileSearchOpen.value = false;
  searchValue.value = '';
}

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

function debounce(fn, delay) {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  }
}

function bookSearch(value) {
  if (value) {
    books.value = booksStore.books.filter(book => book.title.toLowerCase().includes(value));
  } else {
    books.value = booksStore.books;
  }
}

const debouncedSearch = debounce(bookSearch, 500);

watch(searchValue, (newValue) => {
  debouncedSearch(newValue);
})
</script>

<template>
  <main>
    <header>
      <div class="search">
        <img v-if="!isMobileSearchOpen" src="../assets/logo.svg">
        <div class="search__input-container">
          <img src="../assets/search.svg">
          <BaseInput class="search__input" :placeholder="'Найти ту самую книгу'" v-model="searchValue" />
        </div>
        <img v-if="!isMobileSearchOpen" class="search__input-icon" src="../assets/search-mobile.svg" @click="isMobileSearchOpen = true">
        <div v-if="isMobileSearchOpen" class="search__input-container_mobile">
          <img src="../assets/close.svg" @click="clearInput">
          <BaseInput class="search__input_mobile" :placeholder="'Найти ту самую книгу'" v-model="searchValue" />
        </div>
      </div>
      <div class="header">
        <h1 v-if="searchValue">Книги по запросу <span>«{{ searchValue }}»</span></h1>
        <h1 v-else>Книги в каталоге <span>{{ books.length }}</span></h1>
        <BaseButton class="add-book-button" :icon="'add'" :text="'Добавить книгу'" @click="showAddModal = true" />
      </div>
    </header>

    <div class="main-content">
      <div v-for="book in books" :key="book.id">
        <BookCard :book="book" />
      </div>
      <p v-if="books.length === 0" class="main-content__empty-search">По вашему запросу ничего не найдено</p>
    </div>
    <BaseButton class="add-book-button_mobile" :icon="'add'" :text="'Добавить книгу'" @click="showAddModal = true" />

  </main>
  <AddBookModal v-if="showAddModal" @addBook="addBook" @closeModal="showModal('none')" />
</template>

<style lang="scss">
main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
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

    &_mobile {
      display: none;
    }

    .search__input {
      padding-left: 36px;
    }
  }

  &__input-icon {
    display: none;
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

    span {
      font-family: Inter;
      font-weight: 600;
      font-size: 20px;
      line-height: 1;
      color: var(--dark-gray);
    }
  }
}

.main-content {
  width: 100%;
  padding: 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow-y: auto;

  &__empty-search {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.2;
    color: var(--dark-gray);
  }
}

.add-book-button_mobile {
  display: none;
}

@media (min-width: 768px) and (max-width: 1023px) {
  header {
    padding: 16px 72px;
  }

  .main-content {
    padding: 16px 72px;
  }

  .search__input-icon {
    display: none;
  }

  .search__input-container_mobile {
    display: none;
  }
}

@media (min-width: 480px) and (max-width: 767px) {
  header {
    padding: 16px 28px;
  }

  .search {
    gap: 16px;

    &__input-icon {
      display: none;
    }

    &__input-container_mobile {
      display: none;
    }
  }

  .main-content {
    padding: 16px 28px;
  }

  .add-book-button {
    display: none;
  }

  .add-book-button_mobile {
    display: flex;
    justify-content: center;
    width: calc(100% - 32px);
    position: fixed;
    bottom: 0;
    margin: 16px;
  }
}

@media (max-width: 479px) {
  header {
    padding: 16px 20px;
  }

  .search {
    justify-content: space-between;
  }

  .search__input-container {
    display: none;
  }

  .search__input-container_mobile {
    width: 100%;
    display: flex;
    position: relative;

    img {
      position: absolute;
      left: 12px;
      top: 10px;
    }
  }

  .search__input_mobile {
    padding-left: 36px;
    background: var(--white);
    border: 2px solid var(--white);

    &:focus {
      border: 2px solid var(--accent);
    }
  }

  .search__input-icon {
    display: flex;
  }

  .main-content {
    padding: 16px 20px;
  }

  .add-book-button {
    display: none;
  }

  .add-book-button_mobile {
    display: flex;
    justify-content: center;
    width: calc(100% - 16px);
    position: fixed;
    bottom: 0;
    margin: 8px;
  }
}
</style>

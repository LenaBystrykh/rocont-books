<template>
  <main>
    <header>
      <div class="search">
        <img v-if="!isMobileSearchOpen" src="../assets/images/logo.svg">
        <div class="search__input-container">
          <img src="../assets/images/search.svg">
          <BaseInput class="search__input" :placeholder="'Найти ту самую книгу'" v-model="searchValue" />
        </div>
        <img v-if="!isMobileSearchOpen" class="search__input-icon" src="../assets/images/search-mobile.svg" @click="isMobileSearchOpen = true">
        <div v-if="isMobileSearchOpen" class="search__input-container_mobile">
          <img src="../assets/images/close.svg" @click="clearInput">
          <BaseInput class="search__input_mobile" :placeholder="'Найти ту самую книгу'" v-model="searchValue" />
        </div>
      </div>
      <div class="header">
        <div class="header__title">
          <h1 v-if="searchValue">Книги по запросу <span>«{{ searchValue }}»</span></h1>
          <h1 v-else>Книги в каталоге <span>{{ books.length }}</span></h1>
          <img :src="sortIcon" @click="showSortOptions = !showSortOptions">
          <div v-if="showSortOptions" class="sort-options">
            <p @click="toggleSort('nameD')"><img :class="{selected: sortValue === 'nameD'}" :src="selectedIcon">По названию (А-Я)</p>
            <p @click="toggleSort('nameA')"><img :class="{selected: sortValue === 'nameA'}" :src="selectedIcon">По названию (Я-А)</p>
            <p @click="toggleSort('yearD')"><img :class="{selected: sortValue === 'yearD'}" :src="selectedIcon">По году (сначала новые)</p>
            <p @click="toggleSort('yearA')"><img :class="{selected: sortValue === 'yearA'}" :src="selectedIcon">По году (сначала старые)</p>
            <p @click="toggleSort('authorD')"><img :class="{selected: sortValue === 'authorD'}" :src="selectedIcon">По автору (А-Я)</p>
            <p @click="toggleSort('authorA')"><img :class="{selected: sortValue === 'authorA'}" :src="selectedIcon">По автору (Я-А)</p>
          </div>
        </div>

        <BaseButton class="add-book-button" :icon="'add'" :text="'Добавить книгу'" @click="showAddModal = true" />
      </div>
    </header>

    <div class="main-content">
      <div v-for="book in books" :key="book.id">
        <BookCard :book="book" @edit-book="editBook(book)"/>
      </div>
      <p v-if="books.length === 0" class="main-content__empty-search">По вашему запросу ничего не найдено</p>
      <BaseButton v-if="isNotificationVisible" class="main-notification" :icon="notificaionIcon" :text="notificationText" 
      :isNotification="true" :success="notificationSuccess" @textClicked="notificationClick" @closeNotification="hideNotification" />
    </div>
    <BaseButton class="add-book-button_mobile" :icon="'add'" :text="'Добавить книгу'" @click="showAddModal = true" />

  </main>
  <AddBookModal v-if="showAddModal" @addBook="addBook" @closeModal="showAddModal = false" />
  <EditBookModal v-if="showEditModal" :book="bookToEdit" @saveBook="saveBook" @deleteBook="showDeleteModal = true" @closeModal="showEditModal = false" />
  <DeleteBookModal v-if="showDeleteModal" :book="bookToEdit" @deleteBook="deleteBook" @closeModal="showDeleteModal = false" />
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import BookCard from '@/components/BookCard.vue';
import AddBookModal from '@/components/AddBookModal.vue';
import EditBookModal from '@/components/EditBookModal.vue';
import DeleteBookModal from '@/components/DeleteBookModal.vue';
import sortIcon from '@/assets/images/sort.svg';
import selectedIcon from '@/assets/images/selected.svg';
import { useBooksStore } from '@/stores/booksStore';
import { ref, reactive, watch } from 'vue';

const booksStore = useBooksStore();
const books = ref(booksStore.books)
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showSortOptions = ref(false);
const searchValue = ref('');
const sortValue = ref('');
const isNotificationVisible = ref(false);
const notificaionIcon = ref('');
const notificationText = ref('');
const notificationSuccess = ref(false);
const isMobileSearchOpen = ref(false);
const bookToEdit = reactive({
  id: null,
  title: null,
  author: null,
  year: null,
  genre: null
})

let deleteTimeout;
let notificationTimeout;

function addBook(book) {
  booksStore.addBook(book);
  showAddModal.value = false;
  notificaionIcon.value = 'success';
  notificationText.value = 'Книга добавлена в список';
  notificationSuccess.value = true;
  isNotificationVisible.value = true;
  notificationTimeout = setTimeout(hideNotification, 3000);
}

function editBook(book) {
  bookToEdit.id = book.id;
  bookToEdit.title = book.title;
  bookToEdit.author = book.author;
  bookToEdit.year = book.year;
  bookToEdit.genre = book.genre;
  showEditModal.value = true;
}

function saveBook(book) {
  booksStore.editBook({id: bookToEdit.id, ...book});
  showEditModal.value = false;
  bookToEdit.id = null;
  bookToEdit.title = null;
  bookToEdit.author = null;
  bookToEdit.year = null;
  bookToEdit.genre = null;
  notificaionIcon.value = 'success';
  notificationText.value = 'Книга изменена';
  notificationSuccess.value = true;
  isNotificationVisible.value = true;
  notificationTimeout = setTimeout(hideNotification, 3000);
}

function hideNotification() {
  isNotificationVisible.value = false;
  notificaionIcon.value = '';
  notificationText.value = '';
  notificationSuccess.value = false;
  clearTimeout(notificationTimeout);
}

function clearInput() {
  isMobileSearchOpen.value = false;
  searchValue.value = '';
}

function notificationClick() {
  if (notificationText.value === 'Книга удалена. Вернуть её') {
    clearTimeout(deleteTimeout);
    notificaionIcon.value = 'error';
    notificationText.value = 'Книга не удалена.';
    notificationSuccess.value = false;
    isNotificationVisible.value = true;
    notificationTimeout = setTimeout(hideNotification, 3000);
  }
}

function approvedDeletion() {
  booksStore.deleteBook(bookToEdit.id);
  bookToEdit.id = null;
  bookToEdit.title = null;
  bookToEdit.author = null;
  bookToEdit.year = null;
  bookToEdit.genre = null;
  books.value = booksStore.books;
}

function deleteBook() {
  showDeleteModal.value = false;
  showEditModal.value = false;
  deleteTimeout = setTimeout(approvedDeletion, 3000);
  notificaionIcon.value = 'deleted';
  notificationText.value = 'Книга удалена. Вернуть её';
  notificationSuccess.value = true;
  isNotificationVisible.value = true;
  setTimeout(underlineText, 0);
  notificationTimeout = setTimeout(hideNotification, 3000);
}

function underlineText() {
  let text = document.getElementsByClassName('notification')[0].getElementsByTagName('p')[0];
  text.innerHTML = text.innerHTML.substring(0,15)+"<u>"+text.innerHTML.substring(15)+"</u>";
}

function sortBooks() {
  switch (sortValue.value) {
    case 'nameD':
      books.value.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      break;
    case 'nameA':
      books.value.sort((a, b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0));
      break;
    case 'yearD':
      books.value.sort((a, b) => Number(b.year) - Number(a.year));
      break;
    case 'yearA':
      books.value.sort((a, b) => Number(a.year) - Number(b.year));
      break;
    case 'authorD':
      books.value.sort((a, b) => (a.author > b.author) ? 1 : ((b.author > a.author) ? -1 : 0));
      break;
    case 'authorA':
      books.value.sort((a, b) => (a.author < b.author) ? 1 : ((b.author < a.author) ? -1 : 0));
      break;
    default:
      booksStore.books = JSON.parse(localStorage.getItem('books'))
      books.value = booksStore.books;
      bookSearch(searchValue.value);
      break;
  }
}

function toggleSort(value) {
  switch (value) {
    case 'nameD':
      sortValue.value = sortValue.value === 'nameD' ? '' : 'nameD';
      break;
    case 'nameA':
      sortValue.value = sortValue.value === 'nameA' ? '' : 'nameA';
      break;
    case 'yearD':
      sortValue.value = sortValue.value === 'yearD' ? '' : 'yearD';
      break;
    case 'yearA':
      sortValue.value = sortValue.value === 'yearA' ? '' : 'yearA';
      break;
    case 'authorD':
      sortValue.value = sortValue.value === 'authorD' ? '' : 'authorD';
      break;
    case 'authorA':
      sortValue.value = sortValue.value === 'authorA' ? '' : 'authorA';
      break;
    default:
      sortValue.value = '';
      break;
  }

  sortBooks();
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
    books.value = booksStore.books.filter(book => book.title.toLowerCase().includes(value.toLowerCase()));
  } else {
    books.value = booksStore.books;
  }
  if (sortValue.value !== '') {
    sortBooks();
  }
}

const debouncedSearch = debounce(bookSearch, 250);

watch(searchValue, (newValue) => {
  debouncedSearch(newValue);
})
</script>


<style lang="scss">
main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  width: 100%;
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

  &__title {
    display: flex;
    gap: 16px;
    align-items: center;
    position: relative;

    img {
      cursor: pointer;
    }

    .sort-options {
      position: absolute;
      z-index: 10;
      top: 32px;
      right: 0;
      width: 240px;
      background: var(--white);
      border-radius: 8px;
      padding: 12px;
      font-family: Inter;
      font-size: 14px;
      font-weight: 400;
      line-height: 1;
      color: var(--dark);
      display: flex;
      flex-direction: column;
      gap: 8px;
      border: 2px solid var(--light-gray);
      
      p {
        cursor: pointer;
        display: flex;
        align-items: center;

        img {
          margin-right: 4px;
          opacity: 0;

          &.selected {
            opacity: 1;
          }
        }
      }
    }
  }

  h1 {
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
    line-height: 1;
    color: var(--dark);

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
  position: relative;
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

.main-notification {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
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

  .main-notification {
    top: 16px;
    bottom: auto;
    left: 16px;
    width: calc(100% - 32px);
    transform: none;
  }
}

@media (max-width: 479px) {
  header {
    padding: 16px 20px;
  }

  .search {
    justify-content: space-between;

    &__input-container {
      display: none;
    }

    &__input-container_mobile {
      width: 100%;
      display: flex;
      position: relative;

      img {
        position: absolute;
        left: 12px;
        top: 10px;
      }
    }

    &__input_mobile {
      height: 41px;
      padding-left: 36px;
      background: var(--white);
      border: 2px solid var(--white);

      &:focus {
        border: 2px solid var(--accent);
      }
    }

    &__input-icon {
      display: flex;
    }
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

  .main-notification {
    top: 16px;
    bottom: auto;
    left: 8px;
    width: calc(100% - 16px);
    transform: none;
  }
}
</style>

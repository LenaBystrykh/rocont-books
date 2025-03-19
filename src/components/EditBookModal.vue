<template>
    <BaseModal @closeModal="emit('closeModal')">
        <template v-slot:title>Редактирование</template>
        <template v-slot:subtitle>Внесите изменение в карточке</template>
        <template v-slot:content>
        <div class="modal__field">
            <h3 class="modal__field-label">Название</h3>
            <BaseInput class="modal__field-input" :class="{error: errors.includes('emptyName')}" :placeholder="'Название произведения'" v-model="newBook.title " />
            <span v-if="errors.includes('emptyName')" class="modal__field-error">Необходимо ввести название книги</span>
        </div>
        <div class="modal__field">
            <h3 class="modal__field-label">Автор</h3>
            <BaseInput class="modal__field-input" :class="{error: errors.includes('emptyAuthor')}" :placeholder="'Имя и фамилия автора'" v-model="newBook.author" />
            <span v-if="errors.includes('emptyAuthor')" class="modal__field-error">Необходимо ввести имя и фамилию автора</span>
        </div>
        <div class="modal__field">
            <h3 class="modal__field-label">Год</h3>
            <BaseInput class="modal__field-input" :class="{error: errors.includes('invalidYear')}" :placeholder="'Год выпуска'" type="number" v-model="newBook.year" />
            <span v-if="errors.includes('invalidYear')" class="modal__field-error">Необходимо ввести корректный год выпуска</span>
        </div>
        <div class="modal__field">
            <h3 class="modal__field-label">Жанр</h3>
            <BaseInput class="modal__field-input" :placeholder="'Добавьте жанр произведения'" v-model="newBook.genre" />
        </div>
        </template>
        <template v-slot:agreement>
            <img :src="checkboxImg" @click="switchCheckbox">
            <p>Я согласен с условиями <span>Политики конфиденциальности</span></p>
        </template>
        <template v-slot:actions>
            <BaseButton class="modal__action" :text="'Сохранить'" :icon="'success'" @click="saveBook"/>
            <button class="modal__action-delete">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </template>
    </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import checkboxEmpty from '../assets/checkbox-empty.svg';
import checkboxFilled from '../assets/checkbox-filled.svg';
import { ref, reactive } from 'vue';

const emit = defineEmits(['saveBook', 'closeModal'])
const props = defineProps({
    book: Object
})

const checkboxImg = ref(checkboxEmpty);

const newBook = reactive({
    title: props.book.title,
    author: props.book.author,
    year: props.book.year,
    genre: props.book.genre
})

const errors = ref([])

function saveBook() {
  errors.value = []
  if (!newBook.title || newBook.title.length === 0 || newBook.title.trim().length === 0) {
    errors.value.push('emptyName')
  }
  if (!newBook.author || newBook.author.length === 0 || newBook.author.trim().length === 0) {
    errors.value.push('emptyAuthor')
  }
  if (isNaN(newBook.year) || Number(newBook.year) <= 0 || Number(newBook.year) > new Date().getFullYear()) {
    errors.value.push('invalidYear')
  }
  if (errors.value.length === 0 && checkboxImg.value === checkboxFilled) {
    emit('saveBook', newBook)
  }
}

function switchCheckbox() {
    checkboxImg.value = checkboxImg.value === checkboxEmpty ? checkboxFilled : checkboxEmpty;
}
</script>

<style lang="scss">
.modal__field {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &-label {
        font-family: Inter;
        font-weight: 600;
        font-size: 14px;
        line-height: 1.5;
        color: var(--dark);
    }

    &-input {
        background: var(--light-gray);
        border: 2px solid var(--light-gray);

        &:focus {
          border: 2px solid var(--accent);
        }

        &.error {
          border: 2px solid var(--error);
        }
    }

    &-error {
      font-family: Inter;
      font-weight: 400;
      font-size: 14px;
      line-height: 1;
      margin-left: 16px;
      color: var(--error);
    }
}

.modal__action-delete {
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 10px 12px;
    cursor: pointer;
    color: var(--dark-gray);

    &:hover {
        color: var(--error);
    }

    &:active {
        color: var(--error);
    }
}

@media (min-width: 480px) and (max-width: 767px) {
    .modal__action {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 479px) {
    .modal__action {
        width: 100%;
        justify-content: center;
    }
}
</style>
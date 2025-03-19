<template>
    <BaseModal @closeModal="emit('closeModal')">
        <template v-slot:title>Добавить книгу</template>
        <template v-slot:subtitle>Заполните все поля и добавьте книгу в список</template>
        <template v-slot:content>
        <div class="modal__field">
            <h3 class="modal__field-label">Название</h3>
            <BaseInput class="modal__field-input" :class="{error: errors.includes('emptyName')}" :placeholder="'Название произведения'" v-model="book.title " />
            <span v-if="errors.includes('emptyName')" class="modal__field-error">Необходимо ввести название книги</span>
        </div>
        <div class="modal__field">
            <h3 class="modal__field-label">Автор</h3>
            <BaseInput class="modal__field-input" :class="{error: errors.includes('emptyAuthor')}" :placeholder="'Имя и фамилия автора'" v-model="book.author" />
            <span v-if="errors.includes('emptyAuthor')" class="modal__field-error">Необходимо ввести имя и фамилию автора</span>
        </div>
        <div class="modal__field">
            <h3 class="modal__field-label">Год</h3>
            <BaseInput class="modal__field-input" :class="{error: errors.includes('invalidYear')}" :placeholder="'Год выпуска'" type="number" v-model="book.year" />
            <span v-if="errors.includes('invalidYear')" class="modal__field-error">Необходимо ввести корректный год выпуска</span>
        </div>
        <div class="modal__field">
            <h3 class="modal__field-label">Жанр</h3>
            <BaseInput class="modal__field-input" :placeholder="'Добавьте жанр произведения'" v-model="book.genre" />
        </div>
        </template>
        <template v-slot:agreement>
            <img :src="checkboxImg" @click="switchCheckbox">
            <p>Я согласен с условиями <span>Политики конфиденциальности</span></p>
        </template>
        <template v-slot:actions><BaseButton class="modal__action" :text="'Добавить'" :icon="'add'" @click="addBook"/></template>
    </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import checkboxEmpty from '../assets/checkbox-empty.svg';
import checkboxFilled from '../assets/checkbox-filled.svg';
import { ref, reactive } from 'vue';

const emit = defineEmits(['addBook', 'closeModal'])

const checkboxImg = ref(checkboxEmpty);

const book = reactive({
    title: null,
    author: null,
    year: null,
    genre: null
})

const errors = ref([])

function addBook() {
  errors.value = []
  if (!book.title || book.title.length === 0 || book.title.trim().length === 0) {
    errors.value.push('emptyName')
  }
  if (!book.author || book.author.length === 0 || book.author.trim().length === 0) {
    errors.value.push('emptyAuthor')
  }
  if (isNaN(book.year) || Number(book.year) <= 0 || Number(book.year) > new Date().getFullYear()) {
    errors.value.push('invalidYear')
  }
  if (errors.value.length === 0 && checkboxImg.value === checkboxFilled) {
    emit('addBook', book)
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
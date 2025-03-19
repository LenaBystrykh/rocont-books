<template>
    <BaseModal class="delete-modal" @closeModal="emit('closeModal')">
        <template v-slot:title>Вы уверены, что хотите удалить книгу?</template>
        <template v-slot:subtitle>Вы собираетесь удалить «{{ book.title }}»</template>
        <template v-slot:actions>
            <button class="modal__action-cancel" @click="emit('closeModal')">Отменить</button>
            <BaseButton class="modal__action" :text="'Да, удалить'" :icon="'deleted'" :success="false" @click="emit('deleteBook')"/>
        </template>
    </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';
import BaseButton from './BaseButton.vue';

const emit = defineEmits(['deleteBook', 'closeModal'])

const props = defineProps({
    book: Object
})
</script>

<style lang="scss">
.modal__action-cancel {
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 12px;
    cursor: pointer;
    font-size: 14px;
    line-height: 1.5;
    font-family: Inter;
    color: var(--dark-gray);
    background: var(--light-gray);
}

.delete-modal {
    .modal {
        gap: 0;

        &__actions {
            margin-top: 16px;
        }
    }
}

@media (min-width: 480px) and (max-width: 767px) {
    .delete-modal .modal__actions {
        margin-top: auto;
    }
}

@media (max-width: 479px) {
    .delete-modal .modal__actions {
        margin-top: auto;
    }
}
</style>
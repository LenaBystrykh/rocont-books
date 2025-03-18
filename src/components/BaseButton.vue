<template>
    <button :class="[{ 'notification': isNotification }, success ? 'success' : 'error']">
        <img class="button__icon" :src="url">
        {{ text }}
        <img v-if="isNotification" class="notification__close" :src="closeIcon">
    </button>
</template>

<script setup>
import { computed } from 'vue';
import fileAdd from '../assets/file-add.svg';
import fileDeleted from '../assets/file-deleted.svg';
import fileError from '../assets/file-error.svg';
import fileSuccess from '../assets/file-success.svg';
import closeIcon from '../assets/close-white.svg';

const props = defineProps({
    text: String,
    icon: String,
    success: {
        type: Boolean,
        default: true
    },
    isNotification: {
        type: Boolean,
        default: false
    }
});

const url = computed(() => {
    switch (props.icon) {
        case 'add':
            return fileAdd;
        case 'deleted':
            return fileDeleted;
        case 'error':
            return fileError;
        case 'success':
            return fileSuccess;
    }
});
</script>

<style lang="scss">
button {
    width: fit-content;
    height: fit-content;
    border-radius: 8px;
    padding: 10px 12px;
    border: none;
    outline: none;
    font-size: 14px;
    line-height: 1.5;
    font-family: Inter;
    color: var(--white);
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    &.notification {
        cursor: default;
        gap: 10px;

        img {
            opacity: 1;
        }

        &:hover {
            background-image: none;
        }

        .notification__close {
            cursor: pointer;
        }
    }

    &.success {
        background: var(--accent);
    }

    &.error {
        background: var(--error);
    }

    img {
        width: 24px;
        height: 24px;
        opacity: 0.5;
    }

    &:hover {
        background-image: linear-gradient(rgb(0 0 0/10%) 0 0);

        img {
            opacity: 1;
        }
    }
}
</style>
<template>
    <div class="modal-bg">
        <div class="modal">
            <div class="modal__header">
                <div class="modal__headline">
                    <div class="modal__title"><slot name="title"></slot></div>
                    <div class="modal__subtitle"><slot name="subtitle"></slot></div>
                </div>
                <img src="../assets/close.svg" @click="emit('closeModal')">
            </div>

            <div class="modal__content">
                <slot name="content"></slot>
            </div>

            <div class="modal__agreement">
                <slot name="agreement"></slot>
            </div>

            <div class="modal__actions">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['closeModal'])
</script>

<style lang="scss">
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(15, 23, 42, 0.1);

    .modal {
        width: 464px;
        background: var(--white);
        border: 2px solid var(--light-gray);
        border-radius: 16px;
        padding: 32px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4px;

            .modal__headline {
                display: flex;
                flex-direction: column;
                gap: 8px;
                align-items: flex-start;     
            }

            img {
                cursor: pointer;
            }
        }

        &__title {
            font-family: Inter;
            font-weight: 600;
            font-size: 20px;
            line-height: 1;
            color: var(--dark);
        }

        &__subtitle {
            font-family: Inter;
            font-weight: 400;
            font-size: 14px;
            line-height: 1.5;
            color: var(--dark-gray);
        }

        &__content {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        &__field {
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
            }
        }

        &__agreement {
            display: flex;
            align-items: center;
            gap: 8px;

            img {
                cursor: pointer;
            }

            p {
                font-family: Inter;
                font-weight: 400;
                font-size: 10px;
                line-height: 1;
                color: var(--dark-gray);

                span {
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }

        &__actions {
            display: flex;
            justify-content: flex-end;
        }
    }
}

@media (min-width: 480px) and (max-width: 767px) {
    .modal-bg {
        .modal {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 0;
            padding: 28px;
        }
    }
}

@media (max-width: 479px) {
    .modal-bg {
        .modal {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 0;
            padding: 20px;
        }
    }
}
</style>
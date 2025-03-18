<template>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<script setup>
defineProps({modelValue: String})
</script>

<style lang="scss">
input {
    width: 100%;
    height: fit-content;
    border-radius: 8px;
    padding: 10px 12px;
    background: var(--white);
    border: none;
    outline: none;
    font-size: 14px;
    line-height: 1.5;
    font-family: Inter;
    color: var(--dark);
    

    ::placeholder {
        color: var(--dark-gray);
    }
}
</style>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

type Props = {
  for: string;
  label?: string;
};
const props = defineProps<Props>();

const labelText = computed(() => {
  return props.label || props.for;
});
</script>

<template>
  <div class="FixedPropTextArea">
    <label :for="props.for">{{ labelText }}: </label>
    <slot></slot>
  </div>
</template>

<style>
.FixedPropTextArea {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: .5rem;
  width: 100%;
}
.FixedPropTextArea label {
  width: 100%;
}
.FixedPropTextArea textarea {
  border: none;
  border-radius: .5rem;
  padding: 1rem 1.2rem;
  min-height: 8rem;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
}
</style>

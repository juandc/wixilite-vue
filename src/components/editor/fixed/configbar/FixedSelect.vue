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
  <div class="FixedSelect">
    <label :for="props.for">{{ labelText }}: </label>
    <slot></slot>
  </div>
</template>

<style>
.FixedSelect {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: .5rem;
  width: 100%;
}
.FixedSelect label {
  width: 100%;
}
.FixedSelect select {
  border: none;
  border-radius: .25rem;
  text-align: center;
  height: 2rem;
  width: 9.5rem;
}
</style>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

type Props = {
  for: string;
  label?: string;
  type?: string;
};
const props = defineProps<Props>();

const labelText = computed(() => {
  return props.label || props.for;
});
</script>

<template>
  <div
    class="FixedPropInput"
    :class="{
      'FixedPropInput--color': props.type === 'color',
    }"
  >
    <label :for="props.for">{{ labelText }}: </label>
    <slot></slot>
  </div>
</template>

<style>
.FixedPropInput {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
}
.FixedPropInput label {
  width: calc(100% - 6rem);
}
.FixedPropInput input {
  border: none;
  border-radius: .25rem;
  text-align: center;
  height: 2rem;
  width: 6rem;
}
.FixedPropInput input[type="color"] {
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { defineProps } from 'vue';

type Props = {
  label?: string;
};
const { label } = defineProps<Props>();
</script>

<template>
  <div class="FixedModule">
    <div
      v-if="label || $slots.labelbtns"
      class="FixedModule-label"
    >
      <p v-if="label">{{ label }}</p>
      <div v-if="$slots.labelbtns" class="FixedModule-labelBtns">
        <slot name="labelbtns"></slot>
      </div>
    </div>
    <div class="FixedModule-content">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.FixedModule {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
.FixedModule-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: .5rem;
  margin-bottom: .75rem;
}
.FixedModule-label p {
  border-bottom: 1px solid rgba(126, 126, 126, 0.75);
  font-size: .875rem;
  opacity: 0.8;
  margin-right: auto;
  padding-right: 1rem;
  padding-bottom: .25rem;
  width: fit-content;
}
.FixedModule-labelBtns {
  display: flex;
  justify-content: flex-end;
  gap: .25rem;
}
.FixedModule-labelBtns button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem;
  height: 2.25rem;
  width: 2.25rem;
}
.FixedModule-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

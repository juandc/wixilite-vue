<script setup lang="ts">
import { pageInfoStore } from '@/stores/pageInfo';
</script>

<template>
  <h1>{{ pageInfoStore.name }}</h1>
  <input
    type="text"
    v-model="pageInfoStore.name"
    placeholder="Type something..."
  />
  <input
    type="color"
    v-model="pageInfoStore.innerBackground"
  />
</template>

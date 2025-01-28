<script setup lang="ts">
import { pageInfoStore } from '@/stores/pageInfo';
</script>

<template>
  <div
    :style="{
      // width: pageInfoStore.width + 'px',
      // height: pageInfoStore.height + 'px',
      backgroundColor: pageInfoStore.innerBackground,
      width: '320px',
      height: '568px',
    }"
  ></div>
</template>

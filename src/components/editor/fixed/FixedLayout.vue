<script setup lang="ts">
import EditorLayout from '../EditorLayout.vue';
import FixedConfigBar from './configbar/FixedConfigBar.vue';
import FixedBoard from './board/FixedBoard.vue';
</script>

<template>
  <EditorLayout showMobileConfigBar>
    <template #configbar>
      <FixedConfigBar />
    </template>
    <template #board>
      <FixedBoard />
    </template>
  </EditorLayout>
</template>

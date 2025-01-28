<script setup lang="ts">
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AppEditor from '@/components/editor/AppEditor.vue';
</script>

<template>
  <DndProvider :backend="HTML5Backend">
    <AppEditor />
  </DndProvider>
</template>

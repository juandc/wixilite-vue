<script setup lang="ts">
import { ref, computed } from 'vue';
import { pageInfoStore } from '@/stores/pageInfo';
import EditorLayout from './EditorLayout.vue';
import FixedLayout from './fixed/FixedLayout.vue';

type ILayout = "fixed" | "fluid";
const layout = ref<ILayout | null>("fixed");
const LayoutComponent = computed(() => {
  if (layout.value === "fixed") {
    return FixedLayout;
  }
  return null;
});
</script>

<template>
  <div :style="{
    '--page-inner-bg': pageInfoStore.innerBackground,
    '--page-outer-bg': pageInfoStore.outerBackground,
  }">
    <div v-if="!layout">
      <EditorLayout showMobileConfigBar>
        <template #configbar>
          ...
        </template>
        <template #board>
          <button @click="layout = 'fixed'">Fixed</button>
          <button disabled>Fluid (soon)</button>
        </template>
      </EditorLayout>
    </div>
    <component :is="LayoutComponent" />
  </div>
</template>

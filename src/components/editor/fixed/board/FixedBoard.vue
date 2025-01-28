<script setup lang="ts">
import { pageInfoStore } from '@/stores/pageInfo';
import { useFixedLayoutStore } from '@/stores/fixedLayout';
import FixedMobileBoard from './FixedMobileBoard.vue';
import EditingText from './EditingText.vue';
import EditingImg from './EditingImg.vue';
import EditingRectangle from './EditingRectangle.vue';

const fixedLayoutStore = useFixedLayoutStore();
</script>

<template>
  <FixedMobileBoard
    :unSelectElement="() => {
      fixedLayoutStore.selectedElementId = undefined
    }"
    :moveElement="fixedLayoutStore.moveElement"
  >
    <template v-for="element in fixedLayoutStore.elements">
      <template v-if="element.type === 'fixed--editing-text'">
        <EditingText
          :element="element"
          :isSelected="fixedLayoutStore.selectedElementId == element.id"
          :selectElement="() => { fixedLayoutStore.selectedElementId = element.id }"
        />
      </template>
      <template v-if="element.type === 'fixed--editing-img'">
        <EditingImg
          :element="element"
          :isSelected="fixedLayoutStore.selectedElementId == element.id"
          :selectElement="() => { fixedLayoutStore.selectedElementId = element.id }"
        />
      </template>
      <template v-if="element.type === 'fixed--editing-rectangle'">
        <EditingRectangle
          :element="element"
          :isSelected="fixedLayoutStore.selectedElementId == element.id"
          :selectElement="() => { fixedLayoutStore.selectedElementId = element.id }"
        />
      </template>
    </template>
  </FixedMobileBoard>
</template>

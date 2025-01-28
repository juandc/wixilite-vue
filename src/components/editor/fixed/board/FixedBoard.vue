<script setup lang="ts">
import { pageInfoStore } from '@/stores/pageInfo';
import { useFixedLayoutStore } from '@/stores/fixedLayout';

const fixedLayoutStore = useFixedLayoutStore();
</script>

<template>
  <div
    @click="fixedLayoutStore.selectedElementId = undefined"
    :style="{
      backgroundColor: pageInfoStore.innerBackground,
      position: 'relative',
      margin: '0 auto',
      height: pageInfoStore.height + 'px',
      width: '320px',
    }"
  >
    <template v-for="element in fixedLayoutStore.elements">
      <div
        v-if="element.type === 'fixed--editing-text'"
        @click.stop="fixedLayoutStore.selectedElementId = element.id"
        :style="{
          border: fixedLayoutStore.selectedElementId == element.id ? '1px solid white' : 'none', // TODO: should be to own container
          position: 'absolute',
          top: element.data.y + 'px',
          left: element.data.x + 'px',
          height: element.data.h + 'px',
          width: element.data.w + 'px',
          fontSize: element.data.fontSize + 'px',
          minHeight: 'fit-content',
          minWidth: 'fit-content',
        }"
      >
        {{ element.data.text[0] }}
      </div>
      <img
        v-else-if="element.type === 'fixed--editing-img'"
        @click.stop="fixedLayoutStore.selectedElementId = element.id"
        :src="element.data.url"
        :style="{
          border: fixedLayoutStore.selectedElementId == element.id ? '1px solid white' : 'none', // TODO: should be to own container
          position: 'absolute',
          top: element.data.y + 'px',
          left: element.data.x + 'px',
          height: element.data.h + 'px',
          width: element.data.w + 'px',
          minHeight: 'fit-content',
          minWidth: 'fit-content',
        }"
        width="100"
      />
    </template>
  </div>
</template>

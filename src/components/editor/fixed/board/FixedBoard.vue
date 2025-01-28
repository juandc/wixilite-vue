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
      height: pageInfoStore.height + 'px',
      width: '320px',
    }"
  >
    <div
      v-for="element in fixedLayoutStore.elements"
      :key="element.id"
      @click.stop="fixedLayoutStore.selectedElementId = element.id"
      :style="{
        border: '1px solid white',
        height: '100px',
        width: '100px',
        // position: 'absolute',
        // left: element.x + 'px',
        // top: element.y + 'px',
        // width: element.width + 'px',
        // height: element.height + 'px',
        // backgroundColor: element.bgColor,
        // color: element.color,
        // fontSize: element.fontSize + 'px',
        // fontWeight: element.fontWeight,
        // textAlign: element.textAlign,
        // lineHeight: element.lineHeight,
        // padding: element.padding + 'px',
        // borderRadius: element.borderRadius + 'px',
        // boxShadow: element.boxShadow,
        // zIndex: element.zIndex,
      }"
    >
      <div v-if="element.type === 'fixed--editing-text'">
        {{ element.data.text }}
      </div>
      <img v-else-if="element.type === 'fixed--editing-img'" :src="element.data.url" width="100" />
    </div>
  </div>
</template>

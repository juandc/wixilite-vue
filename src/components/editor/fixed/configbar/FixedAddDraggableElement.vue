<script lang="ts" setup>
import { useDrag } from 'vue3-dnd';
import type { IFixedElementNew } from '@/types';
import { dndTypes } from '@/constants/dnd';

type Props = {
  type: IFixedElementNew["type"];
};
const props = defineProps<Props>();

const dndTypesObj: Record<IFixedElementNew["type"], string> = {
  "fixed--new-text": dndTypes.ADD_TEXT,
  "fixed--new-img": dndTypes.ADD_IMAGE,
  "fixed--new-rectangle": dndTypes.ADD_RECTANGLE,
};

const dndType = dndTypesObj[props.type];
console.log('props', props.type);
console.log('dndType', dndType);


const [collectedProps, dragSource, dragPreview] = useDrag(() => ({
  type: dndType,
  item: { type: props.type },
  // isDragging: (monitor) => {
  //   const isDragging = monitor.getItem().type === "fixed--new-text";
  //   if (isDragging) {
  //     hideConfigBar();
  //   }
  //   return isDragging;
  // },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
    handlerId: monitor.getHandlerId(),
  }),
}));
</script>

<template>
  <div v-if="collectedProps.isDragging" :ref="dragPreview" class="FixedAddDraggableElement">
    <slot></slot>
  </div>
  <div v-else :ref="dragSource" class="FixedAddDraggableElement">
    <slot></slot>
  </div>
</template>

<style>
.FixedAddDraggableElement {
  border-radius: .25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-left: -.5rem;
  margin-right: -.5rem;
  padding: .5rem;
  width: calc(100% + 1rem);

  transition: .3s background-color;
}
.FixedAddDraggableElement:hover {
  background-color: #3c3c3c;
}
.FixedAddDraggableElement > div:first-child {
  cursor: grab;
  width: 100%;
}
</style>

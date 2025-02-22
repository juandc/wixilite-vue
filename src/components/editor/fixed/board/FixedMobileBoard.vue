<script lang="ts" setup>
import { defineProps, useTemplateRef } from 'vue';
import { useDrop, type XYCoord } from 'vue3-dnd'
import type { IDraggableFixedElement, IFixedElementNew } from "@/types";
import { dndTypes } from "@/constants/dnd";
import { pageInfoStore } from '@/stores/pageInfo';

const boundingRef = useTemplateRef<HTMLDivElement>('boundingRef');

type Props = {
  unSelectElement: () => void;
  addElement: (type: IFixedElementNew["type"]) => (x: number, y: number) => void;
  moveElement: (id: string) => (x: number, y: number) => void;
};
const props = defineProps<Props>();

const [, drop] = useDrop(() => ({
  accept: [
    dndTypes.ADD_TEXT,
    dndTypes.EDITING_TEXT,
    dndTypes.ADD_IMAGE,
    dndTypes.EDITING_IMAGE,
    dndTypes.ADD_RECTANGLE,
    dndTypes.EDITING_RECTANGLE,
  ],
  drop(item: IDraggableFixedElement, monitor) {
    console.log('drop', item);
    if (
      item.type === "fixed--editing-text"
      || item.type === "fixed--editing-img"
      || item.type === "fixed--editing-rectangle"
    ) {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const newPos = {
        x: item.data.x + delta.x,
        y: item.data.y + delta.y,
      };
      props.moveElement(item.id)(newPos.x, newPos.y);
    } else if (
      item.type === "fixed--new-text"
      || item.type === "fixed--new-img"
      || item.type === "fixed--new-rectangle"
    ) {
      const boundingRect = boundingRef.value?.getBoundingClientRect() ?? {
        x: 0,
        y: 0
      };
      const end = monitor.getClientOffset() as XYCoord;
      const newPos = {
        x: end.x - boundingRect.x,
        y: end.y - boundingRect.y,
      };
      props.addElement(item.type)(newPos.x, newPos.y);
    }
  },
  collect: (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
}))
</script>

<template>
  <div
    :ref="drop"
    @click="props.unSelectElement()"
    :style="{
      backgroundColor: pageInfoStore.innerBackground,
      position: 'relative',
      margin: '0 auto',
      height: pageInfoStore.height + 'px',
      width: '320px',
    }"
  >
    <div ref="boundingRef">
      <slot></slot>
    </div>
  </div>
</template>

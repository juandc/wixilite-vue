<script setup lang="ts">
import { defineProps, toRaw } from 'vue';
import { useDrag } from 'vue3-dnd';
import type { IFixedElementEditingRectangle } from '@/types';
import { dndTypes } from "@/constants/dnd";

type Props = {
  element: IFixedElementEditingRectangle;
  isSelected: boolean;
  selectElement: () => void;
};
const props = defineProps<Props>();

const [collectedProps, dragSource, dragPreview] = useDrag(() => ({
  type: dndTypes.EDITING_RECTANGLE,
  item: { ...toRaw(props.element) },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
    handlerId: monitor.getHandlerId(),
  }),
}));
</script>

<template>
  <div
    @click.stop="props.selectElement()"
    :style="{
      border: props.isSelected ? '1px solid white' : 'none', // TODO: should be to own container
      position: 'absolute',
      top: props.element.data.y + 'px',
      left: props.element.data.x + 'px',
      height: props.element.data.h + 'px',
      width: props.element.data.w + 'px',
      color: props.element.data.color,
      fontSize: props.element.data.fontSize + 'px',
      opacity: props.element.data.opacity,
      minHeight: 'fit-content',
      minWidth: 'fit-content',
    }"
  >
    <div v-if="collectedProps.isDragging" :ref="dragPreview">
      <div :style="{
        borderRadius: element.data.borderRadius + 'px',
        backgroundColor: element.data.background,
        height: props.element.data.h + 'px',
        width: props.element.data.w + 'px',
        opacity: element.data.opacity,
      }"></div>
    </div>
    <div v-else :ref="dragSource">
      <div :style="{
        borderRadius: element.data.borderRadius + 'px',
        backgroundColor: element.data.background,
        height: props.element.data.h + 'px',
        width: props.element.data.w + 'px',
        opacity: element.data.opacity,
      }"></div>
    </div>
  </div>
</template>

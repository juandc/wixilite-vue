<script setup lang="ts">
import { defineProps, toRaw } from 'vue';
import { useDrag } from 'vue3-dnd';
import type { IFixedElementEditingText } from '@/types';
import { dndTypes } from "@/constants/dnd";

type Props = {
  element: IFixedElementEditingText;
  isSelected: boolean;
  selectElement: () => void;
};
const props = defineProps<Props>();

const [collectedProps, dragSource, dragPreview] = useDrag(() => ({
  type: dndTypes.EDITING_TEXT,
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
      {{ element.data.text[0] }}
    </div>
    <div v-else :ref="dragSource">
      {{ element.data.text[0] }}
    </div>
    <!-- {{ element.data.text[0] }} -->
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { configBarStore } from '@/stores/showConfigBar';

type Props = {
  showMobileConfigBar?: boolean;
};
const { showMobileConfigBar } = defineProps<Props>();

const toggleConfigBar = () => {
  configBarStore.show = !configBarStore.show;
};
</script>

<template>
  <main
    class="EditorLayout"
    :class="{ EditorLayout__showMobileConfigBar: configBarStore.show }"
  >
    <aside class="EditorLayout_configBarContainer">
      <button
        v-if="showMobileConfigBar && configBarStore.show"
        class="EditorLayout_toggleConfigBarBtn"
        @click="toggleConfigBar()"
      >
        <!-- <MenuIcon fill="white" /> -->
        X
      </button>

      <slot name="configbar">configBar</slot>
    </aside>

    <div class="EditorLayout_boardContainer">
      <button
        v-if="showMobileConfigBar && !configBarStore.show"
        class="EditorLayout_toggleConfigBarBtn"
        @click="toggleConfigBar()"
      >
        <!-- <MenuIcon fill="white" /> -->
        Y
      </button>

      <slot name="board">board</slot>
    </div>
  </main>
</template>

<style>
.EditorLayout {
  --config-bar-width: 320px;
  --toggle-config-bar-size: 40px;
  --toggle-config-bar-area-margin: calc(var(--toggle-config-bar-size) + 1rem);
  padding-left: 0;
  transition: padding-left 0.3s;
}

@media screen and (min-width: 768px) {
  .EditorLayout {
    padding-left: var(--config-bar-width);
  }
}

.EditorLayout_configBarContainer {
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--config-bar-width);
  padding-top: var(--toggle-config-bar-area-margin);
  overflow-y: scroll;
  z-index: var(--zindex-level-6);

  transform: translateX(calc(-1 * var(--config-bar-width)));
  transition: transform 0.3s;
}

.EditorLayout__showMobileConfigBar .EditorLayout_configBarContainer {
  transform: translateX(0px);
}

@media screen and (min-width: 768px) {
  .EditorLayout .EditorLayout_configBarContainer {
    transform: translateX(0px);
    padding-top: 0;
  }
}

.EditorLayout_toggleConfigBarBtn {
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  height: var(--toggle-config-bar-size);
  width: var(--toggle-config-bar-size);
  padding: 0;
  z-index: var(--zindex-level-7);

  display: flex;
}
@media screen and (min-width: 768px) {
  .EditorLayout_toggleConfigBarBtn {
    display: none;
  }
}

.EditorLayout_boardContainer {
  background-color: var(--page-outer-bg, inherit);
  padding-top: var(--toggle-config-bar-area-margin);
  position: relative;
  min-height: 100dvh;
  width: 100dvw;
}
@media screen and (min-width: 768px) {
  .EditorLayout_boardContainer {
    width: calc(100dvw - var(--config-bar-width));
  }
}
</style>
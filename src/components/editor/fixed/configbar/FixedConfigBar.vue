<script setup lang="ts">
import { toRaw } from 'vue';
import type { IFixedElementEditingTextProps } from '@/types';
import { pageInfoStore } from '@/stores/pageInfo';
import { useFixedLayoutStore } from '@/stores/fixedLayout';
import { defaultImages } from "@/utils/fixedElement";
import FixedModule from './FixedModule.vue';
import FixedAddDraggableElement from './FixedAddDraggableElement.vue';
import FixedSecretInput from './FixedSecretInput.vue';
import FixedPropInput from './FixedPropInput.vue';
import FixedPropTextArea from './FixedPropTextArea.vue';
import FixedSelect from './FixedSelect.vue';

const fixedLayoutStore = useFixedLayoutStore();

const exportData = () => {
  console.info({
    id: pageInfoStore.id,
    name: pageInfoStore.name,
    attrs: {
      innerBackground: pageInfoStore.innerBackground,
      outerBackground: pageInfoStore.outerBackground,
    },
    elements: toRaw(fixedLayoutStore.deviceElements),
  });
};
</script>

<template>
  <div class="FixedConfigBar">
    <FixedModule>
      <FixedSecretInput>
        <input
          type="text"
          v-model="pageInfoStore.name"
          placeholder="Type something..."
        />
      </FixedSecretInput>
      <button @click="exportData">Export JSON (console)</button>
      <FixedPropInput for="inner-bg" label="Inner Background">
        <input
          id="inner-bg"
          type="color"
          v-model="pageInfoStore.innerBackground"
        />
      </FixedPropInput>
      <FixedPropInput for="outer-bg" label="Outer Background">
        <input
          id="outer-bg"
          type="color"
          v-model="pageInfoStore.outerBackground"
        />
      </FixedPropInput>
    </FixedModule>

    <FixedModule label="New Elements">
      <div style="margin-top: -.5rem; margin-bottom: -.5rem;">
        <FixedAddDraggableElement type="fixed--new-text">
          <div>Drag me (text)</div>
          <button @click="fixedLayoutStore.addDefaultTextElement(0,0)">+</button>
        </FixedAddDraggableElement>
        <FixedAddDraggableElement type="fixed--new-img">
          <div>Drag me (img)</div>
          <button @click="fixedLayoutStore.addDefaultImgElement(0,0)">+</button>
        </FixedAddDraggableElement>
        <FixedAddDraggableElement type="fixed--new-rectangle">
          <div>Drag me (rectangle)</div>
          <button @click="fixedLayoutStore.addDefaultRectangleElement(0,0)">+</button>
        </FixedAddDraggableElement>
      </div>
    </FixedModule>

    <FixedModule
      label="Element props"
      v-if="fixedLayoutStore.selectedElement"
    >
      <template #labelbtns>
        <button @click="fixedLayoutStore.duplicateSelectedElement()">
          d
        </button>
        <button @click="fixedLayoutStore.deleteSelectedElement()">
          x
        </button>
      </template>

      <FixedPropInput label="x" for="x">
        <input
          id="x"
          type="number"
          v-model="fixedLayoutStore.selectedElement.data.x"
        />
      </FixedPropInput>
      <FixedPropInput label="y" for="y">
        <input
          id="y"
          type="number"
          v-model="fixedLayoutStore.selectedElement.data.y"
        />
      </FixedPropInput>
      <FixedPropInput label="h" for="h">
        <input
          id="h"
          type="number"
          v-model="fixedLayoutStore.selectedElement.data.h"
        />
      </FixedPropInput>
      <FixedPropInput label="w" for="w">
        <input
          id="w"
          type="number"
          v-model="fixedLayoutStore.selectedElement.data.w"
        />
      </FixedPropInput>
      <FixedPropInput label="opacity" for="opacity">
        <input
          id="opacity"
          type="number"
          v-model="fixedLayoutStore.selectedElement.data.opacity"
          step=".1"
          min="0"
          max="1"
        />
      </FixedPropInput>
    </FixedModule>

    <FixedModule
      label="Text props"
      v-if="fixedLayoutStore.selectedElement && fixedLayoutStore.selectedElement.type === 'fixed--editing-text'"
    >
      <FixedPropInput label="Color" for="color">
        <input
          id="color"
          type="color"
          v-model="fixedLayoutStore.selectedElement.data.color"
        />
      </FixedPropInput>
      <FixedPropInput label="Font Size" for="fsize">
        <input
          id="fsize"
          type="number"
          v-model="fixedLayoutStore.selectedElement.data.fontSize"
        />
      </FixedPropInput>
      <FixedSelect label="Text Align (wip)" for="textalign">
        <select
          id="textalign"
          value="left"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </FixedSelect>
      <FixedPropTextArea label="Text" for="text">
        <textarea
          id="text"
          :value="fixedLayoutStore.selectedElement.data.text"
          @input="fixedLayoutStore.editSelectedTextProps({ text: [$event.target.value] })"
          placeholder="Type something..."
        ></textarea>
      </FixedPropTextArea>
    </FixedModule>

    <FixedModule
      label="Image props"
      v-if="fixedLayoutStore.selectedElement && fixedLayoutStore.selectedElement.type === 'fixed--editing-img'"
    >
      <FixedPropInput label="Border Radius" for="imgbdrd">
        <input
          id="imgbdrd"
          type="number"
          v-model="fixedLayoutStore.selectedElement.data.borderRadius"
        />
      </FixedPropInput>

      <div style="
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        gap: .5rem;
      ">
        <button
          v-for="img in defaultImages"
          @click="fixedLayoutStore.editSelectedImgProps({ url: img })"
          :style="{
            border: (fixedLayoutStore.selectedElement.data.url === img
              ? '2px solid lightgray'
              : 'none'
            ),
            width: 'calc(50% - 1rem)',
          }"
        >
          <img :src="img" width="50" height="50" />
        </button>
      </div>
      <FixedSecretInput for="imgUrl">
        <input
          id="imgUrl"
          type="string"
          v-model="fixedLayoutStore.selectedElement.data.url"
        />
      </FixedSecretInput>
    </FixedModule>

    <FixedModule
      label="Rectangle props"
      v-if="fixedLayoutStore.selectedElement && fixedLayoutStore.selectedElement.type === 'fixed--editing-rectangle'"
    >
      <FixedPropInput label="Background" for="rectbgcolor">
        <input
          id="rectbgcolor"
          type="color"
          v-model="fixedLayoutStore.selectedElement.data.background"
        />
      </FixedPropInput>
      <FixedPropInput label="Border Radius" for="imgbdrd">
        <input
          id="imgbdrd"
          type="number"
          v-model="fixedLayoutStore.selectedElement.data.borderRadius"
        />
      </FixedPropInput>
    </FixedModule>
  </div>
</template>

<style>
.FixedConfigBar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: .75rem 1rem;
  padding-bottom: 8rem;
}
</style>

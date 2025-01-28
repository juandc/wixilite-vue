<script setup lang="ts">
import { pageInfoStore } from '@/stores/pageInfo';
import { useFixedLayoutStore } from '@/stores/fixedLayout';
import {
  editingImgDefaults,
  editingRectangleDefaults,
  editingTextDefaults,
  addTextElementToElementsDict,
  addImgElementToElementsDict,
} from "@/utils/fixedElement";
import FixedModule from './FixedModule.vue';
import FixedAddDraggableElement from './FixedAddDraggableElement.vue';
import FixedSecretInput from './FixedSecretInput.vue';
import FixedPropInput from './FixedPropInput.vue';
import FixedPropTextArea from './FixedPropTextArea.vue';
import FixedSelect from './FixedSelect.vue';

const fixedLayoutStore = useFixedLayoutStore();

const addDefaultTextElement = (x: number, y: number) => {
  const newId = Date.now();
  fixedLayoutStore.editElements(addTextElementToElementsDict(newId, x,y));
};

const addDefaultImgElement = (x: number, y: number) => {
  const newId = Date.now();
  fixedLayoutStore.editElements(addImgElementToElementsDict(newId, x,y));
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
        <FixedAddDraggableElement>
          <div>Add text</div>
          <button @click="addDefaultTextElement(0,0)">+</button>
        </FixedAddDraggableElement>
        <FixedAddDraggableElement>
          <div>Add img</div>
          <button @click="addDefaultImgElement(0,0)">+</button>
        </FixedAddDraggableElement>
      </div>
    </FixedModule>

    <FixedModule label="Element props" v-if="fixedLayoutStore.selectedElement">
      <FixedPropInput label="x" for="x">
        <input
          id="x"
          type="text"
          value="0"
          placeholder="Type something..."
        />
      </FixedPropInput>
      <FixedPropInput label="y" for="y">
        <input
          id="y"
          type="text"
          value="0"
          placeholder="Type something..."
        />
      </FixedPropInput>
      <FixedPropTextArea label="Text" for="text">
        <textarea
          id="text"
          value="0"
          placeholder="Type something..."
        ></textarea>
      </FixedPropTextArea>
      <FixedSelect label="Text Align" for="textalign">
        <select
          id="textalign"
          value="left"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </FixedSelect>
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

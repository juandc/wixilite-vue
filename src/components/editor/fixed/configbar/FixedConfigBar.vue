<script setup lang="ts">
import { pageInfoStore } from '@/stores/pageInfo';
import FixedModule from './FixedModule.vue';
import FixedAddDraggableElement from './FixedAddDraggableElement.vue';
import FixedSecretInput from './FixedSecretInput.vue';
import FixedPropInput from './FixedPropInput.vue';
import FixedPropTextArea from './FixedPropTextArea.vue';
import FixedSelect from './FixedSelect.vue';
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
          <button>+</button>
        </FixedAddDraggableElement>
        <FixedAddDraggableElement>
          <div>Add img</div>
          <button>+</button>
        </FixedAddDraggableElement>
      </div>
    </FixedModule>

    <FixedModule label="Element props">
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

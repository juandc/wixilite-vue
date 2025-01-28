<template>
  <div class="FixedAddDraggableElement">
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

<template>
  <div class="FixedSecretInput">
    <slot></slot>
  </div>
</template>

<style>
.FixedSecretInput input {
  border: none;
  border-radius: .5rem;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  height: 2.5rem;
  width: 100%;
}
</style>

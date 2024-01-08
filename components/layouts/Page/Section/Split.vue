<script setup lang="ts"></script>
<template>
  <section
    ref="sectionRef"
    class="flex place-content-start items-center overflow-hidden relative"
  >
    <slot name="main" />
    <div class="w-1/2 relative h-screen flex flex-col place-content-center p-4">
      <slot name="left" />
    </div>
    <div class="w-1/2 relative h-screen flex flex-col place-content-center p-4">
      <slot name="right" />
    </div>
  </section>
</template>

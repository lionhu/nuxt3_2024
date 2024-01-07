<script setup lang="ts">
const props = defineProps({
  normal: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <div
    class="flex-1 w-full mx-auto"
    :class="props.normal ? 'py-4 px-4 max-w-screen-2xl' : ''"
  >
    <slot />
  </div>
</template>

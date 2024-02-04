<script lang="ts" setup>
const props = defineProps({
  size: {
    type: Number,
    default: 8,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <div class="container mx-auto w-full">
    <div
      id="test"
      :class="[
        `w-${size} h-${size} after:h-2 after:-translate-x-[30%] after:rounded-full`,
        loading ? 'animate-spin' : '',
      ]"
      class="bg-primary rounded-full overflow-hidden relative before:absolute before:bg-white before:inset-1 before:rounded-full after:absolute after:w-full after:top-1/2 after:bg-white after:overflow-hidden"
    ></div>
  </div>
</template>
<style scoped lang="scss"></style>

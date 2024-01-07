<script lang="ts" setup>
const dataLoading = useState<boolean>('dataLoading')
</script>

<template>
  <div>
    <LayoutPageNavbar2 />
    <LayoutPageSectionHero2 />
    <WidgetLoading v-if="dataLoading" />

    <div v-else class="overflow-x-hidden min-h-svh">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const dataLoading = useState<boolean>('dataLoading')
</script>

<template>
  <div class="relative">
    <WidgetLoading v-if="dataLoading" />
    <div v-else class="overflow-x-hidden">
      <LayoutPageContent>
        <slot />
      </LayoutPageContent>
    </div>
  </div>
</template>

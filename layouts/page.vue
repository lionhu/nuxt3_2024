<script lang="ts" setup>
const dataLoading = useState<boolean>('dataLoading')
</script>

<template>
  <div>
    <WidgetLoading v-if="dataLoading" />
    <div v-else class="overflow-x-hidden">
      <LayoutPageNavbar class="h-[64px] max-h-[64px]" />
      <LayoutPageContent>
        <slot />
      </LayoutPageContent>
      <LayoutPageFooter />
      <!-- <LayoutPageFooter class="h-[52px] md:h-[42px]" /> -->
    </div>
  </div>
</template>

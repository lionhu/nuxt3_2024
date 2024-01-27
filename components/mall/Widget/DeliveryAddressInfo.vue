<script setup lang="ts">
import type { PropType } from 'vue'
import type { Addressbook } from '~~/types/addressbook'

const props = defineProps({
  addressInfo: {
    type: Object as PropType<Addressbook>,
    require: true,
    default: null,
  },
})
const { t } = useLang()
</script>
<template>
  <h3 class="text-lg font-semibold mb-5">
    {{ t('pages.mall.payment.delivery') }}
  </h3>
  <ul class="text-gray-800 dark:text-white">
    <li class="mb-4">
      <span class="list_title font-bold">{{
        t('pages.mall.addressbook.name')
      }}</span>
      <span class="list_content"> {{ addressInfo.name }}</span>
    </li>
    <li class="mb-4">
      <span class="list_title font-bold">{{
        t('pages.mall.addressbook.address')
      }}</span>
      <span class="list_content mr-1"> {{ addressInfo.postcode }}</span>
      <span> {{ addressInfo.address_first }}</span>
    </li>
    <li class="mb-4 indent-[2rem]">
      <span class="list_content"> {{ addressInfo.address_last }}</span>
    </li>
    <li class="mb-4">
      <span class="list_title font-bold">{{
        t('pages.mall.addressbook.email')
      }}</span>
      <a
        class="transition-all hover:text-orange list_content"
        href="mailto:info@gmail.com"
      >
        {{ addressInfo.email }}</a
      >
    </li>
    <li class="mb-4">
      <span class="list_title font-bold">{{
        t('pages.mall.addressbook.phone')
      }}</span>
      <a
        class="transition-all hover:text-orange list_content"
        :href="`tell:${addressInfo.phone}`"
      >
        {{ addressInfo.phone }}</a
      >
    </li>
  </ul>
</template>
<style scoped lang="scss">
.list_title {
  display: inline-block;
  width: 5rem;
  text-align: left;
  position: relative;
}
.list_title::after {
  content: ':';
  position: absolute;
  right: 0;
}

.list_content {
  display: inline-block;
  margin-left: 1rem;
}
</style>

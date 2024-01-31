<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import type { PropType } from 'vue'
import type { Product, Variation } from '~~/types/shop'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: undefined,
  },
})
const modalDetailIsopen = ref(false)
const _modalAddCartIsopen = ref(false)
const processAction = (e: string, value: any) => {
  console.log('processAction', e, value)

  switch (e) {
    case 'show_details':
      modalDetailIsopen.value = value
      break
    case 'show_cart':
      _modalAddCartIsopen.value = value
      break
    default:
      break
  }
}

const { minProductPrice } = useShop()
const hasVariation = computed(() => props.product!.variations.length > 0)
</script>

<template>
  <div
    v-if="product"
    class="border border-solid border-gray-300 transition-all hover:shadow-product group dark:border-gray-600 w-full aspect-w-1 aspect-h-1 overflow-hidden"
    :class="[
      product.imagesList
        ? `bg-url['${product.imagesList.url}'] object-cover object-center`
        : '',
    ]"
  >
    <div
      class="rounded-xl bg-white p-3 relative aspect-square flex items-center ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2"
    >
      <div
        v-if="product.info && product.info.new"
        class="ribbon flex items-center justify-center"
      >
        <span class="font-bold uppercase text-xs text-black bg-white -mt-2"
          >New</span
        >
      </div>
      <div
        v-if="product.info && product.info.sales"
        class="absolute top-3 right-3 bg-orange rounded-full h-12 w-12 text-xs text-black  flex flex-col items-center justify-center ring-2 ring-white"
      >
        <span class="font-bold uppercase block text-white">Sale</span>
        <span class="font-bold uppercase block text-white"
          >-{{ product.info.sales.discount }}%</span
        >
      </div>

      <!-- <img :src="product.imagesList.url" class="w-full mx-auto inline-block" /> -->
      <MallWidgetActionIcons @trigger-action="processAction" />
    </div>

    <MallModalProductDetail v-model="modalDetailIsopen" :product="product" />
    <MallModalAddCart v-model="_modalAddCartIsopen" :product="product" />
  </div>
</template>

<style scope>
.ribbon {
  width: 0px;
  height: 45px;
  background-color: transparent;
  position: absolute;
  top: -5px;
  left: 10px;
  border: solid 15px #bbe305;
  border-bottom: solid 8px transparent;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  transition: all 0.2s;
  cursor: pointer;
}
</style>

<script lang="ts" setup>
import type { PropType } from 'vue'
// import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import type { Product, Variation } from '~~/types/shop'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: () => ({}),
  },
})
const modalDetailIsopen = ref(false)
const _modalAddCartIsopen = ref(false)
const processAction = (e: string, value: any) => {
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
    class="w-full max-h-[240px] transition-all hover:shadow-product group relative overflow-hidden"
  >
    <div
      class="w-full aspect-square rounded-xl bg-white relative ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2"
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
        class="absolute top-3 right-3 bg-orange rounded-full h-12 w-12 text-xs text-white flex flex-col items-center justify-center ring-2 ring-white"
      >
        <span class="font-bold uppercase block text-white">Sale</span>
        <span class="font-bold uppercase block text-white"
          >-{{ product.info.sales.discount }}%</span
        >
      </div>
      <img
        class="w-full h-full object-center object-cover"
        :src="product.imagesList.thumb"
      />

      <MallWidgetActionIcons @trigger-action="processAction" />
    </div>
    <div
      class="p-2 bg-gray-700 shadow absolute w-full -bottom-40 group-hover:bottom-0 z-1 transition-all duration-500 ease-linear opacity-90"
    >
      <h4
        class="block text-white text-sm hover:text-primary transition-all mb-2"
      >
        {{ product.name }}
      </h4>
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

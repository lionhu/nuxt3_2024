<script lang="ts" setup>
import type { PropType } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import type { Product, Variation } from '~~/types/shop'
import { getStrapiMedia } from '~~/utils/strapi_medias'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: undefined,
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
    class="product_item border border-solid border-gray-300 transition-all hover:shadow-product group mt-3 dark:border-gray-600"
  >
    <TabGroup>
      <TabPanels class="z-10">
        <TabPanel
          v-for="(image, idx) in product.imagesList"
          :key="idx"
          class="rounded-xl bg-white p-1 relative aspect-square flex items-center ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2"
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
            :src="product.imagesList.thumb"
            class="w-full mx-auto inline-block"
          />
          <MallWidgetActionIcons @trigger-action="processAction" />
        </TabPanel>
      </TabPanels>
    </TabGroup>

    <div class="py-5 px-4">
      <h3 class="mt-4">
        <a
          class="block text-base hover:text-orange transition-all"
          href="javascript:void(0);"
          @click="modalDetailIsopen = true"
          >{{ product.name }}</a
        >
      </h3>
      <h4
        v-if="minProductPrice(product) !== ''"
        class="font-bold text-md leading-none text-orange mt-3"
      >
        <!-- <del class="font-normal text-sm mr-1 inline-block">$110.00</del> -->
        {{ hasVariation ? minProductPrice(product) : '' }}
        {{ hasVariation ? '~' : '' }}
      </h4>
      <button
        v-else
        type="button"
        class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        For Member
      </button>
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

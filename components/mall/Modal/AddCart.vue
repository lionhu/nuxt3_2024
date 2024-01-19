<script setup lang="ts">
import type { PropType } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { randomToken } from '~~/utils/str'
import { getStrapiMedia } from '~~/utils/strapi_medias'
import type { Product } from '~~/types/shop'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object as PropType<Product>,
    default: undefined,
  },
})
const emit = defineEmits(['update:modelValue'])
const modelValue = useSyncProps<boolean>(props, 'modelValue', emit)

function setIsOpen(value: any) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div v-if="product">
    <TransitionRoot appear :show="modelValue" as="template">
      <Dialog
        :key="randomToken"
        as="div"
        :open="modelValue"
        class="relative z-100"
        @close="setIsOpen(false)"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

        <!-- Full-screen scrollable container -->
        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-3/5 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <!-- <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  <div class="flex justify-between items-center">
                    <span>AddressBook</span>
                  </div>
                </DialogTitle> -->
                <div class="md:flex md:flex-wrap">
                  <div class="md:mr-5 md:flex-30 mb-5 md:mb-0">
                    <img
                      class="w-full md:w-max-64"
                      :src="getStrapiMedia(product.images[0].url)"
                    />
                  </div>
                  <div class="md:flex-auto">
                    <button
                      class="text-black text-lg absolute top-7 right-7 modal-close"
                      @click="setIsOpen(false)"
                    >
                      <Icon name="ri:close-circle-fill" />
                    </button>
                    <h3 class="text-dark font-medium text-md sm:text-lg mb-4">
                      Airpod product kiebd
                    </h3>
                    <p class="text-dark text-sm flex flex-wrap items-center">
                      <i class="icon-check text-lg mr-5"></i> Added to cart
                      successfully!
                    </p>
                    <div class="mt-8">
                      <nuxt-link
                        to="/mall/cart"
                        class="bg-black leading-none py-2 px-5 font-normal text-sm text-white transition-all hover:bg-orange mr-5"
                      >
                        View Cart
                      </nuxt-link>
                      <nuxt-link
                        to="/mall/checkout"
                        class="bg-black leading-none py-2 px-5 font-normal text-sm text-white transition-all hover:bg-orange"
                      >
                        Checkout
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

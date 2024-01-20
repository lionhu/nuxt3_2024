<script setup lang="ts">
import { storeToRefs } from 'pinia'
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
import type { Product, Variation } from '~~/types/shop'
import { useShopStore } from '~~/stores/use-shop'
import { useIdentity } from '~~/stores/use-identity'

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

const { t } = useLang()
const storeUser = useIdentity()
const { user, rolename } = storeToRefs(storeUser)
const storeShop = useShopStore()
const { showToast } = useSwal()

const num = ref(1)
const variationId = ref(0)
const btnDisabled = computed(() => {
  return variationId.value === 0
})

const selectVariation = computed((): Variation => {
  const idx = props.product!.variations.findIndex(
    (variation: Variation) => variation.id === variationId.value,
  )
  return props.product!.variations[idx]
})

const userrole = computed(() => {
  if (user.value) return rolename.value
})

const setIsOpen = (value: any) => {
  emit('update:modelValue', value)
}
const addCart = (product: Product) => {
  // console.log(selectVariation)
  const _cartitem = {
    qty: num.value,
    total: num.value * selectVariation.value.price,
    price: selectVariation.value.price,
    product: product.id,
    variation: variationId.value,
  }
  // console.log('addCart _cartitem', _cartitem)

  if (variationId.value > 0) {
    const newValue = storeShop.addCartItem(_cartitem)
    showToast({
      icon: 'success',
      title: t('apps.mall.modals.product_detail.added_to_cart', {
        num: newValue,
      }),
      timer: 1000,
    })
  }
}
</script>

<template>
  <div>
    <TransitionRoot v-if="product" appear :show="modelValue" as="template">
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
                class="w-full md:max-w-screen-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  <div class="flex justify-between items-center">
                    <span>AddressBook</span>
                    <button
                      class="text-black text-lg absolute top-7 right-7 modal-close"
                      @click="setIsOpen(false)"
                    >
                      <Icon name="ri:close-circle-fill" />
                    </button>
                  </div>
                </DialogTitle>
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="flex-0 my-auto">
                    <img :src="product.imagesList.url" />
                    <!-- <MallWidgetProductImageSlider :product="product" /> -->
                  </div>
                  <div class="flex-1">
                    <h3
                      :class="[
                        'text-gray-700 text-md lg:text-lg leading-none',
                        !selectVariation && 'mb-4',
                      ]"
                    >
                      {{ product.name }}
                    </h3>
                    <h4
                      v-if="selectVariation"
                      class="text-gray-700 font-medium text-md lg:text-lg leading-none mb-4"
                    >
                      {{ selectVariation.name }}
                    </h4>
                    <div>
                      <MallWidgetPopperMessage
                        v-if="selectVariation && selectVariation.price"
                        class="py-3"
                      >
                        <template #displayText>
                          <span
                            class="font-bold text-md leading-none text-orange mb-8"
                          >
                            {{ currencyJPY(selectVariation.price) }}
                          </span>
                        </template>
                        <template #popper>
                          <div
                            v-if="
                              userrole === 'staff' || userrole === 'reseller'
                            "
                            class="p-4 h-min-[120px] flex flex-col justify-center items-center"
                          >
                            <p v-if="userrole === 'staff'">
                              <span class="w-[90px] mr-2 font-bold text-primary"
                                >Buy price:</span
                              >{{ currencyJPY(selectVariation.buy_price) }}
                            </p>
                            <p
                              v-if="
                                userrole === 'staff' || userrole === 'reseller'
                              "
                            >
                              <span class="w-[90px] mr-2 font-bold text-primary"
                                >Reseller price:</span
                              >{{ currencyJPY(selectVariation.r_price) }}
                            </p>
                          </div>
                          <div
                            v-else
                            class="p-4 flex flex-col justify-center items-center"
                          >
                            product price
                          </div>
                        </template>
                      </MallWidgetPopperMessage>
                    </div>
                    <div
                      class="mb-5 text-sm text-gray-800 h-full max-h-48 overflow-y-auto"
                      v-html="product.description"
                    ></div>
                    <select
                      v-model="variationId"
                      class="w-full h-12 border border-solid border-gray-300 px-5 py-2 appearance-none text-gray-800"
                      style="
                        background: rgba(0, 0, 0, 0)
                          url('https://htmldemo.net/sinp/sinp/assets/images/icon/qcv-arrow-down.webp')
                          no-repeat scroll right 20px center;
                      "
                    >
                      <option
                        v-for="(variation, idx) in product.variations"
                        :key="idx"
                        :value="variation.id"
                      >
                        {{ variation.name }}
                      </option>
                    </select>

                    <div
                      class="flex flex-wrap items-center mt-8 text-gray-800 justify-between"
                    >
                      <div
                        class="flex count border border-solid border-gray-300 p-2 h-11"
                      >
                        <button
                          class="decrement flex-auto w-5 leading-none"
                          aria-label="button"
                          @click="num - 1 > 0 ? num-- : 0"
                        >
                          -
                        </button>
                        <input
                          v-model="num"
                          type="number"
                          min="1"
                          max="100"
                          step="1"
                          class="text-gray-600 bg-white flex-auto w-8 text-center focus:outline-none input-appearance-none"
                        />
                        <button
                          class="increment flex-auto w-5 leading-none"
                          aria-label="button"
                          @click="num += 1"
                        >
                          +
                        </button>
                      </div>
                      <div class="ml-2 sm:ml-8">
                        <button
                          :class="[
                            'bg-black leading-none py-4 px-5 md:px-8 font-normal text-sm h-11 text-white transition-all ',
                            !btnDisabled ? 'hover:bg-orange' : '',
                          ]"
                          :disabled="btnDisabled"
                          @click="product && addCart(product)"
                        >
                          {{ t('pages.mall.buttons.add_to_cart') }}
                        </button>
                      </div>
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

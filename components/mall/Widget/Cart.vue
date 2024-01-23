<script setup lang="ts">
import type { DisplayCartItem } from '~~/types/shop'
import { useShopStore } from '~~/stores/use-shop'

const props = defineProps({
  editable: {
    type: Boolean,
    require: false,
    default: false,
  },
})
const { t } = useLang()
const emit = defineEmits(['operateCartItem'])
const storeShop = useShopStore()
const { showToast } = useSwal()

const { cartitems, emptyCart } = useShop()
const operateCartItem = (
  action: string,
  product: number,
  variation: number,
  price: number,
  qty: number = 1,
) => {
  const _item = {
    qty,
    total: qty * price,
    price,
    product,
    variation,
  }

  let nowNum = 0
  switch (action) {
    case 'add':
      nowNum = storeShop.addCartItem(_item)
      break
    case 'delete':
      nowNum = storeShop.deleteCartitem(_item)
      break
    case 'remove':
      storeShop.removeCartItem(_item)
      break
    default:
      console.log('default')
  }

  showToast({
    icon: 'success',
    title:
      action !== 'remove'
        ? t('pages.mall.modals.product_detail.added_to_cart', { num: nowNum })
        : t('pages.mall.modals.product_detail.removed_successfully'),
    timer: 1000,
  })
}

// const modelValue = useSyncProps<boolean>(props, 'modelValue', emit)
</script>
<template>
  <div
    class="w-full bg-white dark:bg-gray-800 h-full lg:px-8 lg:py-8 md:px-6 px-4 md:py-6 py-4"
  >
    <div class="pt-3 flex justify-between items-center">
      <span
        class="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white"
      >
        {{ t('pages.mall.cart.title') }}
      </span>
      <a href="javascript:void(0);" @click="emptyCart">
        <span class="lg:text-2xl text-xl font-black leading-10 text-red-800">
          <Icon name="material-symbols:delete-rounded" />
        </span>
      </a>
    </div>

    <div
      v-for="(item, idx) in cartitems"
      :key="idx"
      class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50"
    >
      <div class="md:w-4/12 2xl:w-1/4 w-full">
        <img
          v-if="item.product"
          :src="item.product.imagesList.url"
          class="w-full object-center object-cover md:block hidden"
        />
        <img
          v-if="item.product"
          :src="item.product.imagesList.url"
          class="w-full object-center object-cover md:hidden"
        />
      </div>
      <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
        <p class="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">
          {{ item.product.name }}
        </p>
        <div class="flex items-center justify-between w-full pt-1">
          <p
            class="text-base font-black leading-none text-gray-800 dark:text-white"
          >
            {{ item.variation.name }}
          </p>
          <div class="flex count border border-solid border-gray-300 p-2 h-11">
            <button
              v-if="editable"
              class="decrement flex-auto w-5 leading-none"
              aria-label="button"
              @click="
                item.variation &&
                  operateCartItem(
                    'delete',
                    item.product,
                    item.variation,
                    item.variation.price,
                    1,
                  )
              "
            >
              -
            </button>
            <input
              type="number"
              :value="item.qty"
              disabled
              class="quantity__input flex-auto w-8 text-center focus:outline-none input-appearance-none"
            />
            <button
              v-if="editable"
              class="increment flex-auto w-5 leading-none"
              aria-label="button"
              @click="
                item.variation &&
                  operateCartItem(
                    'add',
                    item.product,
                    item.variation,
                    item.variation.price,
                    1,
                  )
              "
            >
              +
            </button>
          </div>
        </div>
        <p class="text-xs leading-3 text-gray-600 dark:text-white pt-2">
          Price: {{ currencyJPY(item.variation.price) }}
        </p>
        <p class="text-xs leading-3 text-gray-600 dark:text-white py-4">
          Description: {{ item.variation.description?.substring(0, 80) }}
        </p>
        <div class="flex items-center justify-between pt-5">
          <div class="flex itemms-center">
            <p
              class="text-sm leading-3 underline text-primary pl-5 cursor-pointer"
            >
              <button
                v-if="editable"
                class="btn gap-2 flex items-center justify-center"
                @click="
                  item.variation &&
                    operateCartItem(
                      'remove',
                      item.product,
                      item.variation,
                      item.variation.price,
                      1,
                    )
                "
              >
                remove
                <Icon name="ri:delete-bin-2-fill" />
              </button>
            </p>
          </div>
          <p
            class="text-base font-black leading-none text-gray-800 dark:text-white"
          >
            {{ currencyJPY(item.total) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

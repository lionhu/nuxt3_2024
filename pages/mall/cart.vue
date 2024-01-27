<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getStrapiMedia } from '~~/utils/strapi_medias'
import { useShopStore } from '~~/stores/use-shop'
import { capitalize, currencyJPY } from '~~/utils/str'
import type {
  Product,
  Variation,
  SimpleCartItem,
  DisplayCartItem,
} from '~~/types/shop'

const { t } = useLang()
const { showToast } = useSwal()
// compiler macro
definePageMeta({
  layout: 'page',
  middleware: ['enable-shopping', 'auth', 'empty-cart'],
})

const storeShop = useShopStore()
const { cartitems, Total, Qty } = storeToRefs(storeShop)
watch(Qty, (newVal) => {
  if (Qty.value === 0) navigateTo('/mall')
})
</script>

<template>
  <LayoutPageWrapper>
    <LayoutPageHeader>
      <div class="py-9 bg-gray-200 dark:bg-gray-700">
        <div class="container mx-auto">
          <div class="grid grid-cols-12 gap-x-4">
            <div class="col-span-12">
              <nav>
                <ul class="flex flex-wrap items-center justify-center">
                  <li class="mr-5">
                    <nuxt-link
                      to="/"
                      class="text-dark font-bold text-base uppercase transition-all hover:text-orange relative before:w-5 before:h-1px before:empty before:absolute before:top-3 before:bg-dark before:transform before:rotate-115 before:-right-5 dark:text-gray-300"
                      >Home</nuxt-link
                    >
                  </li>
                  <li
                    class="text-dark font-bold text-base uppercase mr-5 dark:text-gray-300"
                  >
                    Checkout page
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </LayoutPageHeader>

    <LayoutPageSection>
      <client-only>
        <div
          v-if="cartitems.length"
          class="w-full bg-gray-200 dark:bg-gray-800 bg-opacity-90 py-4"
        >
          <div
            class="w-full flex items-start lg:flex-row flex-col justify-center md:space-x-4"
          >
            <div class="w-full lg:w-1/2">
              <MallWidgetCart
                :cart-items="cartitems"
                :editable="true"
              ></MallWidgetCart>
            </div>
            <div
              class="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full"
            >
              <div
                class="flex flex-col lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 justify-between"
              >
                <!-- <div>
                  <p
                    class="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white"
                  >
                    {{ t('pages.mall.cart.summary') }}
                  </p>
                  <div class="flex items-center justify-between pt-16">
                    <p
                      class="text-base leading-none text-gray-800 dark:text-white"
                    >
                      {{ t('pages.mall.cart.subtotal') }}
                    </p>
                    <p
                      class="text-base leading-none text-gray-800 dark:text-white"
                    >
                      {{ currencyJPY(Total) }}
                    </p>
                  </div>
                </div> -->
                <div>
                  <div
                    class="flex items-center pb-6 justify-between lg:pt-5 pt-20"
                  >
                    <p
                      class="text-2xl leading-normal text-gray-800 dark:text-white"
                    >
                      {{ t('pages.mall.cart.total') }}
                    </p>
                    <p
                      class="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white"
                    >
                      {{ currencyJPY(Total) }}
                    </p>
                  </div>
                  <nuxt-link
                    to="/mall/checkout"
                    class="block w-full text-center leading-none uppercase text-white text-sm bg-dark px-5 py-5 transition-all hover:bg-primary font-semibold"
                    refresh
                  >
                    {{ t('pages.mall.cart.checkout') }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </client-only>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>

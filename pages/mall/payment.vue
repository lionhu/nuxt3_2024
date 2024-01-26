<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { capitalize, currencyJPY } from '~/utils/str'
const app: any = useAppConfig()

const { t } = useLang()
const { awesome } = useAppConfig()

console.log(awesome?.mall?.payments?.creditcard?.image)

definePageMeta({
  layout: 'page',
  // middleware: ['enable-shopping', 'auth', 'empty-payment'],
})
useHead(() => ({
  // title: capitalize(t('pages.test.title')),
  // meta: [
  //   {
  //     name: 'description',
  //     content: t('pages.test.description'),
  //   },
  // ],
  script: [
    {
      type: 'module',
      src: 'https://sandbox.web.squarecdn.com/v1/square.js',
    },
  ],
}))

const isCardPaymentOpen = ref(false)
const {
  orderPayCreditcard,
  settings,
  order,
  cartitems,
  Qty,
  Total,
  ValidCart,
} = useShop()

// const storeAddressBook = useAddressbookStore()
// const { selectedAddressbook } = storeToRefs(storeAddressBook)

const showPaymentModal = (e: Event) => {
  e.preventDefault()
  isCardPaymentOpen.value = true
}
</script>

<template>
  <LayoutPageWrapper>
    <client-only>
      <LayoutPageSection v-if="order">
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
        <div class="py-4">
          <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12 lg:col-span-7 mt-4 mt-lg-0">
              <div class="w-full">
                <MallWidgetCart
                  :cart-items="cartitems"
                  :editable="false"
                ></MallWidgetCart>
              </div>
            </div>
            <div class="col-span-12 lg:col-span-5 lg:py-10">
              <div
                class="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-6 mb-10"
              >
                <h3 class="text-lg font-semibold mb-5">
                  {{ t('pages.mall.payment.delivery') }}
                </h3>
                <ul class="text-gray-800 dark:text-white">
                  <li class="mb-4">
                    <span class="list_title font-bold"
                      >{{ t('pages.mall.addressbook.name') }}:</span
                    >
                    <span class="list_content">
                      {{ order.address_json?.name }}</span
                    >
                  </li>
                  <li class="mb-4">
                    <span class="list_title font-bold"
                      >{{ t('pages.mall.addressbook.address') }}:</span
                    >
                    <span class="list_content mr-1">
                      {{ order.address_json?.postcode }}</span
                    >
                    <span> {{ order.address_json?.address_first }}</span>
                  </li>
                  <li class="mb-4 indent-2em">
                    <span class="list_content font-bold">
                      {{ order.address_json?.address_last }}</span
                    >
                  </li>
                  <li class="mb-4">
                    <span class="list_title font-bold"
                      >{{ t('pages.mall.addressbook.email') }}:</span
                    >
                    <a
                      class="transition-all hover:text-orange list_content"
                      href="mailto:info@gmail.com"
                    >
                      {{ order.address_json?.email }}</a
                    >
                  </li>
                  <li class="mb-4">
                    <span class="list_title font-bold"
                      >{{ t('pages.mall.addressbook.phone') }}:</span
                    >
                    <a
                      class="transition-all hover:text-orange list_content"
                      :href="`tell:${order.address_json?.phone}`"
                    >
                      {{ order.address_json?.phone }}</a
                    >
                  </li>
                </ul>
                <div v-if="app.useCoupon" class="mt-4 p-4 border-1 rounded-md">
                  <form action="#">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                      <div class="col-span-2">
                        <h3 class="text-md font-semibold capitalize mb-8">
                          Discount coupon Code
                        </h3>
                      </div>

                      <div class="col-span-2 sm:col-span-1">
                        <input
                          class="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-gray-200 h-12 focus:outline-none text-base"
                          placeholder="coupon Code"
                          type="text"
                        />
                      </div>

                      <div class="col-span-2 sm:col-span-1">
                        <a href="#" class="hyperlink-btn-dark">apply code</a>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  v-if="settings && settings.payment.creditcard"
                  class="mt-8 p-4"
                >
                  <div class="mt-2">
                    <MallCard>
                      <MallCardContent>
                        <MallCardTitle>{{
                          t('pages.mall.payment.pay_by_creditcard')
                        }}</MallCardTitle>
                        <div class="w-full flex items-center justify-center">
                          <a
                            v-if="ValidCart"
                            class="hyperlink-btn-dark flex items-center justify-center space-x-2 group"
                            href="javascript:void(0)"
                            @click="showPaymentModal"
                          >
                            <Icon
                              name="ri:visa-fill"
                              class="text-xl text-yellow-400 group-hover:(text-white text-2xl)"
                            />
                            <span
                              >{{
                                t('pages.mall.payment.pay_by_creditcard')
                              }}({{ currencyJPY(Total) }})</span
                            >
                          </a>
                        </div>
                      </MallCardContent>
                    </MallCard>
                  </div>
                </div>
                <div class="w-full flex flex-col space-x-1">
                  <div
                    v-if="settings && settings.payment.alipay"
                    class="mt-8 p-4"
                  >
                    <MallCard>
                      <MallCardContent>
                        <MallCardTitle>{{
                          t('pages.mall.payment.alipay')
                        }}</MallCardTitle>
                        <div
                          class="w-full h-max-64 flex items-center justify-center"
                        >
                          <img
                            :src="settings.payment.alipay_imageUrl"
                            class="h-full"
                          />
                        </div>
                      </MallCardContent>
                      <MallCardFooter>
                        <h2 class="text-primary">
                          Please add memo " WA{{ order && order.id }} "
                        </h2>
                      </MallCardFooter>
                    </MallCard>
                  </div>
                  <div
                    v-if="settings && settings.payment.wechat"
                    class="mt-8 p-4"
                  >
                    <MallCard>
                      <MallCardContent>
                        <MallCardTitle>{{
                          t('pages.mall.payment.wechat')
                        }}</MallCardTitle>
                        <div
                          class="w-full h-max-64 flex items-center justify-center"
                        >
                          <img
                            :src="settings.payment.wechat_imageUrl"
                            class="h-full"
                          />
                        </div>
                      </MallCardContent>

                      <MallCardFooter>
                        <h2 class="text-primary">
                          Please add memo " WA{{ order && order.id }} "
                        </h2>
                      </MallCardFooter>
                    </MallCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MallModalCardPayment
          v-model="isCardPaymentOpen"
          :order_id="order.id"
          :Total="Total"
          from-url="checkout"
        />
      </LayoutPageSection>
    </client-only>
  </LayoutPageWrapper>
</template>

<style>
.list_title {
  display: inline-block;
  width: 6rem;
  text-align: right;
}
.list_content {
  display: inline-block;
  margin-left: 1rem;
}
.before\:empty::before {
  content: '';
}
.before\:bg-dark::before {
  --tw-bg-opacity: 1;
  background-color: rgb(31 34 38 / var(--tw-bg-opacity));
}
</style>

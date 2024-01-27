<script lang="ts" setup>
import Swal from 'sweetalert2'

const { t } = useLang()
// compiler macro
definePageMeta({
  layout: 'page',
  middleware: ['enable-shopping', 'auth', 'empty-cart'],
})
// useHead(() => ({
//   title: capitalize(t('pages.test.title')),
//   meta: [
//     {
//       name: 'description',
//       content: t('pages.test.description'),
//     },
//   ],
// }))

const isopen = ref(false)

const { showToast } = useSwal()
const { placeOrder, Qty, Total, ValidCart, cartitems } = useShop()

const { getUserAddressbooks, getUserDefaultAddressbook, selectedAddressbook } =
  useAddressBook()

// onMounted(() => {
getUserAddressbooks()
// })

const fnPlaceOrder = async (e: Event) => {
  e.preventDefault()
  try {
    if (selectedAddressbook.value !== null) {
      const dataOrder = {
        addressbook: selectedAddressbook.value.id,
        Total: Total.value,
        Qty: Qty.value,
        cartitems: cartitems.value,
      }
      showToast({
        icon: 'info',
        title: t('pages.mall.checkout.place_order_processing'),
        timer: 2000,
      })

      await placeOrder(dataOrder)
    }
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
      footer: '<a href="">Contact admin?</a>',
    })
  }
}
</script>

<template>
  <LayoutPageWrapper>
    <LayoutPageHeader>
      <!-- <PageTitle :text="$t('pages.test.title')" class="capitalize" /> -->
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
        <div class="px-4 py-4 md:py-12 md:max-w-[80%] md:mx-auto">
          <h2 class="text-xl font-bold mb-4">
            {{ t('pages.mall.checkout.billing_detail') }}
          </h2>
          <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12 lg:col-span-7">
              <div>
                <!-- <form
                  class="personal-information"
                  action="assets/php/contact.php"
                > -->
                <div class="flex justify-center items-center mb-2">
                  <div>
                    <a
                      class="hyperlink-btn-dark flex"
                      href="javascript:void(0)"
                      @click="isopen = !isopen"
                    >
                      <span class="inline-block">
                        {{ t('pages.mall.addressbook.title') }}</span
                      >
                      <Icon
                        name="ri:contacts-book-fill"
                        class="ml-3 mx-auto inline-block text-2xl"
                      />
                    </a>
                  </div>
                </div>
                <div>
                  <MallWidgetDeliveryAddressInfo
                    v-if="selectedAddressbook"
                    :address-info="selectedAddressbook"
                  />
                  <UAlert
                    v-else
                    color="primary"
                    variant="solid"
                    :title="
                      t('pages.mall.addressbook.alert.require_address.title')
                    "
                    :description="
                      t(
                        'pages.mall.addressbook.alert.require_address.description',
                      )
                    "
                  />
                </div>
              </div>
            </div>
            <div class="col-span-12 lg:col-span-5 mt-1 mt-lg-0">
              <div>
                <div
                  class="flex items-center lg:flex-row flex-col justify-center space-x-4"
                >
                  <MallWidgetCart :cart-items="cartitems" :editable="false">
                  </MallWidgetCart>
                </div>

                <div class="mt-6">
                  <WidgetButton
                    v-if="ValidCart"
                    class="hyperlink-btn-dark"
                    href="javascript:void(0)"
                    @click="fnPlaceOrder"
                    >{{ t('pages.mall.checkout.place_order') }}
                  </WidgetButton>
                  <p v-else class="text-orange px-3">
                    You have to set Delivery information or your cart
                    information is incorrect. Please Refresh page or report to
                    us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </client-only>
      <MallModalSelectAddressbook v-model="isopen" />
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>

<style>
.before\:empty::before {
  content: '';
}
.before\:bg-dark::before {
  --tw-bg-opacity: 1;
  background-color: rgb(31 34 38 / var(--tw-bg-opacity));
}
</style>

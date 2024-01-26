<script setup lang="ts">
import Swal from 'sweetalert2'
import type { PropType } from 'vue'
import { storeToRefs } from 'pinia'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { useShopStore } from '~~/stores/use-shop'
import type { swalIcons } from '~/models/swal'
import { randomToken } from '~~/utils/str'
const { awesome } = useAppConfig()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  order_id: {
    type: Number,
    default: 0,
  },
  Total: {
    type: Number,
    default: 0,
  },
  fromUrl: {
    type: String,
    required: false,
    default: 'checkout',
  },
})
const { t } = useLang()
const emit = defineEmits(['update:modelValue'])
const modelValue = useSyncProps<boolean>(props, 'modelValue', emit)
const router = useRouter()
const config = useRuntimeConfig()

let cardCredit: any = null
const showLoading = ref(true)
const storeShop = useShopStore()

const { showToast } = useSwal()
const { orderPayCreditcard } = useShop()

const darkModeCardStyle = {
  '.input-container': {
    borderColor: '#2D2D2D',
    borderRadius: '6px',
  },
  '.input-container.is-focus': {
    borderColor: '#006AFF',
  },
  '.input-container.is-error': {
    borderColor: '#ff1600',
  },
  '.message-text': {
    color: '#999999',
  },
  '.message-icon': {
    color: '#999999',
  },
  '.message-text.is-error': {
    color: '#ff1600',
  },
  '.message-icon.is-error': {
    color: '#ff1600',
  },
  input: {
    backgroundColor: '#2D2D2D',
    color: '#999999',
    fontFamily: 'helvetica neue, sans-serif',
  },
  'input::placeholder': {
    color: '#999999',
  },
  'input.is-error': {
    color: '#ff1600',
  },
}
watch(modelValue, async (newvalue, oldvalue) => {
  if (newvalue) {
    const locationId = config.public.Square_locationId
    const applicationId = config.public.Square_applicationId

    // @ts-ignore
    const payments = window.Square.payments(applicationId, locationId)
    const card = await payments.card({
      style: darkModeCardStyle,
    })
    await card.attach('#card-container')
    cardCredit = card
    showLoading.value = false
  }
})
const pay_order = (e: Event) => {
  e.preventDefault()
  if (props.order_id > 0 && props.Total > 0) {
    cardCredit
      .tokenize()
      .then(async (res: any) => {
        const dataOrder = {
          sourceId: res.token,
          Total: props.Total,
        }

        Swal.fire({
          title: 'Pay your order by Credit Card',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: t('buttons.continue'),
          cancelButtonText: t('buttons.cancel'),
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return orderPayCreditcard(props.order_id, dataOrder)
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result: any) => {
          if (result.isConfirmed && result.value) {
            storeShop.empty()
            storeShop.loadOrder(props.order_id)

            emit('update:modelValue', false)
            showToast({
              icon: 'success',
              title: `Order completed`,
              timer: 3000,
            })
            router.push('/mall')
          }
        })
      })
      .catch((error: any) => {
        showToast({
          icon: 'error',
          title: `Place order failed`,
          timer: 3000,
        })
      })
  }
}

const setIsOpen = (value: any) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div>
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
                class="w-full md:max-w-3/5 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  <div class="flex justify-between items-center">
                    <span>Pay by Creditcard</span>
                  </div>
                </DialogTitle>
                <div
                  class="flex flex-col md:flex-row items-center justify-center p-2 border-1 rounded-md md:gap-8"
                >
                  <div class="w-[160px] flex items-center justify-center">
                    <img
                      :src="awesome?.project?.logos?.website"
                      class="w-32 h-32"
                    />
                    <button
                      class="text-black text-lg absolute top-7 right-7 modal-close"
                      @click="setIsOpen(false)"
                    >
                      <Icon name="ri:close-circle-fill" />
                    </button>
                  </div>
                  <div class="flex-1 max-w-[480px] md:flex-auto">
                    <div
                      class="flex flex-col-reverse md:flex-row items-center md:justify-between px-1"
                    >
                      <span class="dark:text-gray-700"
                        ><strong>Amount: </strong>{{ currencyJPY(Total) }}</span
                      >
                      <span class="dark:text-gray-700"
                        ><strong>Order ID: </strong>#WA{{ order_id }}</span
                      >
                    </div>
                    <div
                      class="flex flex-col items-center justify-center w-full mt-8"
                    >
                      <div v-if="showLoading">
                        <img
                          src="/images/loading.svg"
                          class="w-16 h-16"
                          alt=""
                        />
                      </div>
                      <div id="card-container" class="w-full" />

                      <div class="flex justify-end w-full">
                        <a
                          href="javascript:void(0)"
                          class="hyperlink-btn-dark"
                          @click="pay_order"
                          >Pay order</a
                        >
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

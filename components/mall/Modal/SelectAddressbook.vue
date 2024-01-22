<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useAddressbookStore } from '~/stores/addressbook'
import { randomToken } from '~~/utils/str'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const { t } = useLang()
const emit = defineEmits(['update:modelValue'])
const modelValue = useSyncProps<boolean>(props, 'modelValue', emit)
const addMode = ref(false)
const { selectedAddressbook, deleteAddressBook, setSelectedAddressBookID } =
  useAddressbookStore()

const storeAddressbook = useAddressbookStore()
const { myAddressbooks } = storeToRefs(storeAddressbook)
function setIsOpen(value: any) {
  emit('update:modelValue', value)
}

const selectedAddressBookID = ref('')
const selectOneAddress = (uid: string) => {
  setSelectedAddressBookID(uid)
  setIsOpen(false)
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
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  <div class="flex justify-between items-center">
                    <span>{{ t('apps.mall.addressbook.title') }}</span>
                    <WidgetButton
                      v-if="addMode"
                      class="capitalize"
                      size="sm"
                      type="opposite"
                      @click="addMode = !addMode"
                    >
                      <!-- <IconMdiCardAccountDetails class="inline-block mr-1" /> -->
                      <span>{{ $t('components.addressbook.title') }}</span>
                    </WidgetButton>
                    <WidgetButton
                      v-else
                      class="capitalize"
                      size="sm"
                      type="opposite"
                      @click="addMode = !addMode"
                    >
                      <!-- <IconMdiCardAccountDetails class="inline-block mr-1" /> -->
                      <span>{{ $t('components.addressbook.add_new') }}</span>
                    </WidgetButton>
                  </div>
                </DialogTitle>
                <div v-if="!addMode && myAddressbooks?.length">
                  <div class="mt-1">
                    <MallFormAddressbookGroup
                      v-model="selectedAddressBookID"
                      :items="myAddressbooks"
                    />
                  </div>

                  <div class="mt-4 flex justify-between">
                    <WidgetButton
                      class="capitalize"
                      size="sm"
                      type="danger"
                      @click="deleteAddressBook(selectedAddressBookID)"
                    >
                      <!-- <IconMdiTrashCan class="inline-block mr-1" /> -->
                      {{ $t('components.addressbook.delete') }}
                    </WidgetButton>
                    <WidgetButton
                      class="capitalize"
                      size="sm"
                      type="opposite"
                      @click="selectOneAddress(selectedAddressBookID)"
                    >
                      <!-- <IconMdiCheckDecagram
                        class="inline-block mr-1 text-green-300"
                      /> -->
                      {{ $t('components.addressbook.select') }}
                    </WidgetButton>
                  </div>
                </div>
                <div v-else>
                  <MallFormDeliveryAddress @close="setIsOpen" />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

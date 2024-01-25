<script setup lang="ts">
import { ref } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue'
import type { PropType } from 'vue'
import type { Addressbook } from '~/types/addressbook'

const props = defineProps({
  modelValue: {
    type: Object as PropType<Addressbook>,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])
const address = useSyncProps<string>(props, 'modelValue', emit)

const { myAddressbooks } = useAddressBook()
</script>

<template>
  <div class="option-group-container relative flex">
    <div class="w-full p-1 sm:p-4">
      <div class="mx-auto w-full max-w-md">
        <RadioGroup v-model="address">
          <div class="space-y-2">
            <RadioGroupOption
              v-for="item in myAddressbooks"
              :key="item.id"
              v-slot="{ active, checked }"
              as="template"
              :value="item"
            >
              <div
                :class="[
                  active
                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                    : '',
                  checked
                    ? 'bg-sky-900 bg-opacity-75 text-white '
                    : 'bg-white ',
                ]"
                class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
              >
                <div class="flex w-full items-center justify-between">
                  <div class="flex items-center">
                    <div class="text-sm">
                      <RadioGroupLabel
                        as="p"
                        :class="checked ? 'text-white' : 'text-gray-900'"
                        class="font-bold"
                      >
                        <div class="flex justify-between">
                          <span>
                            <Icon
                              name="uil:user-circle"
                              class="inline-block mr-2"
                            />{{ item.name }}
                          </span>

                          <span v-if="item.as_default">
                            <Icon
                              name="mdi:check-decagram"
                              class="inline-block mr-1 text-green-300"
                            />
                          </span>
                          <span>#{{ item.id }}</span>
                        </div>
                      </RadioGroupLabel>
                      <RadioGroupDescription
                        as="span"
                        :class="checked ? 'text-sky-100' : 'text-gray-500'"
                      >
                        <span>
                          <Icon
                            name="ion:home-sharp"
                            class="inline-block mr-1"
                          />{{ item.postcode }}</span
                        >
                        <span aria-hidden="true"> &middot; </span>
                        <span>{{ item.address_first }}</span>
                        <span aria-hidden="true"> &middot; </span>
                        <span>{{ item.address_last }}</span>
                        <p>
                          <Icon
                            name="ic:round-phone"
                            class="inline-block mr-1"
                          />{{ item.phone }}
                          <br />
                          <Icon
                            name="ic:round-email"
                            class="inline-block mr-1"
                          />{{ item.email }}
                        </p>
                      </RadioGroupDescription>
                    </div>
                  </div>
                  <div v-show="checked" class="shrink-0 text-white">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="12"
                        fill="#fff"
                        fill-opacity="0.2"
                      />
                      <path
                        d="M7 13l3 3 7-7"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>
    </div>
  </div>
</template>

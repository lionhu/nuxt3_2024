<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { AddressbookSchema, type Schema } from '~~/schemas/AddressBook'
import type { Addressbook } from '~~/types/addressbook'
import { useAddressbookStore } from '~~/stores/addressbook'
const { optAddAddressbook } = useAddressBook()
const { UserID } = useAuth()
const asDefault = ref<boolean>(true)

const state = reactive({
  name: undefined,
  address_first: 'address_first',
  address_last: 'address_last',
  postcode: 'postcode',
  phone: 'phone',
  email: 'email@em.com',
})

const emit = defineEmits(['close'])

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { name, address_first, address_last, postcode, phone, email } =
    event.data

  const _data = {
    name,
    address_first,
    address_last,
    postcode,
    phone,
    email,
    as_default: asDefault.value,
    user: UserID.value,
  }
  try {
    const response = await optAddAddressbook(_data)

    console.log('address created successfully!')
    emit('close', false)
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <!-- component -->
  <div class="flex h-full w-full bg-gray-100 rounded-lg">
    <div class="m-auto w-full">
      <div>
        <div class="bg-white rounded-lg shadow">
          <div class="flex">
            <div class="flex-1 py-5 pl-5 overflow-hidden">
              <svg
                class="inline align-text-top"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g>
                  <path
                    id="svg_1"
                    d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                    fill="none"
                    stroke="null"
                  ></path>
                  <path
                    id="svg_2"
                    d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                  ></path>
                  <circle id="svg_3" cx="7.04807" cy="6.97256" r="2.5"></circle>
                </g>
              </svg>
              <h1
                class="inline text-2xl font-semibold leading-none dark:text-gray-800"
              >
                Receiver
              </h1>
            </div>
          </div>
          <UForm
            :schema="AddressbookSchema"
            :state="state"
            class="mt-8 space-y-2 px-4"
            @submit="onSubmit"
          >
            <UFormGroup name="name">
              <UInput v-model="state.name" placeholder="name" />
            </UFormGroup>

            <UFormGroup name="postcode">
              <UInput v-model="state.postcode" placeholder="postcode" />
            </UFormGroup>

            <UFormGroup name="address_first">
              <UInput
                v-model="state.address_first"
                placeholder="t('pages.auth.password')"
              />
            </UFormGroup>

            <UFormGroup name="address_last">
              <UInput v-model="state.address_last" placeholder="address_last" />
            </UFormGroup>

            <UFormGroup name="phone">
              <UInput v-model="state.phone" placeholder="phone" />
            </UFormGroup>

            <UFormGroup name="email">
              <UInput v-model="state.email" placeholder="email" />
            </UFormGroup>
            <div class="flex items-center justify-between">
              <UCheckbox
                v-model="asDefault"
                name="as_default"
                label="As Default"
                color="green"
              />
              <!-- <UButton
                color="primary"
                variant="ghost"
                @click="onForgetPassword"
                >{{ t('pages.auth.forget_password') }}</UButton
              > -->
            </div>
            <UButton
              type="submit"
              class="relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {{ $t('buttons.submit') }}
            </UButton>
          </UForm>
        </div>
      </div>
    </div>
  </div>
</template>

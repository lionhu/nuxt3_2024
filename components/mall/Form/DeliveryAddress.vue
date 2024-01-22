<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { Addressbook } from '~~/types/addressbook'
import { randomToken } from '~/utils/str'
import { useAddressbookStore } from '~/stores/addressbook'
const { optAddAddressbook } = useAddressBook()
const { loadUserAddressbooks, setSelectedAddressBook } = useAddressbookStore()

const { handleSubmit, errors } = useForm({
  validationSchema: {
    receiver: 'required|min:2',
    email: 'required|email',
    phone: 'required|min:6',
    postcode: 'required|min:6',
    city: 'required|min:2',
    address_first: 'required|min:6',
    address_last: 'required|min:6',
  },
  initialValues: {
    receiver: '',
    email: 'email@me.com',
    phone: 'phone43522',
    postcode: '1234343',
    city: 'city',
    address_first: 'address_first',
    address_last: 'address_last',
    // as_default: false,
  },
})
const { value: receiver } = useField('receiver')
const { value: address_first } = useField('address_first')
const { value: address_last } = useField('address_last')
const { value: postcode } = useField('postcode')
const { value: phone } = useField('phone')
const { value: city } = useField('city')
const { value: email } = useField('email')
const as_default = ref<boolean>(true)

const emit = defineEmits(['close'])

const submit = handleSubmit(async () => {
  const _data = {
    seed: randomToken(),
    receiver: receiver.value,
    email: email.value,
    phone: phone.value,
    // city: city.value,
    address_first: address_first.value,
    address_last: address_last.value,
    postcode: postcode.value,
    as_default: as_default.value,
  }
  try {
    console.log('address created successfully!')
    const response = await optAddAddressbook(_data)
    if (response.createAddressbook?.id) {
      delete response.createAddressbook.__typename
      setSelectedAddressBook(response.createAddressbook)
    }
    emit('close', false)
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <!-- component -->
  <div class="flex h-full bg-gray-100 rounded-lg">
    <div class="m-auto">
      <div>
        <!-- <div class="mt-1 bg-white shadow rounded-xl">
          <div class="flex">
            <div class="flex-1 p-5 overflow-hidden">
              <ul class="text-gray-900">
                <li
                  class="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
                >
                  Receiver
                </li>
                <li>
                  {{ receiver }}
                </li>
                <li>
                  {{ address_first }}
                </li>
                <li>{{ address_last }}</li>
              </ul>
            </div>
          </div>
        </div> -->
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

          <div
            v-if="Object.keys(errors).length"
            class="flex-1 py-5 pl-5 overflow-hidden"
          >
            <ul>
              <li class="text-xs text-red-600 uppercase font-weight-800">
                Error message
              </li>
              <li
                v-for="(errorname, index) in Object.keys(errors)"
                :key="index"
              >
                <small>
                  <span class="text-red-800 dark:text-primary">{{
                    errorname
                  }}</span>
                </small>
              </li>
            </ul>
          </div>
          <form action="#">
            <div class="px-5 pb-5">
              <input
                v-model="receiver"
                placeholder="Name"
                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:(border-blueGray-500 bg-white outline-none shadow-outline ring-2) dark:(focus:bg-gray-600 focus:text-white text-gray-800) ring-offset-current ring-offset-2 ring-gray-400"
              />
              <input
                v-model="address_first"
                placeholder="Address-1"
                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:(border-blueGray-500 bg-white outline-none shadow-outline ring-2) dark:(focus:bg-gray-600 focus:text-white text-gray-800) ring-offset-current ring-offset-2 ring-gray-400"
              />
              <input
                v-model="address_last"
                placeholder="Address-2"
                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:(border-blueGray-500 bg-white outline-none shadow-outline ring-2) dark:(focus:bg-gray-600 focus:text-white text-gray-800) ring-offset-current ring-offset-2 ring-gray-400"
              />
              <div class="flex">
                <div class="flex-grow w-1/4 pr-2">
                  <input
                    v-model="postcode"
                    placeholder="Post Code"
                    class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:(border-blueGray-500 bg-white outline-none shadow-outline ring-2) dark:(focus:bg-gray-600 focus:text-white text-gray-800) ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
                <div class="flex-grow">
                  <input
                    v-model="city"
                    placeholder="City"
                    class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:(border-blueGray-500 bg-white outline-none shadow-outline ring-2) dark:(focus:bg-gray-600 focus:text-white text-gray-800) ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
              </div>
              <input
                v-model="email"
                placeholder="Email"
                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:(border-blueGray-500 bg-white outline-none shadow-outline ring-2) dark:(focus:bg-gray-600 focus:text-white text-gray-800) ring-offset-current ring-offset-2 ring-gray-400"
              />
              <input
                v-model="phone"
                placeholder="Phone"
                class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:(border-blueGray-500 bg-white outline-none shadow-outline ring-2) dark:(focus:bg-gray-600 focus:text-white text-gray-800) ring-offset-current ring-offset-2 ring-gray-400"
              />
              <div class="flex items-center pt-3">
                <input
                  v-model="as_default"
                  type="checkbox"
                  class="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
                /><label
                  for="safeAdress"
                  class="block ml-2 text-sm text-gray-900"
                  >Save as default address</label
                >
              </div>
            </div>
            <hr class="mt-4" />
            <div class="flex flex-row-reverse p-3">
              <div class="flex-initial pl-3">
                <button
                  type="button"
                  class="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-900 transition duration-300 transform active:scale-95 ease-in-out"
                  @click="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#FFFFFF"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none"></path>
                    <path
                      d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
                      opacity=".3"
                    ></path>
                    <path
                      d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"
                    ></path>
                  </svg>
                  <span class="pl-2 mx-1">Save</span>
                </button>
              </div>
              <!-- <div class="flex-initial"> -->
              <!-- <button
                type="button"
                class="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md hover:bg-red-200 hover:fill-current hover:text-red-600 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M8 9h8v10H8z" opacity=".3"></path>
                  <path
                    d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"
                  ></path>
                </svg>
                <span class="pl-2 mx-1">Delete</span>
              </button> -->
              <!-- </div> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

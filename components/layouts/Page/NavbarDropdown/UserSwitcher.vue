<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { availableLocales } from '../../../../utils/lang'

// micro compiler
const props = defineProps({
  type: {
    type: String,
    default: 'dropdown-right-top',
  },
})

const { LoggedIn } = useAuth()

const menu = {
  logout: {
    to: '/auth/logout',
    icon: 'i-material-symbols:logout',
    title: 'Logout',
  },
  settings: {
    to: '/settings',
    icon: 'i-material-symbols:settings-outline',
    title: 'Setting',
  },
}

// state
const currentStyle = toRef(props, 'type')
// const localeSetting = useState<string>('locale.setting')
const selectedMenuItem = ref('')

// watch(selectedMenuItem, (menuitem) => {
//   const { to, icon, title } = menuitem

//   console.log(menuitem.to)
//   console.log(menuitem.icon)
//   console.log(menuitem.title)
// })
</script>

<template>
  <div class="flex items-center">
    <HeadlessListbox
      v-if="currentStyle === 'dropdown-right-top'"
      v-model="selectedMenuItem"
      as="div"
      class="relative flex items-center"
    >
      <HeadlessListboxLabel class="sr-only">Theme</HeadlessListboxLabel>
      <HeadlessListboxButton
        type="button"
        title="Change Language"
        class="transition-colors duration-300"
      >
        <span v-if="LoggedIn" class="justify-center items-center flex">
          <Icon name="i-material-symbols:account-circle" class="text-primary" />
        </span>
        <ULink
          v-else
          to="/auth/login"
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <Icon name="i-material-symbols:account-circle" />
        </ULink>
      </HeadlessListboxButton>
      <HeadlessListboxOptions
        v-if="LoggedIn"
        class="p-1 absolute z-50 top-full right-0 outline-none bg-white rounded-lg ring-1 ring-gray-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-gray-700 font-semibold dark:bg-gray-800 dark:ring-0 dark:highlight-white/5 dark:text-gray-300"
      >
        <HeadlessListboxOption
          v-for="menuitem in menu"
          :key="menuitem.title"
          :value="menuitem"
          :class="{
            'py-2 px-2 flex items-center cursor-pointer': true,
            'text-sky-500 bg-gray-100 dark:bg-gray-600/30':
              selectedMenuItem === menuitem.title,
            'hover:bg-gray-50 dark:hover:bg-gray-700/30':
              selectedMenuItem !== menuitem.title,
          }"
        >
          <ULink
            :to="menuitem.to"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <div class="flex items-center">
              <span class="text-sm mr-2">
                <Icon :name="menuitem.icon" />
              </span>
              <span class="flex-1 truncate">
                {{ menuitem.title }}
              </span>
            </div>
          </ULink>
        </HeadlessListboxOption>
      </HeadlessListboxOptions>
    </HeadlessListbox>
    <select
      v-if="currentStyle === 'select-box'"
      v-model="selectedMenuItem"
      class="w-full px-2 pr-3 py-1 outline-none rounded border bg-transparent text-gray-700 dark:text-gray-300 border-gray-900/10 dark:border-gray-50/[0.2]"
    >
      <option v-for="menuitem in menu" :key="menuitem.title" :value="menuitem">
        <ULink
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <div class="flex items-center">
            <span class="text-sm mr-2">
              <Icon :name="menuitem.icon" />
            </span>
            <span class="flex-1 truncate">
              {{ menuitem.title }}
            </span>
          </div>
        </ULink>
      </option>
    </select>
  </div>
</template>

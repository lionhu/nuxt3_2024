<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { capitalize } from '~~/utils/str'
import { useShopStore } from '~~/stores/use-shop'
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

// composable
const { t } = useLang()

const storeShop = useShopStore()
const { CategoriesWithCount } = storeToRefs(storeShop)

const emit = defineEmits(['update:modelValue', 'update:isOpen'])
const isOpen = useSyncProps<boolean>(props, 'isOpen', emit)
const categoryId = useSyncProps<number>(props, 'modelValue', emit)

const loadCategoryProducts = (id: any) => {
  categoryId.value = parseInt(id)
  isOpen.value = false
}
</script>

<template>
  <client-only>
    <USlideover
      v-model="isOpen"
      :overlay="false"
      :ui="{ background: 'bg-gray-400 dark:bg-gray-700', padding: 'p-8' }"
    >
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {{ $t('pages.mall.category') }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <ul>
          <li
            v-for="(category, idx) in CategoriesWithCount"
            :key="idx"
            class="mb-5 flex justify-between items-center transition-all hover:text-orange"
          >
            <a
              href="javascript:void(0)"
              class="w-full flex items-center justify-between group"
              @click="loadCategoryProducts(category.id)"
            >
              <label
                for="checkbox-1"
                class="relative cursor-pointer text-base group-hover:(text-primary)"
                >{{ category.name }}
              </label>

              <span
                class="w-6 h-6 flex items-center cursor-pointer justify-center rounded-full bg-gray-300 text-sm group-hover:(text-white bg-orange) transition-all"
                >{{ category.count }}</span
              >
            </a>
          </li>
        </ul>
      </UCard>
    </USlideover>
  </client-only>
</template>

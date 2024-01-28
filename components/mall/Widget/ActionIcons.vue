<script setup lang="ts">
import type { Product } from '~~/types/shop'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue', 'triggerAction'])
const modelValue = useSyncProps<boolean>(props, 'modelValue', emit)

function setIsOpen(value: any) {
  emit('update:modelValue', value)
}
function TriggerAction(action: string, value: any) {
  emit('triggerAction', action, value)
}
</script>
<template>
  <div class="absolute left-1/2 top-1/3 transform -translate-x-1/2 z-1">
    <ul
      class="bg-white shadow rounded-full transition-all h-0 group-hover:h-8 group-hover:bg-primary duration-500 overflow-hidden w-fit mx-auto"
    >
      <li class="px-2 py-2">
        <a
          href="javascript:void(0)"
          class="text-primary flex items-center justify-center text-md hover:text-white"
          data-tippy-content="Quick View"
          aria-label="Quick View"
          @click="TriggerAction('show_details', true)"
        >
          <Icon name="ri:zoom-in-fill" />
        </a>
      </li>
      <!-- <li class="py-4 pl-7 md:py-5 md:pl-8">
        <a
          href="whishlist.html"
          class="text-dark flex items-center justify-center text-md hover:text-orange"
          data-tippy-content="Add to wishlist"
          aria-label="Add to wishlist"
        >
          <IconRi:heart-add-fill />
        </a>
      </li>
      <li class="py-4 pl-7 pr-7 md:py-5 md:pl-8 md:pr-8">
        <a
          href="#modal-addto-cart"
          class="text-dark flex items-center justify-center text-md hover:text-orange"
          data-tippy-content="Add to cart"
          aria-label="Add to cart"
          @click="TriggerAction('show_cart', true)"
        >
          <IconRi:shopping-bag-2-fill />
        </a>
      </li> -->
    </ul>
  </div>
</template>

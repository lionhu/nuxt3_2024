export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { checkUserOrder } = useShop()
  const order_id: number = parseInt(to.params.id as string)

  try {
    const isUserOrder = await checkUserOrder(order_id)
    if (!isUserOrder) throw new Error('not user order')
  } catch (error) {
    return navigateTo('/member/orders')
  }
})

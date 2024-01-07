<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { RegisterSchema } from '../../schemas/register'
import type { Schema } from '../../schemas/register'
definePageMeta({
  layout: 'auth',
  // middleware: ['register-enable'],
})

const { awesome } = useAppConfig()
const { showToast } = useSwal()

const { t } = useLang()
const { userRegister, findUserBySlug, checkUserEmail } = useAuth()
const config = useRuntimeConfig()
const router = useRoute()

const pid = ref(1)
const state = reactive({
  username: undefined,
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
})
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  // Do something with data
  const { username, email, password, passwordConfirm } = event.data
  try {
    const existingEmail = await checkUserEmail(email)

    if (!existingEmail) {
      userRegister(username, email, password, pid)
    } else {
      showToast({
        icon: 'error',
        title: t('pages.auth.invalid_email'),
      })
    }
  } catch (error) {
    showToast({
      icon: 'error',
      title: t('pages.auth.register_failed'),
    })
  }
}

// const _slug = router.query.slug as string
// if (_slug && _slug !== '') {
//   pid.value = await findUserBySlug(_slug)
// }

// const ringPID = computed(() => {
//   return pid.value > 1 ? 'border-t-6' : ''
// })

// const ringLogo = computed(() => {
//   return ENABLE_REGISTER.value !== null ? 'border-b-6' : ''
// })
// const redirectUrl = encodeURIComponent(
//   `${config.public.WECHAT_REDIRECT_URL}/auth/providers/wechat`,
// )

// const wx_register_url = computed(() => {
//   const wx_appid = config.public.WECHAT_APPID
//   return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx_appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=register#wechat_redirect`
// })
</script>

<template>
  <LayoutPageWrapper>
    <LayoutPageSection>
      <div
        class="flex h-screen min-h-full items-center justify-center sm:py-12 px-4 sm:px-6 lg:px-8"
      >
        <div class="w-full max-w-md space-y-8">
          <div>
            <div>
              <!-- <img
                :class="`mx-auto h-24 w-auto rounded-full border-primary ${ringLogo} ${ringPID}`"
                src="/images/wavus/logo.svg"
                alt="image"
              /> -->
              <img
                :class="`mx-auto h-24 w-auto rounded-full border-primary `"
                :src="awesome?.project?.logos?.website"
                alt="image"
              />
            </div>
            <h2
              class="mt-6 text-center text-xl font-bold tracking-tight text-primary dark:text-gray-100"
            >
              {{ t('pages.auth.create_account') }}
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              Or
              <ULink
                to="/auth/login"
                active-class="font-medium text-primary hover:text-green-500"
                inactive-class="text-green-300 dark:text-green-300 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {{ t('pages.auth.sign_in_title') }}
              </ULink>
            </p>
          </div>
          <UForm
            :schema="RegisterSchema"
            :state="state"
            class="mt-8 space-y-6"
            @submit="onSubmit"
          >
            <UFormGroup :label="t('pages.auth.username')" name="username">
              <UInput v-model="state.username" />
            </UFormGroup>

            <UFormGroup :label="t('pages.auth.email')" name="email">
              <UInput v-model="state.email" />
            </UFormGroup>
            <UFormGroup :label="t('pages.auth.password')" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>
            <UFormGroup
              :label="t('pages.auth.passwordConfirm')"
              name="passwordConfirm"
            >
              <UInput v-model="state.passwordConfirm" type="password" />
            </UFormGroup>
            <UButton
              type="submit"
              class="relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {{ $t('buttons.submit') }}
            </UButton>
          </UForm>
        </div>
      </div>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>

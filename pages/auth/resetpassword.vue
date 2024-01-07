<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { ResetPasswordSchema } from '../../schemas/ResetPassword'
import type { Schema } from '../../schemas/ResetPassword'
definePageMeta({
  layout: 'auth',
})

const { awesome } = useAppConfig()
const { t } = useLang()
const _router = useRouter()
const route = useRoute()
const { code } = route.query
const { showToast } = useSwal()

const state = reactive({
  password: undefined,
  passwordConfirm: undefined,
})

const _code = ref('')
_code.value = (code as string) || ''

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  // Do something with data
  const { password, passwordConfirm } = event.data

  if (_code.value === '') return

  try {
    const { resetPassword } = useStrapiAuth()
    await resetPassword({
      code: _code.value,
      password,
      passwordConfirmation: passwordConfirm,
    })
    showToast({
      icon: 'success',
      title: t('pages.auth.password_reseted'),
    })
    _router.push('/auth/login')
  } catch (error: any) {
    showToast({
      icon: 'error',
      title: error.error.message,
    })
  }
}
</script>

<template>
  <LayoutPageWrapper>
    <LayoutPageSection>
      <div
        class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        data-theme="cupcake"
      >
        <div class="w-full max-w-md space-y-8">
          <div>
            <img
              :class="`mx-auto h-24 w-auto rounded-full border-primary `"
              :src="awesome?.project?.logos?.website"
              alt="image"
            />
            <h2
              class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
            >
              {{ t('pages.auth.reset_password') }}
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              Or
              <nuxt-link
                to="/auth/login"
                class="font-medium text-indigo-600 hover:text-indigo-500"
                >{{ t('pages.auth.sign_in_title') }}</nuxt-link
              >
            </p>
          </div>
          <UForm
            :schema="ResetPasswordSchema"
            :state="state"
            class="mt-8 space-y-6"
            @submit="onSubmit"
          >
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

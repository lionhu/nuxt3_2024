<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { LoginSchema } from '../../schemas/login'
import type { Schema } from '../../schemas/login'
// import { useForm, useField } from 'vee-validate'
definePageMeta({
  layout: 'auth',
})

const { t } = useLang()
const { awesome } = useAppConfig()

const state = reactive({
  email: undefined,
  password: undefined,
})
const rememberMe = ref(false)
const onSubmit = (event: FormSubmitEvent<Schema>) => {
  // Do something with data
  const { email, password } = event.data
  const { signIn } = useAuth()
  signIn(email, password)
}
const onForgetPassword = () => {
  const { forgotUserPassword } = useAuth()
  forgotUserPassword()
}
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
              <img
                class="mx-auto h-24 w-auto"
                :src="awesome?.project?.logos?.website"
                alt="image"
              />
            </div>
            <h2
              class="mt-6 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-gray-400"
            >
              {{ t('pages.auth.sign_in_title') }}
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              Or
              <ULink
                to="/auth/register"
                active-class="font-medium text-primary hover:text-green-500"
                inactive-class="text-green-300 dark:text-green-300 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {{ t('pages.auth.create_account') }}
              </ULink>
            </p>
          </div>
          <UForm
            :schema="LoginSchema"
            :state="state"
            class="mt-8 space-y-6"
            @submit="onSubmit"
          >
            <UFormGroup :label="t('pages.auth.email')" name="email">
              <UInput v-model="state.email" />
            </UFormGroup>

            <UFormGroup :label="t('pages.auth.password')" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>
            <div class="flex items-center justify-between">
              <UCheckbox
                v-model="rememberMe"
                name="rememberMe"
                label="Remember me"
                color="green"
              />
              <UButton
                color="primary"
                variant="ghost"
                @click="onForgetPassword"
                >{{ t('pages.auth.forget_password') }}</UButton
              >
              <!-- <ULink
                to="/auth/forgotpassword"
                active-class="text-primary"
                inactive-class="text-sm text-green-300 dark:text-green-300 hover:text-gray-700 dark:hover:text-gray-200"
                @click="onForgetPassword"
              >
              </ULink> -->
            </div>
            <UButton
              type="submit"
              class="relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {{ $t('buttons.submit') }}
            </UButton>
            <div class="flex gap-4 items-center justify-center my-4">
              <a href="https://strapi.nichiei.services/api/connect/google">
                <Icon
                  name="logos:google-marketing-platform"
                  class="h-8 w-8 text-green-300 ring-2 ring-primary rounded-full ring-offset-1 p-1"
                ></Icon>
              </a>
            </div>
          </UForm>
        </div>
      </div>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>

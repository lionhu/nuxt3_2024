import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import { queryUserInfo, getUserByUserSlug } from '../graphql/queries/user'
import type { WavusUser } from '../types/user'

export const useAuth = () => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const { $i18n } = useNuxtApp()
  const t = $i18n.t

  const { login, logout, register, fetchUser } = useStrapiAuth()
  const { showToast } = useSwal()
  const dataLoading = useState<boolean>('dataLoading')

  const storeUser = useIdentity()

  const {
    LoggedIn,
    user,
    rolename,
    UserProfile,
    UserClient,
    UserAvatar,
    UserID,
    UserQR,
    ClientID,
  } = storeToRefs(storeUser)

  function signOut() {
    logout()

    // manually remove strapi jwt cookie
    const strapiJWT = useCookie('strapi_jwt')
    strapiJWT.value = null

    storeUser.reset()
    router.push('/')
  }

  function showResendActivationMail(_email: string) {
    Swal.fire({
      icon: 'warning',
      title: t('pages.auth.login.email_not_confirmed'),
      html: t('pages.auth.login.resend_activation_email'),
      showCancelButton: true,
      confirmButtonText: t('buttons.continue'),
      cancelButtonText: t('buttons.cancel'),
      showLoaderOnConfirm: true,
      preConfirm: async (answer: string) => {
        // auth/send-email-confirmation

        try {
          const client = useStrapiClient()
          dataLoading.value = true

          const { email, sent } = await client<any>(
            '/auth/send-email-confirmation',
            {
              method: 'POST',
              body: {
                email: _email,
              },
            },
          )
          dataLoading.value = false
          console.log('response: ', email, sent)
          if (sent) {
            showToast({
              icon: 'success',
              title: t('pages.auth.login.activation_email_sent'),
              timer: 3000,
            })
          }
        } catch (error) {
          Swal.showValidationMessage(
            t('pages.auth.login.activation_email_sent_error'),
          )
        }
      },
      backdrop: true,
      allowOutsideClick: () => !Swal.isLoading(),
    })
  }

  async function signIn(_identifier: any, _password: any) {
    dataLoading.value = true
    try {
      const { reset, setUser } = storeUser

      reset()
      const response = await login({
        identifier: _identifier,
        password: _password,
      })

      const user = await fetchUser()

      setUser(user.value as WavusUser)

      router.push('/')
    } catch (err: any) {
      dataLoading.value = false
      let message = ''
      if (err.error.message.includes('confirmed')) {
        message = t('errors.auth.email_not_confirmed')
        showResendActivationMail(_identifier)
      }
      if (err.error.message.includes('password')) {
        message = t('errors.auth.invalid_username_password')
      }
      showToast({
        icon: 'error',
        title: message,
        timer: 3000,
      })
      // alert(JSON.stringify(err))
    }
    dataLoading.value = false
  }
  async function userRegister(
    _username: any,
    _email: any,
    _password: any,
    pid: any = undefined,
  ) {
    try {
      const _data = {
        username: _username,
        email: _email,
        password: _password,
        phoneNumber: '',
        pid,
      }

      console.log('siteRegister ', _data)
      if (pid === 0) delete _data.pid
      dataLoading.value = true
      const response = await register(_data)
      dataLoading.value = false

      showToast(
        {
          icon: 'success',
          title: t('pages.auth.successfully_registered'),
        },
        true,
      )

      window.location.href = '/'
    } catch (err: any) {
      dataLoading.value = false
      showToast({
        icon: 'error',
        title: err.error.message,
      })
    }
  }

  async function checkUserEmail(email: string) {
    const _url = '/system/check_useremail'
    const client = useStrapiClient()
    const response = await client<any>(_url, {
      method: 'GET',
      query: {
        email,
      },
    })
    return response
  }
  function forgotUserPassword(): void {
    const { forgotPassword } = useStrapiAuth()
    Swal.fire({
      icon: 'warning',
      title: t('pages.auth.forget_password'),
      html: t('pages.auth.require_email'),
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: t('buttons.continue'),
      cancelButtonText: t('buttons.cancel'),
      showLoaderOnConfirm: true,
      preConfirm: async (email: string) => {
        try {
          const response = await checkUserEmail(email)
          if (response) {
            dataLoading.value = true
            await forgotPassword({ email })
            dataLoading.value = false
            showToast({
              icon: 'success',
              title: t('pages.auth.password_reset_mail_sent'),
            })
          } else {
            Swal.showValidationMessage(t('pages.auth.invalid_email'))
          }
        } catch (error) {
          Swal.showValidationMessage(t('pages.auth.invalid_email'))
        }
      },
      backdrop: true,
      allowOutsideClick: () => !Swal.isLoading(),
    })
  }

  async function findUserBySlug(slug: string): Promise<number> {
    try {
      const variables = {
        slug: {
          eq: slug,
        },
      }
      const graphql = useStrapiGraphQL()
      const { data } = await graphql<any>(getUserByUserSlug, variables)
      return data.usersPermissionsUsers.length > 0
        ? parseInt(data.usersPermissionsUsers[0].id)
        : 0
    } catch (error) {
      return 0
    }
  }

  return {
    signOut,
    signIn,
    userRegister,
    checkUserEmail,
    forgotUserPassword,
    findUserBySlug,

    // properties
    user,
    LoggedIn,
    UserID,
    UserAvatar,
    UserQR,
    ClientID,
    rolename,
    UserProfile,
    UserClient,
  }
}

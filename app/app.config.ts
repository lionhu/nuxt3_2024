import type { AppConfigInput } from 'nuxt/schema'

export default defineAppConfig({
  awesome: {
    name: 'WAVUS',
    description:
      'a starter template for Nuxt 3 with minimalist themes design, built in components, drawer & menus, and more.',
    project: {
      links: {
        github: 'https://github.com/viandwi24/nuxt3-awesome-starter',
      },
      logos: {
        website:
          'https://strapi.nichiei.services/images/logo/wavus_white_color.png',
      },
    },
    layout: {
      page: {
        navbar: {
          menus: [
            { type: 'link', title: 'Mall', to: { name: 'mall' } },
            { type: 'link', title: 'Cart', to: { name: 'mall-cart' } },
            // dynamic title
            {
              type: 'button',
              title: (nuxt: any) =>
                (nuxt._appConfig as AppConfigInput)?.awesome?.name || '',
              to: (nuxt: any) => '/test',
            },
          ],
        },
      },
      footer: {
        year: new Date().getFullYear(),
      },
      welcome: {
        title: 'Nuxt&nbsp;3 Awesome Starter',
        disableInfoReplaceIndexInWelcomePage: true,
      },
    },
    author: {
      name: 'viandwi24',
      links: {
        github: 'https://github.com/viandwi24',
        medium: 'https://viandwi24.medium.com',
        website: 'https://viandwi24.site',
      },
    },
    mall: {
      payments: {
        alipay: {
          image: '',
        },
        wechat: {
          image: '',
        },
        creditcard: {
          image: 'hello creditcard',
        },
      },
    },
  },
  ui: {
    // 这里的定义会改变tailwindcss整体的颜色，不单单是Nuxt/UI组件的。
    // 对于tailwindcss 默认配色以外自定义的配色，要现在tailwind.config.ts
    // 中先定义后再再下方替换。
    primary: 'tango',
    gray: 'slate',
    button: {
      default: {
        color: 'green',
        size: 'md',
        // variant: 'ghost',
      },
    },
  },
})

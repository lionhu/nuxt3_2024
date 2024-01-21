import type { AppConfigInput } from 'nuxt/schema'

export default defineAppConfig({
  awesome: {
    name: 'Nuxt 3 Awesome Starter',
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
            { type: 'link', title: 'Landing2', to: { name: 'landing2' } },
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
  },
  ui: {
    primary: 'orange',
    gray: 'cool',
    button: {
      default: {
        color: 'green',
        size: 'md',
        // variant: 'ghost',
      },
    },
  },
})

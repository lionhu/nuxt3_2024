import { localize, setLocale } from '@vee-validate/i18n'
import zh from '@vee-validate/i18n/dist/locale/zh_CN.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import * as AllRules from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { defineNuxtPlugin } from '#app'
export default defineNuxtPlugin((_nuxtApp) => {
  configure({
    generateMessage: localize({
      zh,
      ja,
    }),
  })
  Object.keys(AllRules).forEach((rule) => {
    // eslint-disable-next-line import/namespace
    defineRule(rule, AllRules[rule]) // 全ルールを使えるようにする
  })
  setLocale('zh')
})

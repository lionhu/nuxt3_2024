https://google-fonts.nuxtjs.org/


(1)nuxt.config.js中指定需要的font family
  googleFonts: {
    families: {
      Kosugi: true,
      'Kosugi+Maru': true,
      Varela: true,
      'Varela+Round': true,
      Inter: true
    }
  },

(2)windi.config.js中定义字体关键字
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        lionhu: ['Kosugi']
      }
    }
  }

(3)如下方法使用  （‘font-lionhu’）
  <h2 class="text-md font-normal font-lionhu text-primary block mb-4">
            MINIMAL PRODUCT
  </h2>

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

const MyTheme = {
  colors: {
    green: {
      DEFAULT: '#3BA676',
      '50': '#B4E4CF',
      '100': '#A5DFC5',
      '200': '#87D4B2',
      '300': '#69CA9E',
      '400': '#4BBF8B',
      '500': '#3BA676',
      '600': '#2C7D59',
      '700': '#1E533B',
      '800': '#0F2A1E',
      '900': '#000000',
    },
    blue: {
      DEFAULT: '#0096FF',
      '50': '#B8E2FF',
      '100': '#A3D9FF',
      '200': '#7AC8FF',
      '300': '#52B8FF',
      '400': '#29A7FF',
      '500': '#0096FF',
      '600': '#0075C7',
      '700': '#00548F',
      '800': '#003357',
      '900': '#00121F',
    },
    red: {
      DEFAULT: '#FF6464',
      '50': '#FFFFFF',
      '100': '#FFFFFF',
      '200': '#FFDEDE',
      '300': '#FFB6B6',
      '400': '#FF8D8D',
      '500': '#FF6464',
      '600': '#FF2C2C',
      '700': '#F30000',
      '800': '#BB0000',
      '900': '#830000',
    },
  },
}

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './App.{js,ts,vue}',
    './app.{js,ts,vue}',
    './Error.{js,ts,vue}',
    './error.{js,ts,vue}',
    'docs/content/**/*.md',
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem',
      },
      padding: {
        '1/2': '50%',
        full: '100%',
      },
      colors: {
        primary: MyTheme.colors.green,
        // if want to change primary color to blue
        // primary: MyTheme.colors.blue,
        green: MyTheme.colors.green,
        blue: MyTheme.colors.blue,
        red: MyTheme.colors.red,
        slate: colors.slate,
        dark: 'rgb(31 34 38)',

        NEW: MyTheme.colors.red['700'],
        RECRUITING: 'rgb(217 119 6)',
        PROCESSING: MyTheme.colors.blue['400'],
        COMPLETED: MyTheme.colors.green['400'],
        CANCELED: MyTheme.colors.blue['50'],
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        bitter: ['Bitter', 'serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        sacramento: ['Sacramento', 'sans-serif'],
        audiowide: ['Audiowide', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        grotesk_bold: ['Grotesk-Bold', 'sans-serif'],
      },
    },
  },
  shortcuts: {
    // 'hyperlink-btn-dark':
    //   'block w-full text-center leading-none uppercase text-white text-sm bg-dark px-5 py-5 transition-all hover:bg-orange font-semibold',
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}

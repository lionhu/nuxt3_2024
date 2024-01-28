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
    'suva': {
      '50': '#f6f6f7',
      '100': '#efeff0',
      '200': '#e1e1e4',
      '300': '#cfced3',
      '400': '#bcbabf',
      '500': '#a9a6ae',
      '600': '#959299',
      '700': '#858188',
      '800': '#69676c',
      '900': '#58555a',
      '950': '#333234',
    },
    'tango': {
      '50': '#fef7ee',
      '100': '#fcedd8',
      '200': '#f9d6af',
      '300': '#f4b97d',
      '400': '#ef9148',
      '500': '#eb792d',
      '600': '#dc5b1a',
      '700': '#b64418',
      '800': '#91371b',
      '900': '#752f19',
      '950': '#3f150b',
     },
     'purpleheart': {
      '50': '#fbf3ff',
      '100': '#f4e4ff',
      '200': '#ebcdff',
      '300': '#dca6ff',
      '400': '#c76dff',
      '500': '#b336ff',
      '600': '#a110ff',
      '700': '#8c01ef',
      '800': '#8208d4',
      '900': '#61089b',
      '950': '#430076',
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
      colors: {
        'tango': MyTheme.colors.tango,
         'purple-heart': MyTheme.colors.purpleheart,
         'suva-gray':MyTheme.colors.suva,
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
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9'
      }
    },
  },
  shortcuts: {
    // 'hyperlink-btn-dark':
    //   'block w-full text-center leading-none uppercase text-white text-sm bg-dark px-5 py-5 transition-all hover:bg-orange font-semibold',
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}

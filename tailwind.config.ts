import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
// import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  // 暗模式media或class
  // darkMode: 'class',
  content: [],
  theme: {
    extend: {
      // 使用參數
      // colors: {
      //   primary: defaultTheme.colors.green,
      // },
    },
  },

  // 也可以用 plugins: [require('daisyui')],
  plugins: [daisyui],
  daisyui: {
    themes: false,
    darkTheme: 'light',
    logs: false,
  },
} satisfies Config

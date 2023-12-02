import ja from './locales/ja.json'
import zhHant from './locales/zh-Hant.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh-Hant',
  fallbackLocale: 'zh-Hant',
  messages: {
    'zh-Hant': zhHant,
    ja,
  },
}))

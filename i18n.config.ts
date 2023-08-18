import ja from './locales/ja.json'
import zhHant from './locales/zh-Hant.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ja',
  fallbackLocale: 'zh-Hant',
  messages: {
    'zh-Hant': zhHant,
    ja,
  },
}))

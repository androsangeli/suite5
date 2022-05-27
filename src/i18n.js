import { createI18n } from 'vue-i18n/index'
const localPathPrefix = './locales/'

const  loadLocaleMessages = Object.fromEntries(
  Object.entries(import.meta.globEager('./locales/*.json')).map(
    ([key, value]) => {
      const json = key.endsWith('.json')
      return [key.slice(localPathPrefix.length, json ? -5 : -4), value.default]
    }
  )
)

const  languages = Object.fromEntries(
  Object.entries(loadLocaleMessages).map(
    ([key, value]) => {
      const json = key.endsWith('.json')
      return [key,value.locale]
    }
  )
)

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  globalInjection: true,
  messages: loadLocaleMessages,
  silentTranslationWarn: true,
  languages: languages,
  // something vue-i18n options here ...
})

export default i18n;
import { createI18n } from 'vue-i18n'

export const FALLBACK_LOCALE = 'en'


export const i18n = setupI18n()
type I18n = typeof i18n

export const locale = computed({
  get() {
    return i18n.global.locale.value
  },
  set(language: string) {
    setLang(language, i18n)
  },
})

function setupI18n() {
  const i18n = createI18n({
    locale: FALLBACK_LOCALE,
    legacy: false,
  })
  setLang(FALLBACK_LOCALE, i18n)
  return i18n
}

async function setLang(lang: string, i18n: I18n) {
  await loadLocaleMsg(lang, i18n)

  document.querySelector('html').setAttribute('lang', lang)
  i18n.global.locale.value = lang
}

// 加载本地语言包
async function loadLocaleMsg(locale: string, i18n: I18n) {
  console.log(locale,'locale');
  
  const messages = await import(`../locales/${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default)
}

export default i18n.global.t

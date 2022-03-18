import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Message } from '@arco-design/web-vue'

export default function useLocale() {
  const i18 = useI18n()
  const currentLocale = computed(() => i18.locale.value)
  const changeLocale = value => {
    i18.locale.value = value
    localStorage.setItem('system-locale', value)
    // Message.success(i18n.t())//国际化提示，暂未做
  }
  return {
    currentLocale,
    changeLocale
  }
}
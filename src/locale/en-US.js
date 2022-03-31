import localeGlobal from './global/en-US'
import localeLogin from '@/views/user/login/locale/en-US'
import localeLanguage from '@/components/set-language/locale/en-US'
import localeMenu from '@/components/menu/locale/en-US'
import JinEn from './jin.en';
import localePlatform from '@/backstage/PlatformManagement/locale/en-US'

export default {
  ...localeGlobal,
  ...localeLogin,
  ...localeLanguage,
  ...localeMenu,
  ...JinEn,
  ...localePlatform
}
import localeGlobal from './global/zh-CN'
import localeLogin from '@/views/user/login/locale/zh-CN'
import localeLanguage from '@/components/set-language/locale/zh-CN'
import localeMenu from '@/components/menu/locale/zh-CN'
import JinZh from './jin.zh';
import localePlatform from '@/backstage/PlatformManagement/locale/zh-CN'

export default {
  ...localeGlobal,
  ...localeLogin,
  ...localeLanguage,
  ...localeMenu,
  ...JinZh,
  ...localePlatform
}
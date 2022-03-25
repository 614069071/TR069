import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import { useAppStore } from './modules/app'
import { useRoutesStore } from './modules/routes'
import { useNavigationStore } from './modules/navigation'

const pinia = createPinia()
pinia.use(piniaPluginPersist) //数据持久化插件

export { useAppStore, useRoutesStore, useNavigationStore }

export default pinia
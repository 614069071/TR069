import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import { useAppStore } from './modules/app'
import { useRoutesStore } from './modules/routes'

const pinia = createPinia()
pinia.use(piniaPluginPersist) //数据持久化插件

export { useAppStore, useRoutesStore }
export default pinia
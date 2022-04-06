import { useNavigationStore } from "@/store";
import router from '@/router'

export const hideBreadcrumb = () => {
  const navigationStore = useNavigationStore()
  navigationStore.updateChild(null)
}

export const jumpTo = (url) => {
  router.push(url)
}
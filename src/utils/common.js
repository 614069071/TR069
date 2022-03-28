import { useNavigationStore } from "@/store";

export const hideBreadcrumb = () => {
  const navigationStore = useNavigationStore()
  navigationStore.updateChild(null)
}
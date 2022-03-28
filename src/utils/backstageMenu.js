import { getMenuApi } from "@/services/api/login"
import { useRoutesStore } from "@/store";
import BackstagePageLayout from '@/layouts/BackstagePageLayout/index.vue'

const modules = import.meta.glob('../backstage/**/**.vue')
export const formatRoutes = function (routers) {
  let fmRoutes = [];
  routers.forEach((router) => {
    let {
      menuUrl,
      menuName,
      iconCls,
      component,
      children
    } = router;
    if (children && children instanceof Array && children.length !== 0) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: `/backstage${menuUrl}`,
      name: menuName,
      iconCls: iconCls,
      children: children
    }
    if (!children.length) {
      fmRouter.component = modules[`../backstage/${component}/index.vue`]
    }
    fmRoutes.push(fmRouter);
  });
  return fmRoutes;
}

let flatData = []
const flatRoutes = (data) => {
  data.forEach(item => {
    if (item.children.length) {
      flatRoutes(item.children)
    } else {
      flatData.push(item)
    }
  })
}

export const initBackstageMenu = (router) => {
  return new Promise((resolve) => {
    const routesStore = useRoutesStore()
    let data = [
      {
        "menuNameAlias": "平台管理",
        "menuName": "home.platformManagement",
        "menuOperation": 15,
        "url": null,
        "menuUrl": "/platformManagement",
        "iconCls": null,
        "component": "PlatformManagement",
        "parentId": 42,
        "menuType": 1,
        "children": []
      }
    ]
    let fmtRoutes = formatRoutes(data)
    routesStore.updateRoutes(fmtRoutes)
    flatRoutes(fmtRoutes)
    routesStore.updateFlatRoutes(flatData)
    const layoutRoute = {
      path: '/backstage',
      name: 'BackstagePageLayout',
      component: BackstagePageLayout,
      children: flatData
    }
    router.addRoute(layoutRoute)
    resolve(true)
  })
}
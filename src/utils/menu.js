import { getMenuApi } from "@/services/api/login"
import { useRoutesStore } from "@/store";
import PageLayout from '@/layouts/PageLayout/index.vue'

const modules = import.meta.glob('../views/**/**.vue')
export const formatRoutes = function (routers, nav = []) {
  let fmRoutes = [];
  routers.forEach((router) => {
    let {
      menuUrl,
      menuName,
      iconCls,
      component,
      children
    } = router;
    let routerNav = [...nav, menuName];
    if (children && children instanceof Array && children.length !== 0) {
      children = formatRoutes(children, routerNav);
    }
    let fmRouter = {
      path: `/layout${menuUrl}`,
      name: menuName,
      iconCls: iconCls,
      children: children,
      meta: { nav: routerNav },
    }
    if (!children.length) {
      if (component === 'Home') {
        fmRouter.component = modules[`../views/home/index.vue`]
      } else {
        fmRouter.component = modules[`../views/${component}/index.vue`]
      }
    }
    fmRoutes.push(fmRouter);
  });
  return fmRoutes;
}

const pages = import.meta.globEager('../views/**/*.vue')
export const resolveComponent = (name) => {
  const importPage = pages[`../views/${name}/index.vue`]
  if (!importPage) {
    return
  }
  return importPage.default
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

export const initMenu = (router) => {
  return new Promise((resolve) => {
    const routesStore = useRoutesStore()
    // if (sessionStorage.getItem('routes')) {
    //   if (router.getRoutes().length === 6)  {
    //     // 默认路由有6条，当刷新页面时动态挂载的路由会丢失，需重新挂载
    //     const routesData = formatRoutes(JSON.parse(sessionStorage.getItem('cacheMenuData')))
    //     routesData.forEach(route => {
    //       router.addRoute('PageLayout',route)
    //     })
    //   }
    //   resolve(true)
    //   return 
    // }
    getMenuApi().then(res => {
      let data = res?.data
      let fmtRoutes = formatRoutes(data)
      routesStore.updateRoutes(fmtRoutes)
      flatRoutes(fmtRoutes)
      routesStore.updateFlatRoutes(flatData)
      const layoutRoute = {
        path: '/layout',
        name: 'PageLayout',
        component: PageLayout,
        children: flatData
      }
      router.addRoute(layoutRoute)
      resolve(true)
    })
  })
}
import { createRouter, createWebHistory } from 'vue-router'
import UserLayoutRoutes from './modules/userLayout'
import UserLayout from '@/layouts/UserLayout/index.vue'
import BackstageLayout from '@/layouts/BackstageLayout/index.vue'
import { initMenu } from '@/utils/menu.js'
import { initBackstageMenu } from '@/utils/backstageMenu.js'
import packConfig from '../../pack.config'
import { useNavigationStore } from '@/store';

let targetUsers = packConfig.targetUsers // GENERAL_USER , SUPER_ADMIN , UNLIMITED

const backgroundDefaultRoutes = [
  {
    path: '/',
    redirect: '/backstageLogin'
  },
  {
    path: '/backstageLogin',
    component: BackstageLayout,
  }
]

const userDefaultRoutes = [
  {
    path: '/',
    redirect: '/user/login'
  },
  {
    path: '/user',
    redirect: '/user/login',
    component: UserLayout,
    children: UserLayoutRoutes
  }
]

const unlimitedDefaultRoutes = [
  {
    path: '/',
    redirect: '/user/login'
  },
  {
    path: '/user',
    redirect: '/user/login',
    component: UserLayout,
    children: UserLayoutRoutes
  },
  {
    path: '/backstageLogin',
    component: BackstageLayout,
  }
]

let defaultRoutes = []
if (targetUsers === 'GENERAL_USER') {
  defaultRoutes = userDefaultRoutes
} else if (targetUsers === 'SUPER_ADMIN') {
  defaultRoutes = backgroundDefaultRoutes
} else {
  defaultRoutes = unlimitedDefaultRoutes
}

const router = createRouter({
  history: createWebHistory(),
  routes: defaultRoutes
})

// 记录路由,刷新页面时后会走这一步
let hasRoles = true
router.beforeEach((to, from, next) => {
  if (to.query.redirect) {
    hasRoles = true
  }
  if (to.path === '/' || to.path === '/user/login' || to.path === '/user/register' || to.path === '/user/find-password' || to.path === '/backstageLogin') {
    next()
  } else if (to.path === '/backstage/platformManagement') {// /layout/platformManagement
    if (window.sessionStorage.getItem("JWT_TOKEN")) {
      if (hasRoles) {
        initBackstageMenu(router).then(res => {
          if (res) {
            hasRoles = false
            next({ ...to, replace: true })
          }
        })
      } else {
        next() // 如果不传参数就会重新执行路由拦截，重新进到这里
      }
    } else {
      next('/?redirect=' + to.path)
    }
  } else {
    if (window.sessionStorage.getItem("JWT_TOKEN")) {
      // 路由添加进去了没有及时更新 需要重新进去一次拦截
      if (hasRoles) {
        initMenu(router).then(res => {
          if (res) {
            hasRoles = false
            next({ ...to, replace: true }) // 这里相当于push到一个页面 不再进入路由拦截
          }
        })
      } else {
        next() // 如果不传参数就会重新执行路由拦截，重新进到这里
      }
    } else {
      next('/?redirect=' + to.path)
    }
  }
})

let navStore = null;

router.afterEach((to, from, next) => {
  !navStore && (navStore = useNavigationStore());
  const parent = to.matched[to.matched.length - 1].meta.nav;
  navStore.updateParent(parent);
})

export default router
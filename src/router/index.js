import { createRouter, createWebHistory } from 'vue-router'
import UserLayoutRoutes from './modules/userLayout'
import UserLayout from '@/layouts/UserLayout/index.vue'
import { initMenu } from '@/utils/menu.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
})

// 记录路由,刷新页面时后会走这一步
let hasRoles = true
router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/user/login' || to.path === '/user/register' || to.path === '/user/find-password') {
    next()
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

export default router
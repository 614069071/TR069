const UserLayoutRoutes = [
  {
    path: 'login',
    name: 'login',
    component: () => import('@/views/user/login/index.vue'),
    meta: {
      title: '',
      requiresAuth: false
    }
  },
  {
    path: 'register',
    name: 'register',
    component: () => import('@/views/user/register/index.vue'),
    meta: {
      title: '',
      requiresAuth: false
    }
  },
  {
    path: 'find-password',
    name: 'findPassword',
    component: () => import('@/views/user/findPassword/index.vue'),
    meta: {
      title: '',
      requiresAuth: false
    }
  }
]

export default UserLayoutRoutes
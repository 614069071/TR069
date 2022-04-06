export default [
  {
    path: "/backstage/platformManagement",
    name: "home.platformManagement",
    iconCls: null,
    children: [],
    component: () => import("@/backstage/PlatformManagement/index.vue"),
    meta: {
      nav: [
        "home.platformManagement"
      ],
      breadList: []
    }
  },
  {
    path: "/backstage/platformManagement/add",
    name: "home.platformManagementAdd",
    iconCls: null,
    children: [],
    component: () => import("@/backstage/PlatformManagement/components/add-perssions/index.vue"),
    meta: {
      nav: [
        "home.platformManagement"
      ],
      breadList: [
        {
          name: 'home.platformManagement',
          path: '/backstage/platformManagement'
        },
        {
          name: '新增',
          path: ''
        },
      ]
    }
  },
  {
    path: "/backstage/platformManagement/modify",
    name: "home.platformManagementModify",
    iconCls: null,
    children: [],
    component: () => import("@/backstage/PlatformManagement/components/add-perssions/index.vue"),
    meta: {
      nav: [
        "home.platformManagement"
      ],
      breadList: [
        {
          name: 'home.platformManagement',
          path: '/backstage/platformManagement'
        },
        {
          name: '修改',
          path: ''
        },
      ]
    }
  },
  {
    path: "/backstage/platformManagement/detail",
    name: "home.platformManagementDetail",
    iconCls: null,
    children: [],
    component: () => import("@/backstage/PlatformManagement/components/add-perssions/index.vue"),
    meta: {
      nav: [
        "home.platformManagement"
      ],
      breadList: [
        {
          name: 'home.platformManagement',
          path: '/backstage/platformManagement'
        },
        {
          name: '详情',
          path: ''
        },
      ]
    }
  },
]
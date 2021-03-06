export default [
  {
    path: "/layout/home",
    name: "home.home",
    iconCls: "icon-a-icon-home2beifen3",
    children: [],
    component: () => import("@/views/home/index.vue"),
    meta: {
      nav: [
        "home.home"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/deviceManagement/modelList",
    name: "home.modelList",
    iconCls: null,
    children: [],
    component: () => import("@/views/ModelList/index.vue"),
    meta: {
      nav: [
        "home.terminalManagenent",
        "home.deviceManagement",
        "home.modelList"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/deviceManagement/deviceList",
    name: "home.deviceList",
    iconCls: null,
    children: [],
    meta: {
      nav: [
        "home.terminalManagenent",
        "home.deviceManagement",
        "home.deviceList"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/deviceManagement/beforeConfig",
    name: "home.beforeConfig",
    iconCls: null,
    component: () => import("@/views/BeforeConfig/index.vue"),
    children: [
      {
        path: "/layout/deviceManagement/beforeConfig",
        component: () => import("@/views/BeforeConfig/components/list.vue"),
        meta: {
          nav: [
            "home.terminalManagenent",
            "home.deviceManagement",
            "home.deviceList"
          ],
          breadList: []
        }
      },
      {
        path: "/layout/deviceManagement/beforeConfig/add",
        component: () => import("@/views/BeforeConfig/components/add.vue"),
        meta: {
          nav: [
            "home.terminalManagenent",
            "home.deviceManagement",
            "home.beforeConfig",
            "home.beforeConfigAdd",
          ],
          breadList: []
        }
      },
      {
        path: "/layout/deviceManagement/beforeConfig/detail",
        component: () => import("@/views/BeforeConfig/components/detail.vue"),
        meta: {
          nav: [
            "home.terminalManagenent",
            "home.deviceManagement",
            "home.deviceList",
            "home.beforeConfigDetail",
          ],
          breadList: []
        }
      }
    ]
  },
  {
    path: "/layout/templateManagenent/actionPool",
    name: "home.actionPool",
    iconCls: null,
    children: [],
    meta: {
      nav: [
        "home.terminalManagenent",
        "home.templateManagenent",
        "home.actionPool"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/templateManagenent/serviceTemplate",
    name: "home.serviceTemplate",
    iconCls: null,
    children: [],
    component: () => import("@/views/ServiceTemplate/index.vue"),
    meta: {
      nav: [
        "home.terminalManagenent",
        "home.templateManagenent",
        "home.serviceTemplate"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/upgradeManagement",
    name: "home.upgradeFile",
    component: () => import("@/views/upgrade/index.vue"),
    iconCls: null,
    children: [
      {
        path: "/layout/upgradeManagement/upgradeFile",
        name: "home.upgradeFile",
        iconCls: null,
        component: () => import("@/views/upgrade/upgradeFile/index.vue"),
        children: [
          {
            path: "/layout/upgradeManagement/upgradeFile",
            component: () => import("@/views/upgrade/upgradeFile/component/list.vue"),
            meta: {
              nav: [
                "home.terminalManagenent",
                "home.upgradeManagement",
                "home.upgradeFile"
              ],
              breadList: []
            },
          },
          {
            path: "/layout/upgradeManagement/upgradeFile/add",
            component: () => import("@/views/upgrade/upgradeFile/component/add.vue"),
            meta: {
              nav: [
                "home.terminalManagenent",
                "home.upgradeManagement",
                "home.upgradeFile",
                "home.upgradeFileAdd"
              ],
              breadList: [

              ]
            },
          },
          {
            path: "/layout/upgradeManagement/upgradeFile/modify",
            component: () => import("@/views/upgrade/upgradeFile/component/modify.vue"),
            meta: {
              nav: [
                "home.terminalManagenent",
                "home.upgradeManagement",
                "home.upgradeFile",
                "home.upgradeFileModify"
              ],
              breadList: []
            },
          },
        ]
      },
      {
        path: "/layout/upgradeManagement/upgradeTask",
        name: "home.upgradeTask",
        iconCls: null,
        component: () => import("@/views/upgrade/upgradeTask/index.vue"),
        children: [
          {
            path: "/layout/upgradeManagement/upgradeTask",
            component: () => import("@/views/upgrade/upgradeTask/component/list.vue"),
            meta: {
              nav: [
                "home.terminalManagenent",
                "home.upgradeManagement",
                "home.upgradeTask",
              ],
              breadList: []
            },
          },
          {
            path: "/layout/upgradeManagement/upgradeTask/add",
            component: () => import("@/views/upgrade/upgradeTask/component/add.vue"),
            meta: {
              nav: [
                "home.terminalManagenent",
                "home.upgradeManagement",
                "home.upgradeTask",
                "home.upgradeTaskAdd",
              ],
              breadList: []
            },
          },
          {
            path: "/layout/upgradeManagement/upgradeTask/modify",
            component: () => import("@/views/upgrade/upgradeTask/component/modify.vue"),
            meta: {
              nav: [
                "home.terminalManagenent",
                "home.upgradeManagement",
                "home.upgradeTask",
                "home.upgradeTaskModify",
              ],
              breadList: []
            },
          },
          {
            path: "/layout/upgradeManagement/upgradeTask/rule",
            component: () => import("@/views/upgrade/upgradeTask/component/rule.vue"),
            meta: {
              nav: [
                "home.terminalManagenent",
                "home.upgradeManagement",
                "home.upgradeTask",
                "home.upgradeTaskRule",
              ],
              breadList: []
            },
          },
        ],

      },
      // {
      //   path: "/layout/upgradeManagement/upgradeRule",
      //   name: "home.upgradeRule",
      //   iconCls: null,
      //   children: [],
      //   meta: {
      //     nav: [
      //       "home.terminalManagenent",
      //       "home.upgradeManagement",
      //       "home.upgradeRule"
      //     ],
      //     breadList: []
      //   },
      //   children: [],
      // },
      // {
      //   path: "/layout/upgradeManagement/upgradeRecord",
      //   name: "home.upgradeRecord",
      //   iconCls: null,
      //   meta: {
      //     nav: [
      //       "home.terminalManagenent",
      //       "home.upgradeManagement",
      //       "home.upgradeRecord"
      //     ],
      //     breadList: []
      //   },
      //   children: [],
      // },
    ],
  },
  {
    path: "/layout/tr069Management/configManagement",
    name: "home.configManagement",
    iconCls: null,
    children: [],
    component: () => import("@/views/ConfigManagement/index.vue"),
    meta: {
      nav: [
        "home.terminalManagenent",
        "home.tr069Management",
        "home.configManagement"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/operationLog/operationIncident",
    name: "home.operationIncident",
    iconCls: null,
    children: [],
    meta: {
      nav: [
        "home.terminalManagenent",
        "home.operationLog",
        "home.operationIncident"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/operationLog/templateLog",
    name: "home.templateLog",
    iconCls: null,
    children: [],
    meta: {
      nav: [
        "home.terminalManagenent",
        "home.operationLog",
        "home.templateLog"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/operationLog/alarm",
    name: "home.alarm",
    iconCls: null,
    children: [],
    meta: {
      nav: [
        "home.terminalManagenent",
        "home.operationLog",
        "home.alarm"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/systemManagement",
    name: "home.systemManagement",
    iconCls: null,
    children: [],
    component: () => import("@/views/SystemManagement/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.systemManagement",
        "home.systemManagement"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/setting/user",
    name: "home.settingUser",
    iconCls: null,
    children: [],
    component: () => import("@/views/SettingUser/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingUser"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/setting/role",
    name: "home.settingRole",
    iconCls: null,
    children: [],
    component: () => import("@/views/settingRole/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingRole"
      ],
      breadList: []
    }
  },
  {
    path: "/layout/setting/permission",
    name: "home.settingPermission",
    iconCls: null,
    children: [],
    component: () => import("@/views/settingPermission/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingPermission"
      ],
      breadList: []
    }
  },
  {
    // ???????????????
    path: "/layout/setting/permission/add",
    name: "home.settingPermissionAdd",
    iconCls: null,
    children: [],
    component: () => import("@/views/settingPermission/components/add-perssions/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingPermission"
      ],
      breadList: [
        {
          name: 'home.settingSystem',
          path: ''
        },
        {
          name: 'home.setting',
          path: ''
        },
        {
          name: 'home.settingPermission',
          path: '/layout/setting/permission'
        },
        {
          name: '???????????????',
          path: ''
        },
      ]
    }
  },
  {
    // ???????????????
    path: "/layout/setting/permission/modify",
    name: "home.settingPermissionModify",
    iconCls: null,
    children: [],
    component: () => import("@/views/settingPermission/components/revise/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingPermission"
      ],
      breadList: [
        {
          name: 'home.settingSystem',
          path: ''
        },
        {
          name: 'home.setting',
          path: ''
        },
        {
          name: 'home.settingPermission',
          path: '/layout/setting/permission'
        },
        {
          name: '??????',
          path: ''
        },
      ]
    }
  },
  {
    path: "/layout/setting/invitation",
    name: "home.settingInvitation",
    iconCls: null,
    children: [],
    component: () => import("@/views/settingInvitation/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingInvitation"
      ],
      breadList: []
    }
  },
  {
    // ???????????????
    path: "/layout/setting/invitation/add",
    name: "home.settingInvitationAdd",
    iconCls: null,
    children: [],
    component: () => import("@/views/settingInvitation/components/add-perssions/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingInvitation"
      ],
      breadList: [
        {
          name: 'home.settingSystem',
          path: ''
        },
        {
          name: 'home.setting',
          path: ''
        },
        {
          name: 'home.settingInvitation',
          path: '/layout/setting/invitation'
        },
        {
          name: '???????????????',
          path: ''
        },
      ]
    }
  },
  {
    // ???????????????
    path: "/layout/setting/invitation/Detail",
    name: "home.settingInvitationDetail",
    iconCls: null,
    children: [],
    component: () => import("@/views/settingInvitation/components/add-perssions/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingInvitation"
      ],
      breadList: [
        {
          name: 'home.settingSystem',
          path: ''
        },
        {
          name: 'home.setting',
          path: ''
        },
        {
          name: 'home.settingInvitation',
          path: '/layout/setting/invitation'
        },
        {
          name: '??????',
          path: ''
        },
      ]
    }
  },

  //??????????????????
  {
    path: "/layout/setting/user/add",
    name: "home.SettingUserAdd",
    iconCls: null,
    children: [],
    component: () => import("@/views/SettingUser/components/add-perssions/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingUser"
      ],
      breadList: [
        {
          name: 'home.settingSystem',
          path: ''
        },
        {
          name: 'home.setting',
          path: ''
        },
        {
          name: 'home.settingUser',
          path: '/layout/setting/user'
        },
        {
          name: '????????????',
          path: ''
        },
      ]
    }
  },
  //??????????????????
  {
    path: "/layout/setting/user/revise",
    name: "home.SettingUserRevise",
    iconCls: null,
    children: [],
    component: () => import("@/views/SettingUser/components/add-perssions/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingUser"
      ],
      breadList: [
        {
          name: 'home.settingSystem',
          path: ''
        },
        {
          name: 'home.setting',
          path: ''
        },
        {
          name: 'home.settingUser',
          path: '/layout/setting/user'
        },
        {
          name: '??????',
          path: ''
        },
      ]
    }
  },
  //??????????????????
  {
    path: "/layout/setting/user/detail",
    name: "home.SettingUserDetail",
    iconCls: null,
    children: [],
    component: () => import("@/views/SettingUser/components/add-perssions/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingUser"
      ],
      breadList: [
        {
          name: 'home.settingSystem',
          path: ''
        },
        {
          name: 'home.setting',
          path: ''
        },
        {
          name: 'home.settingUser',
          path: '/layout/setting/user'
        },
        {
          name: '??????',
          path: ''
        },
      ]
    }
  },
  //??????????????????
  {
    path: "/layout/setting/role/add",
    name: "home.settingRoleAdd",
    iconCls: null,
    children: [],
    component: () => import("@/views/SettingRole/components/add-perssions/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingRole"
      ],
      breadList: [
        {
          name: 'home.settingSystem',
          path: ''
        },
        {
          name: 'home.setting',
          path: ''
        },
        {
          name: 'home.settingRole',
          path: '/layout/setting/role'
        },
        {
          name: '????????????',
          path: ''
        },
      ]
    }
  },
  //??????????????????
  {
    path: "/layout/setting/role/revise",
    name: "home.settingRoleRevise",
    iconCls: null,
    children: [],
    component: () => import("@/views/SettingRole/components/add-perssions/index.vue"),
    meta: {
      nav: [
        "home.settingSystem",
        "home.setting",
        "home.settingRole"
      ],
      breadList: [
        {
          name: 'home.settingSystem',
          path: ''
        },
        {
          name: 'home.setting',
          path: ''
        },
        {
          name: 'home.settingRole',
          path: '/layout/setting/role'
        },
        {
          name: '??????',
          path: ''
        },
      ]
    }
  },
]
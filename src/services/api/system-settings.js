import httpRequest from "../index";

//平台管理页面接口
class PlatformManagement {
  service
  constructor(service) {
    this.service = service
  }
  async getPlatform(params) {
    const { data } = await this.service({
      url: '/platform',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    return data
  }
  async getPlatformMenuType(params) {
    const { data } = await this.service({
      url: '/platform/menuType',
      method: 'get',
    })
    return data
  }
  async getSystemSettings(params) {
    const { data } = await this.service({
      url: '/platform/platformId',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    return data
  }
  async putPlatform(params) {
    const { data } = await this.service({
      url: '/platform',
      method: 'put',
      data: params,
    })
    return data
  }
  async newPlatform(params) {
    const { data } = await this.service({
      url: '/platform',
      method: 'post',
      data: params,
    })
    return data
  }
  async deletePlatform(params) {
    const { data } = await this.service({
      url: `/platform/${params}`,
      method: 'delete'
    })
    return data
  }
}

//用户管理页面接口
class SetUser {
  service
  constructor(service) {
    this.service = service
  }
  async getUser(params) {
    const { data } = await this.service({
      url: '/user',
      method: 'get',
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    return data
  }
  async getRoleList() {
    const { data } = await this.service({
      url: '/role/roleList',
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    return data
  }
  async putUser(params) {
    const { data } = await this.service({
      url: '/user/password',
      method: 'put',
      data: params,
    })
    return data
  }
  async postUser(params) {
    const { data } = await this.service({
      url: '/user',
      method: 'post',
      data: params,
    })
    return data
  }
  async putUserStatus(params) {
    const { data } = await this.service({
      url: '/user/status',
      method: 'put',
      data: params,
    })
    return data
  }
  async deleteUser(params) {
    const { data } = await this.service({
      url: '/user',
      method: 'delete',
      data: params,
    })
    return data
  }
}
//角色管理页面接口
class RoleManagement {
  service
  constructor(service) {
    this.service = service
  }
  async getRole(params) {
    const { data } = await this.service({
      url: 'role',
      method: 'get',
      data: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
    return data
  }
  async getPermissionList() {
    const { data } = await this.service({
      url: '/permission/permissionList',
      method: 'get',
    })
    return data
  }
  async deleteRole(params) {
    const { data } = await this.service({
      url: `role/${params}`,
      method: 'delete',
    })
    return data
  }
  async newRole(params) {
    const { data } = await this.service({
      url: 'role/',
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  }
  async putRole(params) {
    const { data } = await this.service({
      url: '/role',
      method: 'put',
      data: params,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  }
}
//邀请码管理页面接口
class InvitationCodeManagement {
  service
  constructor(service) {
    this.service = service
  }
  async getInvitation(params) {
    const { data } = await this.service({
      url: '/invitation',
      method: 'get',
      data: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    return data
  }
  async newInvitation(params) {
    const { data } = await this.service({
      url: '/invitation',
      method: 'post',
      data: params,
    })
    return data
  }
  async deleteInvitation(params) {
    const { data } = await this.service({
      url: `/invitation/${params}`,
      method: 'delete'
    })
    return data
  }
}
//权限集管理
const getPermissionListApi = (page, size) => {
  return httpRequest({
    url: `/permission?page=${page}&size=${size}`,
    method: 'get'
  })
}

const initAllMenu = () => {
  return httpRequest({
    url: '/menu/allMenusWithChildren',
    method: 'get'
  })
}

const getSelectPerssions = (pid) => {
  return httpRequest({
    url: `/menu/mids/${pid}`,
    method: 'get'
  })
}

const resetPermissions = (urlParams) => {
  return httpRequest({
    url: `/permission?${urlParams}`,
    method: 'put'
  })
}

const addPermission = (name) => {
  return httpRequest({
    url: `permission?permissionName=${name}`,
    method: 'post'
  })
}

const revisePermission = (pid, name) => {
  return httpRequest({
    url: `/permission?pid=${pid}&permissionName=${name}`,
    method: 'put'
  })
}

const deletePermission = (pid) => {
  return httpRequest({
    url: `/permission/${pid}`,
    method: 'delete'
  })
}

const setUser = new SetUser(httpRequest)
const roleManagement = new RoleManagement(httpRequest)
const platformManagement = new PlatformManagement(httpRequest)
const invitationCodeManagement = new InvitationCodeManagement(httpRequest)



export { setUser, roleManagement, platformManagement, invitationCodeManagement, getPermissionListApi, initAllMenu, getSelectPerssions, resetPermissions, addPermission, revisePermission, deletePermission }
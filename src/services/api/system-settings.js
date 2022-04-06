import { httpRequest } from "../index";

//平台管理页面接口
class PlatformManagement {
  service
  constructor(service) {
    this.service = service
  }
  async getPlatform(params) {
    const { data } = await this.service({
      url: '/platform/getPlatformPage',
      method: 'get',
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }, 'platform')
    return data
  }
  async getPlatformMenuType() {
    const { data } = await this.service({
      url: '/platform/menuType',
      method: 'get',
    }, 'platform')
    return data
  }
  async getSystemSettings() {
    const { data } = await this.service({
      url: '/platform/platformId',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }, 'platform')
    return data
  }
  async putPlatform(params) {
    const { data } = await this.service({
      url: '/platform',
      method: 'put',
      data: params,
    }, 'platform')
    return data
  }
  async newPlatform(params) {
    const { data } = await this.service({
      url: '/platform',
      method: 'post',
      data: params,
    }, 'platform')
    return data
  }
  async deletePlatform(params) {
    const { data } = await this.service({
      url: `/platform/${params}`,
      method: 'delete'
    }, 'platform')
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
      url: '/user/getUserPage',
      method: 'get',
      params: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }, 'platform')
    return data
  }
  async getRoleList() {
    const { data } = await this.service({
      url: '/role/roleList',
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }, 'platform')
    return data
  }
  async putUser(params) {
    const { data } = await this.service({
      url: '/user',
      method: 'put',
      data: params,
    }, 'platform')
    return data
  }
  async postUser(params) {
    const { data } = await this.service({
      url: '/user/addUser',
      method: 'post',
      data: params,
    }, 'platform')
    return data
  }
  async putUserStatus(params) {
    const { data } = await this.service({
      url: '/user/status',
      method: 'put',
      data: params,
    }, 'platform')
    return data
  }
  async putchangePassword(params) {
    const { data } = await this.service({
      url: '/user/password',
      method: 'put',
      data: params,
    }, 'platform')
    return data
  }
  async deleteUser(params) {
    const { data } = await this.service({
      url: `/user/${params}`,
      method: 'delete',
      data: params,
    }, 'platform')
    return data
  }
  async judgmentUserName(params) {
    const { data } = await this.service({
      url: `/user/duplicateChecking?username=${params}`,
      method: 'get'
    }, 'platform')
    return data
  }
  // async judgmentEmail(params) {
  //   const { data } = await this.service({
  //     url: `/user/duplicateChecking?username=${params}`,
  //     method: 'get'
  //   }, 'platform')
  //   return data
  // }
}
//角色管理页面接口
class RoleManagement {
  service
  constructor(service) {
    this.service = service
  }
  async getRole(params) {
    const { data } = await this.service({
      url: '/role/getRolePage',
      method: 'get',
      params: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    }, 'platform')
    return data
  }
  async getPermissionList() {
    const { data } = await this.service({
      url: '/permission/permissionList',
      method: 'get',
    }, 'platform')
    return data
  }
  async deleteRole(params) {
    const { data } = await this.service({
      url: `role/${params}`,
      method: 'delete',
    }, 'platform')
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
    }, 'platform')
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
    }, 'platform')
    return data
  }
  async judgmentRoleName(params) {
    const { data } = await this.service({
      url: `/role/duplicateChecking?roleNameZh=${params}`,
      method: 'get'
    }, 'platform')
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
      url: '/invitation/getInvitationPage',
      method: 'get',
      params: params
    }, 'platform')
    return data
  }
  async newInvitation(params) {
    const { data } = await this.service({
      url: '/invitation',
      method: 'post',
      data: params,
    }, 'platform')
    return data
  }
  async deleteInvitation(params) {
    const { data } = await this.service({
      url: `/invitation/${params}`,
      method: 'delete'
    }, 'platform')
    return data
  }
}
//权限集管理
const getPermissionListApi = (page, size) => {
  return httpRequest({
    url: `/permission?page=${page}&size=${size}`,
    method: 'get'
  }, 'platform')
}

const initAllMenu = () => {
  return httpRequest({
    url: '/menu/allMenusWithChildren',
    method: 'get'
  }, 'platform')
}

const getSelectPerssions = (pid) => {
  return httpRequest({
    url: `/menu/mids/${pid}`,
    method: 'get'
  }, 'platform')
}

const resetPermissions = (urlParams) => {
  return httpRequest({
    url: `/permission?${urlParams}`,
    method: 'put'
  }, 'platform')
}

const addPermission = (name) => {
  return httpRequest({
    url: `/permission?permissionName=${name}`,
    method: 'post'
  }, 'platform')
}

const revisePermission = (pid, name) => {
  return httpRequest({
    url: `/permission?pid=${pid}&permissionName=${name}`,
    method: 'put'
  }, 'platform')
}

const deletePermission = (pid) => {
  return httpRequest({
    url: `/permission/${pid}`,
    method: 'delete'
  }, 'platform')
}

const setUser = new SetUser(httpRequest)
const roleManagement = new RoleManagement(httpRequest)
const platformManagement = new PlatformManagement(httpRequest)
const invitationCodeManagement = new InvitationCodeManagement(httpRequest)



export { setUser, roleManagement, platformManagement, invitationCodeManagement, getPermissionListApi, initAllMenu, getSelectPerssions, resetPermissions, addPermission, revisePermission, deletePermission }
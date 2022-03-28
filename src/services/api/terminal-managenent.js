import { httpRequest } from "../index";

//业务模板页面接口
class ServiceTemplate {
  service
  constructor(service) {
    this.service = service
  }
  async getProfile(params) {
    const { data } = await this.service({
      url: '/profile/pageProfile',
      method: 'get',
      params: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    return data
  }
  async postProfile(params) {
    const { data } = await this.service({
      url: '/profile',
      method: 'post',
      params: params
    })
    return data
  }
  async putProfile(params) {
    const { data } = await this.service({
      url: '/profile',
      method: 'put',
      params: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    return data
  }
  async delProfile(params) {
    const { data } = await this.service({
      url: '/profile',
      method: 'delete',
      params: {profileId:params},
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    return data
  }
}
//动作池页面接口
class ActionPool {
  service
  constructor(service) {
    this.service = service
  }
  async actionList() {
    const { data } = await this.service({
      url: '/profile/enableActions',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    return data
  }
}

const serviceTemplate = new ServiceTemplate(httpRequest)
const actionPool = new ActionPool(httpRequest)




export { serviceTemplate, actionPool }
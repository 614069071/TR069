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
}



const serviceTemplate = new ServiceTemplate(httpRequest)



export { serviceTemplate }
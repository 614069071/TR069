import { httpRequest } from "../index";

/**
 * @description 获取验证码图片
 * @returns
 */
export const getVerifyCodeApi = () => {
  return httpRequest({
    url: '/auth/code',
    method: 'get'
  }, 'platform')
}

/**
 * @description 登录接口
 * @param {*} params 用户信息
 * @returns 
 */
export const loginApi = (params) => {
  return httpRequest({
    url: '/doLogin',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      (data) => {
        let result = ''
        for (let key in data) {
          result += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
        return result.slice(0, result.length - 1)
      }
    ]
  }, 'platform')
}

/**
 * @description 获取用户菜单路由
 * @returns 
 */
export const getMenuApi = () => {
  return httpRequest({
    url: '/menu/menuList',
    method: 'get'
  }, 'platform')
}

/**
 * 
 * @param {*} params 用户名
 * @description 验证用户名是否重复 
 * @returns 
 */
export const validateNameApi = (params) => {
  return httpRequest({
    url: `/user/duplicateChecking?username=${params}`,
    method: 'get'
  }, 'platform')
}

/**
 * 
 * @param {*} params 
 * @description 验证注册邀请码是否存在
 * @returns 
 */
export const invitationExistApi = (params) => {
  return httpRequest({
    url: '/user/invitation',
    method: 'post',
    data: params,
    transformRequest: [
      (data) => {
        let result = ''
        for (let key in data) {
          result += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
        return result.slice(0, result.length - 1)
      }
    ]
  }, 'platform')
}

/**
 * @description 获取邮箱验证码
 * @returns
 */
export const getEmailCodeApi = (username, email) => {
  return httpRequest({
    url: `/user/email?username=${username}&email=${email}`,
    method: 'post'
  }, 'platform')
}

/**
 * @description 注册
 * @returns 
 */
export const registApi = (username, code, email) => {
  return httpRequest({
    url: `/user/verifyCode?username=${username}&verifyCode=${code}&email=${email}`,
    method: 'post'
  }, 'platform')
}

export const logout = () => {
  return httpRequest({
    url: '/logout',
    method: 'get'
  }, 'platform')
}

export const checkCode = (uuid, code) => {
  return httpRequest({
    url: `/user/checkCode?uuid=${uuid}&code=${code}`,
    method: 'get'
  }, 'platform')
}

export const checkEmailApi = (name, email) => {
  return httpRequest({
    url: `/user/checkEmail?username=${name}&email=${email}`,
    method: 'post'
  }, 'platform')
}

export const checkEmailCodeApi = (name, code) => {
  return httpRequest({
    url: `/user/checkVerifyCode?username=${name}&verifyCode=${code}`,
    method: 'post'
  }, 'platform')
}

export const changePasswordApi = (password) => {
  return httpRequest({
    url: `/user/changePassword?password=${password}`,
    method: 'post'
  }, 'platform')
}
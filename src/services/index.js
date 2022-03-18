import axios from 'axios'
import { h } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconFaceFrownFill } from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/es/message/style/css.js'
import { getToken, setToken, clearToken } from '@/utils/auth'
import router from '@/router'

const pendingMap = new Map()

const getPendingKey = (config) => {
  let { url, method, params, data } = config
  if (typeof data === 'string' && data.indexOf('{') !== -1) {
    data = JSON.parse(data)
  }
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

const addPending = (config) => {
  const pendingKey = getPendingKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingMap.has(pendingKey)) {
      pendingMap.set(pendingKey, cancel)
    }
  })
}

const removePending = (config) => {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

let httpErrorStatusHandle = (error) => {
  const serverCodeMessage = {
    200: '服务器成功返回请求的数据',
    400: '参数不正确！',
    401: '未登录，请先登录！',
    403: '您没有权限操作！',
    404: '请求地址出错',
    408: '请求超时！',
    500: '服务器发生错误，请检查服务器',
    501: '服务未实现！',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时'
  }
  if (error && error.response) {
    let message = serverCodeMessage[error.response.status]
    if (error.message.includes('timeout')) {
      message = '网络请求超时'
    }
    if (error.message.includes('Network')) {
      message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
    }
    if (error.response.status == 401) {
      console.log(error.response)
      message = error.response.data.msg
      clearToken()
      router.push(`/user/login?redirect=${location.pathname}`)
    }
    Message.error({
      id: 'httpInfo',
      content: message,
      duration: 2000,
      position: 'top',
      icon: () => h(IconFaceFrownFill)
    })
  }
}

// let baseUrl = '/nms-platform-management-biz' //连接明恺本地服务，端口为9000时候需加上这段，具体上线时需重新配置
let baseUrl = ''

function httpRequest(axiosConfig, customOptions) {
  const service = axios.create({
    baseURL: `${import.meta.env.VITE_APP_APIHOST}${baseUrl}`,
    timeout: 10000
  })

  const CUSTOM_OPTIONS = Object.assign({
    // TODO: 取消重复请求还有点问题，会报错
    cancel_repeat_request: false,
  }, customOptions)

  service.interceptors.request.use(
    config => {
      removePending(config)
      CUSTOM_OPTIONS.cancel_repeat_request && addPending(config)

      // 自动携带token TODO:暂未调登录接口，后续再测
      if (getToken() && typeof window !== 'undefined') {
        config.headers.Authorization = `${getToken()}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    response => {
      removePending(response.config)
      if (response.status && response.status === 200 && response.data.status === 500) {
        Message.error({
          id: 'httpInfo',
          content: response.data.msg,
          duration: 2000,
          position: 'top',
          icon: () => h(IconFaceFrownFill)
        })
        return
      }
      if (response.data.msg) {
        if (response.data.msg == "找回密码成功!") { // 找回密码成功时不在浏览器顶端显示提示
          clearToken()
          return response; // 实际返回给前端调用处的值
        }
        Message.success({
          id: 'httpInfo',
          content: response.data.msg,
          duration: 2000,
          position: 'top',
          icon: () => h(IconFaceFrownFill)
        })
        if (response.data.msg == "注销成功!") {
          clearToken()
        }
      }
      if (response.headers.permissions) {
        sessionStorage.setItem('permissions', response.headers.permissions);
      }
      if (response.headers.token) {
        setToken(response.headers.token)
      }
      return response
    },
    error => {
      error.config && removePending(error.config)
      httpErrorStatusHandle(error)
      return Promise.reject(error)
    }
  )

  return service(axiosConfig)
}

export default httpRequest
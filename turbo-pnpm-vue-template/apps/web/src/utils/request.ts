import axios from 'axios'
import $t from '@/utils/i18n'

const ERROR_CODE = {
  3003: $t('tooManyReuests'),
  3100: $t('preRegistrationFirst'),
  3102: $t('taskAlreadyCompleted'),
  3105: $t('preRegistrationNotStarted'),
  3106: $t('preRegistrationNotEnded'),
}


// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
})


// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const commonParams = {
    
    }
    if (config.method === 'get') {
      config.params = {
        ...commonParams,
        ...config.params
      }
    } else {
      config.data = {
        ...commonParams,
        ...config.data
      }
    }
    return config
  },
  (error) => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  (response) => {
    console.log(response?.data, 'response?.data')
    const {
      code,
      msg
    } = response?.data || {}
    if (code === 200) {
      return response.data
    } else {
      showFailToast(msg)
    }
  },
  (error) => {
    console.error('响应错误：', error?.response)
    const response = error?.response
    if (response) {
      if (response?.config?.url !== '/reservation/finish_task') {
        const { code } = response?.data || {}
        if (code) {
          showFailToast(ERROR_CODE[code] || $t('netWorkError'))
        }
      }
    }
    else {
      showFailToast($t('netWorkError'))
    }
    return Promise.reject(error)
  }
)

export default request

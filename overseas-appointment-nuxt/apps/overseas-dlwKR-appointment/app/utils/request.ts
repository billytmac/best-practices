import axios from 'axios'
import { mobileSystem, isMobile, getUrlParam } from  "~/utils/index.client"
import { useCustomStore } from "~/stores/custom"
import { storeToRefs } from 'pinia'

const ERROR_CODE = {
  3003: '네트워크 오류가 발생했습니다. 연결 상태를 확인해주세요.',
  3100: '먼저 사전 예약을 완료해주세요.',
  3102: '미션이 이미 완료되었습니다. 중복 제출은 불가능합니다.',
  3105: '사전 예약 이벤트가 아직 시작되지 않았습니다.',
  3106: '사전 예약 이벤트가 종료되었습니다.',
}



// 500、1001、1002、3001、3002---网络异常
// 3105---預約活動未開始
// 3106---預約活動已結束

// 500、1001、1002、3001、3002、3101、3104--网络异常
// 3003--请求过于频繁
// 3100--请先预约
// 3102--任务已完成，请勿重复提交
// 3105---预约活动未开始
// 3106---预约活动已结束

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: 'https://media.wonderent.net',
})
const isSpre =  __BUILD_TARGET__ === 'spre'


// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const handleCutomStore = useCustomStore()
    const { userInfo } = storeToRefs(handleCutomStore)
    const os = mobileSystem() === 'ios' ? 'ios' : 'android'
    // eslint-disable-next-line camelcase
    const device_type = isMobile() ? 'mobile' : 'pc'


    const commonParams = {
      os,
      device_type,
      channel: getUrlParam('channel'),
      // 37
      page_id: isSpre ? 38 : 37,
      phone: (userInfo.value as any)?.phone || '',
      area_code: '010'
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
          showFailToast(ERROR_CODE[code] || '네트워크 오류가 발생했습니다. 연결 상태를 확인해주세요.')
        }
      }
    }
    else {
      showFailToast('네트워크 오류가 발생했습니다. 연결 상태를 확인해주세요.')
    }
    return Promise.reject(error)
  }
)

export default request

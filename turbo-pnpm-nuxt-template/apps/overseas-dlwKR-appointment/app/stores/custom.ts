import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCustomStore = defineStore('custom', () => {
  const isMobile = ref(false)
  const isAlreadyAppointment = ref(false)
  const userInfo = ref({}) 
  const isGoShop = ref(false)

  const setDeviceType = (flag: boolean) => {
    isMobile.value = flag
  }
  const setIsAlreadyAppointment = (flag: boolean) => {
    isAlreadyAppointment.value = flag
  }
  const setUserInfo = (data: any) => {
    userInfo.value = data
  }

  const setIsGoShop = (flag: boolean) => {
    isGoShop.value = flag
  }
  return {
    isMobile,
    setDeviceType,
    isAlreadyAppointment,
    setIsAlreadyAppointment,
    userInfo,
    setUserInfo,
    isGoShop,
    setIsGoShop,
  }   
}, {
  // 配置持久化缓存
  persist: {
    storage: persistedState.localStorage // 显式指定存储位置
  }
},)


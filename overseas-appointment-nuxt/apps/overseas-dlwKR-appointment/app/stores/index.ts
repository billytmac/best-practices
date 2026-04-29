import { defineStore } from 'pinia'

export const useStore = defineStore(
  'store',
  () => {
    const isShowNav = ref<boolean>(false)

    const currentNav = ref<string>('main-menu')
    function setIsShowNav(val: boolean) {
      isShowNav.value = val
    }
    function setCurrentNav(val: string) {
      currentNav.value = val
    }
    return {
      isShowNav,
      setIsShowNav,
      currentNav,
      setCurrentNav,
    }
  },
)

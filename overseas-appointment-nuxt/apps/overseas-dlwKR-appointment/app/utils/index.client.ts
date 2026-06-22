
// 手机系统判断
export function mobileSystem() {
    var u = navigator.userAgent
    var isXiaomi = u.indexOf('XiaoMi') > -1 // 小米手机
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // 其它安卓
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios
    if (isAndroid || isXiaomi) {
      return 'android'
    } else if (isIOS) {
      return 'ios'
    }
  }
  
  export function isMobile() {
    // 使用正则表达式检测用户代理中的常见移动设备关键字
    const mobileKeywords =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  
    // 获取用户代理字符串
    const userAgent = navigator.userAgent
  
    // 检查用户代理中是否包含移动设备关键字
    if (mobileKeywords.test(userAgent)) {
      // 用户代理中包含移动设备关键字，认为是移动设备
      return true
    } else {
      // 用户代理中不包含移动设备关键字，认为是PC
      return false
    }
  }
  
  export function getUrlParam(name: string) {
    const url = new URL(window.location.href)
    const searchValue = url.searchParams.get(name)

    if (searchValue) {
      if (name === 'channel') {
        sessionStorage.setItem('channel', searchValue)
      }
      return searchValue
    }

    const hash = window.location.hash
    const hashQuery = hash.includes('?') ? hash.slice(hash.indexOf('?')) : ''
    const hashValue = hashQuery ? new URLSearchParams(hashQuery).get(name) : null

    if (hashValue) {
      if (name === 'channel') {
        sessionStorage.setItem('channel', hashValue)
      }
      return hashValue
    }

    if (name === 'channel') {
      return sessionStorage.getItem('channel')
    }

    return null
  }

  export function waitForUrlParam(name: string, timeout = 1500, interval = 100) {
    return new Promise<string | null>((resolve) => {
      const startTime = Date.now()

      const check = () => {
        const value = getUrlParam(name)

        if (value || Date.now() - startTime >= timeout) {
          resolve(value)
          return
        }

        window.setTimeout(check, interval)
      }

      check()
    })
  }

  // export function getUrlParam(name) {
  //   const url = new URL(window.location.href)
  //   return url.searchParams.get(name)
  // }
  
  // 数字格式化 - 添加千位分隔符
  export function formatNumber(num: number | string | null | undefined) {
    if (num === null || num === undefined) {
      return '0'
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  
  
  
  
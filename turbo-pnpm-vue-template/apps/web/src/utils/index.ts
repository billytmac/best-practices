
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





/**
 * Antd Mobile Toast 工具函数
 * 确保只在客户端环境中使用
 */

'use client'

import { Toast } from 'antd-mobile'

// 检查是否在客户端环境
const isClient = typeof window !== 'undefined'
const toastMaskClassName = 'toast-mask'

/**
 * 显示失败提示
 */
export function showFailToast(message: string) {
  if (!isClient) {
    console.warn('Toast can only be used on client side:', message)
    return
  }
 return Toast.show({
    // duration: 2000,
    maskClassName:toastMaskClassName,
    // icon: 'fail',
    content: message,
  })
}

/**
 * 显示成功提示
 */
export function showSuccessToast(message: string) {
  if (!isClient) {
    console.warn('Toast can only be used on client side:', message)
    return
  }
  Toast.show({
    icon: 'success',
    content: message,
  })
}

/**
 * 显示普通提示
 */
export function showToast(message: string) {
  if (!isClient) {
    console.warn('Toast can only be used on client side:', message)
    return
  }
  Toast.show({
    content: message,
    maskClassName:toastMaskClassName,
  })
}

/**
 * 显示加载提示
 */
export function showLoadingToast(message = '加載中...') {
  if (!isClient) {
    console.warn('Toast can only be used on client side')
    return { close: () => {} }
  }
  return Toast.show({
    icon: 'loading',
    content: message,
    duration: 0,
    maskClickable: false,
  })
}

/**
 * 创建加载提示（兼容旧代码）
 */
export function createshowLoadingToast() {
  return showLoadingToast('加載中...')
}


/**
 * 清除所有 Toast
 */
export function clearAllToast() {
  if (!isClient) return
  Toast.clear()
}

// 导出 Toast 原始对象（高级用法）
export { Toast }

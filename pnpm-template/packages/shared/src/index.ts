// ==================== 类型定义 ====================

/**
 * API 响应基础类型
 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
  timestamp: number
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * 用户基础信息
 */
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

/**
 * 请求状态
 */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

// ==================== 常量定义 ====================

/**
 * HTTP 状态码
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const

/**
 * 业务状态码
 */
export const BIZ_CODE = {
  SUCCESS: 0,
  FAIL: -1,
  TOKEN_EXPIRED: 10001,
  PERMISSION_DENIED: 10002,
  PARAM_ERROR: 10003,
} as const

/**
 * 本地存储 Key
 */
export const STORAGE_KEYS = {
  TOKEN: 'app_token',
  USER_INFO: 'app_user_info',
  THEME: 'app_theme',
  LOCALE: 'app_locale',
} as const

/**
 * 正则表达式
 */
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^1[3-9]\d{9}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  URL: /^https?:\/\/.+/,
} as const

// ==================== 工具类型 ====================

/**
 * 获取对象的值类型
 */
export type ValueOf<T> = T[keyof T]

/**
 * 可为空类型
 */
export type Nullable<T> = T | null

/**
 * 可选字段
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 必填字段
 */
export type RequiredFields<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>


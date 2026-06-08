import { deepClone, generateId, sleep } from '@mylib/utils'
import type { ApiResponse, PaginatedResponse, PaginationParams, User } from '@mylib/shared'
import { BIZ_CODE, HTTP_STATUS, STORAGE_KEYS } from '@mylib/shared'

// 重新导出依赖包的内容
export * from '@mylib/utils'
export * from '@mylib/shared'

/**
 * 请求配置
 */
export interface RequestConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
}

/**
 * 简单的 HTTP 客户端
 */
export class HttpClient {
  private config: RequestConfig

  constructor(config: RequestConfig) {
    this.config = {
      timeout: 10000,
      ...config,
    }
  }

  /**
   * 获取完整 URL
   */
  private getFullUrl(endpoint: string): string {
    return `${this.config.baseURL}${endpoint}`
  }

  /**
   * 获取请求头
   */
  private getHeaders(): Record<string, string> {
    const token = this.getToken()
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...this.config.headers,
    }
  }

  /**
   * 获取 Token
   */
  private getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.TOKEN)
    }
    return null
  }

  /**
   * 发起请求
   */
  async request<T>(
    method: string,
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    const url = this.getFullUrl(endpoint)
    const options: RequestInit = {
      method,
      headers: this.getHeaders(),
    }

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, options)
      const result: ApiResponse<T> = await response.json()

      if (result.code !== BIZ_CODE.SUCCESS) {
        throw new Error(result.message || 'Request failed')
      }

      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * GET 请求
   */
  get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint)
  }

  /**
   * POST 请求
   */
  post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data)
  }

  /**
   * PUT 请求
   */
  put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data)
  }

  /**
   * DELETE 请求
   */
  delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint)
  }
}

/**
 * 用户服务
 */
export class UserService {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * 获取用户列表
   */
  async getUsers(params: PaginationParams): Promise<PaginatedResponse<User>> {
    const response = await this.client.get<PaginatedResponse<User>>(
      `/users?page=${params.page}&pageSize=${params.pageSize}`
    )
    return response.data
  }

  /**
   * 获取单个用户
   */
  async getUser(id: string): Promise<User> {
    const response = await this.client.get<User>(`/users/${id}`)
    return response.data
  }

  /**
   * 创建用户
   */
  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const userData = {
      ...data,
      id: generateId('user_'),
    }
    const response = await this.client.post<User>('/users', userData)
    return response.data
  }

  /**
   * 更新用户
   */
  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await this.client.put<User>(`/users/${id}`, data)
    return response.data
  }

  /**
   * 删除用户
   */
  async deleteUser(id: string): Promise<void> {
    await this.client.delete(`/users/${id}`)
  }
}

/**
 * 创建应用实例
 */
export function createApp(config: RequestConfig) {
  const client = new HttpClient(config)
  const userService = new UserService(client)

  return {
    client,
    userService,
    utils: {
      deepClone,
      generateId,
      sleep,
    },
    constants: {
      BIZ_CODE,
      HTTP_STATUS,
      STORAGE_KEYS,
    },
  }
}


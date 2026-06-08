/**
 * Demo: 展示如何使用 monorepo 中的共享包
 */

// 从 @mylib/utils 导入工具函数
import { deepClone, debounce, throttle, formatDate, generateId, sleep } from '@mylib/utils'

// 从 @mylib/shared 导入类型和常量
import type { User, ApiResponse, PaginatedResponse } from '@mylib/shared'
import { BIZ_CODE, HTTP_STATUS, STORAGE_KEYS, REGEX } from '@mylib/shared'

// 从 @mylib/core 导入核心功能
import { createApp, HttpClient } from '@mylib/core'

console.log('🚀 pnpm + changeset Monorepo Demo\n')
console.log('=' .repeat(50))

// ==================== 测试 @mylib/utils ====================
console.log('\n📦 Testing @mylib/utils:\n')

// 1. 深拷贝
const original = { name: 'test', nested: { value: 123 } }
const cloned = deepClone(original)
cloned.nested.value = 456
console.log('deepClone:')
console.log('  Original:', original.nested.value) // 123
console.log('  Cloned:', cloned.nested.value) // 456

// 2. 格式化日期
const now = new Date()
console.log('\nformatDate:')
console.log('  Default:', formatDate(now))
console.log('  Custom:', formatDate(now, 'YYYY/MM/DD HH:mm:ss'))

// 3. 生成 ID
console.log('\ngenerateId:')
console.log('  Without prefix:', generateId())
console.log('  With prefix:', generateId('user_'))

// 4. 防抖和节流
console.log('\ndebounce & throttle: Functions created successfully ✓')
const debouncedFn = debounce(() => console.log('debounced'), 300)
const throttledFn = throttle(() => console.log('throttled'), 300)

// ==================== 测试 @mylib/shared ====================
console.log('\n' + '=' .repeat(50))
console.log('\n📦 Testing @mylib/shared:\n')

// 1. 使用类型
const mockUser: User = {
  id: generateId('user_'),
  username: 'testuser',
  email: 'test@example.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
console.log('User type:', mockUser)

// 2. 使用常量
console.log('\nConstants:')
console.log('  HTTP_STATUS.OK:', HTTP_STATUS.OK)
console.log('  BIZ_CODE.SUCCESS:', BIZ_CODE.SUCCESS)
console.log('  STORAGE_KEYS.TOKEN:', STORAGE_KEYS.TOKEN)

// 3. 使用正则
console.log('\nRegex validation:')
console.log('  Email valid:', REGEX.EMAIL.test('test@example.com'))
console.log('  Email invalid:', REGEX.EMAIL.test('invalid-email'))

// ==================== 测试 @mylib/core ====================
console.log('\n' + '=' .repeat(50))
console.log('\n📦 Testing @mylib/core:\n')

// 创建应用实例
const app = createApp({
  baseURL: 'https://api.example.com',
  timeout: 5000,
})

console.log('App instance created:')
console.log('  - client: HttpClient instance ✓')
console.log('  - userService: UserService instance ✓')
console.log('  - utils: { deepClone, generateId, sleep } ✓')
console.log('  - constants: { BIZ_CODE, HTTP_STATUS, STORAGE_KEYS } ✓')

// 使用 app 的工具函数
console.log('\nUsing app.utils.generateId:', app.utils.generateId('app_'))

// ==================== 完成 ====================
console.log('\n' + '=' .repeat(50))
console.log('\n✅ All packages working correctly!')
console.log('\n📝 Summary:')
console.log('  - @mylib/utils: Utility functions')
console.log('  - @mylib/shared: Types and constants')
console.log('  - @mylib/core: Core library using other packages')
console.log('\n💡 Run "pnpm changeset" to create a changeset for version management')


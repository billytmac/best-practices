#!/usr/bin/env node
/**
 * 跨平台启动 dev server，按目标平台设置环境变量
 * 用法：node scripts/dev.mjs pc | mobile | spre
 */
import { execSync } from 'node:child_process'
import process from 'node:process'
import { ALL_TARGETS } from '../app/constants/index.ts'


const target = process.argv[2] || 'pc'

if (!ALL_TARGETS.includes(target)) {
  console.error(`✗ 未知目标：${target}，可选：${ALL_TARGETS.join(', ')}`)
  process.exit(1)
}

console.log(`\n[dev] 启动 ${target} 模式开发服务器...\n`)

execSync('nuxt dev', {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: { ...process.env, BUILD_TARGET: target },
  shell: process.platform === 'win32',
})

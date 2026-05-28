#!/usr/bin/env node
/**
 * 一键构建 PC / Mobile 产物
 * --------------------------------
 * 用法：
 *   node scripts/build-all.mjs            # 构建全部 (pc + mobile)
 *   node scripts/build-all.mjs pc         # 只构建 pc
 *   node scripts/build-all.mjs mobile     # 只构建 mobile
 *
 * 构建流程：
 *   对每个目标 (pc / mobile)：
 *     - 设置环境变量 BUILD_TARGET=<target> 后执行 nuxt generate
 *       （nuxt.config.ts 里的 pages:extend 钩子会自动将根路由
 *         指向 app/pages/<target>/index.vue）
 *     - 把 .output/public 整体复制到 dist/<target>
 *
 * 产物：
 *   - dist/pc/      （PC 版本完整静态资源）
 *   - dist/mobile/  （Mobile 版本完整静态资源）
 */
import { execSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  rmSync,
} from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const ALL_TARGETS = ['pc', 'mobile', 'spre']

const argTargets = process.argv.slice(2).filter(Boolean)
const targets = argTargets.length > 0 ? argTargets : ALL_TARGETS

for (const t of targets) {
  if (!ALL_TARGETS.includes(t)) {
    console.error(`✗ 未知的构建目标：${t}，可选：${ALL_TARGETS.join(', ')}`)
    process.exit(1)
  }
}

const outputDir = path.join(projectRoot, '.output/public')
const distRoot = path.join(projectRoot, 'dist')

function log(msg) {
  console.log(`\n[build-all] ${msg}\n`)
}

function ensureDistDir() {
  if (existsSync(distRoot)) {
    const stat = lstatSync(distRoot)
    if (stat.isSymbolicLink() || stat.isFile()) {
      rmSync(distRoot)
    }
  }
  if (!existsSync(distRoot)) {
    mkdirSync(distRoot, { recursive: true })
  }
}

function buildOne(target) {
  log(`==== 开始构建 ${target} ====`)

  execSync('nuxt generate', {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env, BUILD_TARGET: target },
    shell: process.platform === 'win32',
  })

  if (!existsSync(outputDir)) {
    throw new Error(`未找到构建产物目录：${outputDir}`)
  }
  const targetDir = path.join(distRoot, target)
  if (existsSync(targetDir)) {
    rmSync(targetDir, { recursive: true, force: true })
  }
  mkdirSync(targetDir, { recursive: true })
  cpSync(outputDir, targetDir, { recursive: true })

  log(`✓ ${target} 构建完成 → dist/${target}`)
}

function run() {
  ensureDistDir()

  for (const target of targets) {
    buildOne(target)
  }

  log(`✓ 全部构建完成：${targets.map(t => `dist/${t}`).join(', ')}`)
}

run()

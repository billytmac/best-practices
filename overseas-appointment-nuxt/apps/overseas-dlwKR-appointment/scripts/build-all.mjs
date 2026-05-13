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
 *   1. 备份当前 app/pages/index.vue
 *   2. 对每个目标 (pc / mobile)：
 *      - 用 app/pages/<target>/index.vue 覆盖 app/pages/index.vue
 *      - 设置环境变量 BUILD_TARGET=<target> 后执行 nuxt generate
 *      - 把 .output/public 整体复制到 dist/<target>
 *   3. 还原 app/pages/index.vue
 *
 * 产物：
 *   - dist/pc/      （PC 版本完整静态资源）
 *   - dist/mobile/  （Mobile 版本完整静态资源）
 */
import { execSync } from 'node:child_process'
import {
  cpSync,
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const ALL_TARGETS = ['pc', 'mobile']

// 解析参数：未指定则构建全部
const argTargets = process.argv.slice(2).filter(Boolean)
const targets = argTargets.length > 0 ? argTargets : ALL_TARGETS

for (const t of targets) {
  if (!ALL_TARGETS.includes(t)) {
    console.error(`✗ 未知的构建目标：${t}，可选：${ALL_TARGETS.join(', ')}`)
    process.exit(1)
  }
}

const indexPath = path.join(projectRoot, 'app/pages/index.vue')
const outputDir = path.join(projectRoot, '.output/public')
const distRoot = path.join(projectRoot, 'dist')

function log(msg) {
  console.log(`\n[build-all] ${msg}\n`)
}

function ensureDistDir() {
  // 当前仓库里 dist 是 .output/public 的符号链接，需要先去掉以便我们写入真实目录
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

  // 1. 覆写 index.vue
  const sourcePage = path.join(projectRoot, `app/pages/${target}/index.vue`)
  if (!existsSync(sourcePage)) {
    throw new Error(`找不到源文件：${sourcePage}`)
  }
  copyFileSync(sourcePage, indexPath)
  log(`已将 app/pages/${target}/index.vue 复制为 app/pages/index.vue`)

  // 2. 执行 nuxt generate
  execSync('nuxt generate', {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env, BUILD_TARGET: target },
    shell: process.platform === 'win32',
  })

  // 3. 把 .output/public 复制到 dist/<target>
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

  // 备份原始 index.vue（如果有）
  let backup = null
  if (existsSync(indexPath)) {
    backup = readFileSync(indexPath)
  }

  let failed = null
  try {
    for (const target of targets) {
      buildOne(target)
    }
  } catch (err) {
    failed = err
  } finally {
    // 还原 index.vue
    if (backup !== null) {
      writeFileSync(indexPath, backup)
      log('已还原 app/pages/index.vue')
    }
  }

  if (failed) {
    console.error('\n[build-all] 构建失败：', failed.message)
    process.exit(1)
  }

  log(`✓ 全部构建完成：${targets.map(t => `dist/${t}`).join(', ')}`)
}

run()

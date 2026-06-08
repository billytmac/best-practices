import { createRemToPxProcessor } from '@unocss/preset-wind4/utils'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

const BASE_FONT_SIZE = 4

export default defineConfig({
  shortcuts: [
    ['flex-items-center', 'flex items-center'],
    ['flex-justify-center', 'flex justify-center'],
    ['flex-items-center-between', 'flex items-center justify-between'],
    ['flex-items-between', 'flex justify-between'],
    ['flex-items-center-center', 'flex items-center justify-center '],
    ['no-wrap-ellipsis', 'whitespace-nowrap text-ellipsis overflow-hidden'],
    ['absolute-Y-center', 'translate-y--50% top-50% absolute'],
  ],
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({ scale: 1.2 }),
  ],
  rules: [
    // =================================================================
    // 渐变规则 - 处理文字渐变效果
    // =================================================================
    
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  postprocess: [
    createRemToPxProcessor(BASE_FONT_SIZE),
  ],
})

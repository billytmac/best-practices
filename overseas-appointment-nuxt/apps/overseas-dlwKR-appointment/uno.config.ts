import { createRemToPxProcessor } from '@unocss/preset-wind4/utils'

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

/**
 * The base font size to convert rem to px (1rem = n px).
 */
const BASE_FONT_SIZE = 4

export default defineConfig({
  shortcuts: [
    ['flex-items-center', 'flex items-center'],
    ['flex-justify-center', 'flex justify-center'],
    ['flex-col-items-center', 'flex flex-col items-center'],
    ['flex-items-center-between', 'flex items-center justify-between'],
    ['flex-items-between', 'flex justify-between'],
    ['flex-items-center-center', 'flex items-center justify-center '],
    ['no-wrap-ellipsis', 'whitespace-nowrap text-ellipsis overflow-hidden'],
    ['absolute-Y-center', 'translate-y--50% top-50% absolute'],
    ['bg-cover-no-repeat', 'bg-cover  bg-no-repeat'],
  ],

  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      themeKey: 'font',
    }),
  ],

  postprocess: [
    createRemToPxProcessor(BASE_FONT_SIZE),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--c-primary)',
        hover: 'var(--c-primary-active)',
      },
    },
  },
})

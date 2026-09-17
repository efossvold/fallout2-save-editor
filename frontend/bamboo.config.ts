import { defineConfig } from '@bamboocss/dev'

import myPreset from './src/style/preset'

export default defineConfig({
  preflight: true,
  presets: ['@bamboocss/preset-base', myPreset],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  shorthands: true,
  strictPropertyValues: true,
  hash: process.env.NODE_ENV === 'production',
  outdir: './src/styled-system',
  watch: true,
  global: {
    css: {
      html: {
        textTendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        bg: 'gray.300',
      },
      body: {
        color: 'gray.300',
        fontFamily: 'var(--font-body)',
        fontSize: { base: 'token(fontSizes.xl)', sm: 'token(fontSizes.sm)' },
      },
    },
  },
  conditions: {
    extend: {
      open: '&[data-state="open"]',
      closed: '&[data-state="closed"]',
      active: '&[data-active="true"]',
      dataChecked: '&[data-checked="true"]',
      parentHover: '&[data-parent-hover="true"]',
      parentFocus: '&[data-parent-focus="true"]',
    },
  },
  theme: {
    extend: {
      tokens: {
        fonts: {
          falloutx: { value: 'var(--font-falloutx), var(--font-base)' },
          fallouty: { value: 'var(--font-fallouty), var(--font-base)' },
        },
      },
    },
  },
  utilities: {
    extend: {
      fontSize: {
        shorthand: 'fs',
      },
      width: { shorthand: 'w' },
      height: { shorthand: 'h' },
      size: {
        values: 'sizes',
        transform(value: number) {
          return {
            height: value,
            width: value,
          }
        },
      },
      posXY: {
        transform(value: string) {
          const [top = 0, right = 0, bottom = 0, left = 0] = value.split(' ')
          return {
            top,
            right,
            bottom,
            left,
          }
        },
      },
    },
  },
})

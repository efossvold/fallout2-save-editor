import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

// import { pluginRemoveUnusedCSS } from '~/style/utils'
import myPreset from './src/style/preset'

/**
 * TODO
 * disable utilities
 * checkout lightning css options for vite ("targets" amonst other)
 */

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/preset-base', myPreset],
  // plugins: [pluginRemoveUnusedCSS()],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  shorthands: true,
  strictTokens: true,
  strictPropertyValues: true,
  jsxFramework: 'react',
  jsxStyleProps: 'none',
  hash: process.env.NODE_ENV === 'production',
  outdir: './src/styled-system',
  watch: true,
  globalCss: defineGlobalStyles({
    html: {
      textTendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      bg: 'gray.300',
    },
    body: {
      color: 'gray.300',
      fontFamily: 'var(--font-body)',
      fontSize: { base: '{fontSizes.xl}', sm: '{fontSizes.sm}' },
    },
  }),
  conditions: {
    extend: {
      open: '&[data-state="open"]',
      closed: '&[data-state="closed"]',
      active: '&[data-active="true"]',
      parentHover: '&[data-parent-hover="true"]',
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
      posXY: {
        transform(value) {
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
  patterns: {
    extend: {
      grid: {
        defaultValues: {
          gap: '0',
        },
        properties: {
          templateCols: { type: 'string' },
          templateRows: { type: 'string' },
          justify: {
            type: 'enum',
            description: 'shite',
            value: [
              'flex-start',
              'flex-end',
              'center',
              'space-around',
              'space-between',
              'space-evenly',
              'stretch',
              'left',
              'normal',
              'right',
            ],
          },
        },
        transform(props) {
          const { templateCols, templateRows, justify, ...rest } = props
          return {
            display: 'grid',
            gridTemplateColumns: templateCols,
            gridTemplateRows: templateRows,
            justifyContent: justify,
            ...rest,
          }
        },
      },
    },
  },
})

import type { Theme as TW4Theme } from '@unocss/preset-wind4/theme'

import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'

type Theme = typeof theme

const theme = {
  font: {
    // register fonts from font face config in fonts.css
    // use as "font-falloutx" / "font-fallouty"
    falloutx: 'falloutx',
    fallouty: 'fallouty',
    family: 'fallouty, var(--font-base)',
    sans: 'fallouty, var(--font-base)',
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  breakpoint: {
    sm: '32.5rem' /* 520px */,
    md: '48rem' /* 768px */,
    lg: '60rem' /* 960px */,
    xl: '75rem' /* 1200px */,
    '2xl': '96rem' /* 1536px */,
  },
  colors: {
    gray: {
      50: 'oklch(99.11% 0 0)',
      100: 'oklch(89.14% 0 0)',
      200: 'oklch(78.89% 0 0)',
      300: 'oklch(68.62% 0 0)',
      400: 'oklch(57.61% 0 0)',
      500: 'oklch(46.04% 0 0)',
      600: 'oklch(38.29% 0 0)',
      700: 'oklch(29.72% 0 0)',
      800: 'oklch(20.9% 0 0)',
      900: 'oklch(9.69% 0 0)',
    },
    green: {
      50: 'oklch(31.94% 0.0966 136.9)',
      100: 'oklch(91.17% 0.1888 135)',
      200: 'oklch(87.23% 0.2743 138.9)',
      300: 'oklch(79.82% 0.2508 138.8)',
      400: 'oklch(72.26% 0.2262 138.7)',
      500: 'oklch(29.93% 0.0898 136.5)',
      600: 'oklch(64.48% 0.2014 138.5)',
      700: 'oklch(56.45% 0.1758 138.4)',
      800: 'oklch(48.16% 0.1488 138)',
      900: 'oklch(39.46% 0.1209 137.6)',
    },
    blue: {
      50: 'oklch(73.84% 0.0575 257.7)',
      100: 'oklch(67.04% 0.0739 257.9)',
      200: 'oklch(60.41% 0.0901 257)',
      300: 'oklch(53.57% 0.1077 257.3)',
      400: 'oklch(46.81% 0.1253 257.8)',
      500: 'oklch(43.48% 0.115 257.8)',
      600: 'oklch(40.08% 0.1044 257.8)',
      700: 'oklch(36.61% 0.0935 257.8)',
      800: 'oklch(33.06% 0.0823 257.8)',
      900: 'oklch(29.74% 0.071 257.2)',
    },
    beige: {
      50: 'oklch(34.19% 0.0435 73.9)',
      100: 'oklch(43.87% 0.0587 73)',
      200: 'oklch(53.37% 0.0739 73.1)',
      300: 'oklch(62.36% 0.0877 73.8)',
      400: 'oklch(70.94% 0.1014 72.7)',
      500: 'oklch(79.35% 0.1142 73.3)',
      600: 'oklch(82.3% 0.0986 74.7)',
      700: 'oklch(85.42% 0.0816 74.9)',
      800: 'oklch(88.48% 0.0644 76)',
      900: 'oklch(91.47% 0.047 74.5)',
    },
    brown: {
      50: 'oklch(75.4% 0.0323 61)',
      100: 'oklch(68.82% 0.0396 63.1)',
      200: 'oklch(62.47% 0.0461 63.3)',
      300: 'oklch(55.65% 0.053 63.3)',
      400: 'oklch(48.7% 0.0592 61.9)',
      500: 'oklch(43.82% 0.0498 62.5)',
      600: 'oklch(38.92% 0.0419 63.2)',
      700: 'oklch(33.62% 0.0338 60.8)',
      800: 'oklch(28.35% 0.0251 61.3)',
      900: 'oklch(22.81% 0.017 66.8)',
    },
    gold: {
      50: 'oklch(95.48% 0.1221 102.9)',
      100: 'oklch(94.35% 0.1426 102.3)',
      200: 'oklch(92.9% 0.1573 100.7)',
      300: 'oklch(91.32% 0.1667 98.6)',
      400: 'oklch(89.52% 0.1726 97.5)',
      500: 'oklch(79.16% 0.1503 97.9)',
      600: 'oklch(68.85% 0.1281 98.1)',
      700: 'oklch(58.14% 0.1051 98.4)',
      800: 'oklch(47.36% 0.082 98.2)',
      900: 'oklch(36.28% 0.0586 98)',
    },
  },
} satisfies TW4Theme

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme,
  preflights: [
    {
      getCSS: css => {
        const t = css.theme as Theme
        return `
          html {
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: ${t.colors.gray[300]};
          }

          body {
            color: ${t.colors.gray[300]};
            font-family: ${t.font.fallouty};
            font-size: var(--text-xl-fontSize);
          }

          @screen sm {
            body {
              font-size: var(--text-sm-fontSize);
            }
          }

          .tooltip {
            position: absolute;
            position-area: bottom;

            max-width: 15rem;
            padding: 0.75rem;
            padding-bottom: 0.5rem;
            background: var(--colors-gray-700);
            color: white;
            font-size: 0.875rem;
            text-align: center;

            --cr: 8px; /* corner-radius */
            --ap: 50%; /* anchor position (center) */
            --ah: 8px; /* anchor height */
            --aw: 8px; /* anchor width */

            /* https://una.im/border-shape */
            --border-shape: shape(
              from var(--cr) var(--ah),
              hline to calc(var(--ap) - var(--aw)),
              line by var(--aw) calc(var(--ah) * -1),
              line by var(--aw) var(--ah),
              hline to calc(100% - var(--cr)),
              curve to right calc(var(--ah) + var(--cr)) with right calc(var(--ah)),
              vline to calc(100% - var(--cr)),
              curve to calc(100% - var(--cr)) bottom with right bottom,
              hline to var(--cr),
              curve to left calc(100% - var(--cr)) with left bottom,
              vline to calc(var(--ah) + var(--cr)),
              curve to var(--cr) var(--ah) with left var(--ah)
            );

            clip-path: var(--border-shape);

            @supports (border-shape: shape(from 0 0, hline to 100%)) {
              clip-path: revert;
              border-shape: var(--border-shape);
            }
          }
          `
      },
    },
  ],
})

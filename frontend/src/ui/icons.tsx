import { cva } from '~/styled-system/css/cva'

export const caretStyle = cva({
  base: {
    borderWidth: '5',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    cursor: 'pointer',
  },
  variants: {
    size: {
      small: {
        borderWidth: '5',
      },
      large: {
        borderWidth: '7',
      },
    },
    direction: {
      up: {
        borderBottomColor: { base: 'gray.900', _hover: 'gold.400', _active: 'gold.400' },
      },
      down: {
        borderTopColor: { base: 'gray.900', _hover: 'gold.400', _active: 'gold.400' },
      },
      left: {
        borderRightColor: { base: 'green.200', _hover: 'gold.400', _active: 'gold.400' },
        mt: '0.5',
        mr: '1',
      },
      right: {
        borderLeftColor: { base: 'green.200', _hover: 'gold.400', _active: 'gold.400' },
        mt: '0.5',
        ml: '1',
      },
    },
  },
})

export const Checkbox = (p: {
  className?: string
  'data-hover'?: boolean
  'data-parent-hover'?: boolean
}) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    className={p.className}
    strokeWidth="0"
    viewBox="0 0 24 24"
    focusable="false"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    data-checked="false"
    data-hover={p['data-hover']}
    data-parent-hover={p['data-parent-hover']}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
)

export const CheckboxChecked = (p: {
  className?: string
  'data-hover'?: boolean
  'data-parent-hover'?: boolean
}) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    className={p.className}
    strokeWidth="0"
    viewBox="0 0 24 24"
    focusable="false"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    data-checked="true"
    data-hover={p['data-hover']}
    data-parent-hover={p['data-parent-hover']}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

export const GithubIcon = (p: { className?: string }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    className={p.className}
    strokeWidth="0"
    viewBox="0 0 16 16"
    focusable="false"
    height="1.5em"
    width="1.5em"
  >
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
)

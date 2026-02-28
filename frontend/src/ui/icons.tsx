import { clsx } from 'clsx'

import type { ClassName } from '../types/types'

interface CaretProps {
  isHovered?: boolean
  color?: string
  hoverColor?: string
  size?: number
}

export const caretRight = (p: CaretProps) =>
  clsx(
    'border-5',
    'border-t-transparent',
    'border-r-transparent',
    'border-b-transparent',
    p.isHovered ? 'border-l-gold-400' : 'border-l-green-200',
    'mt-[0.5px]',
    'ml-1',
  )

export const caretLeft = (p: CaretProps) =>
  clsx(
    'border-5',
    'border-t-transparent',
    p.isHovered ? 'border-r-gold-400' : 'border-r-green-200',
    'border-b-transparent',
    'border-l-transparent',
    'mt-[0.5px]',
    'mr-1',
  )

export const caretUp = (p: CaretProps) =>
  clsx(
    'border-7',
    'border-t-transparent',
    'border-r-transparent',
    p.isHovered ? 'border-b-gold-400' : 'border-b-gray-900',
    'border-l-transparent',
  )

export const caretDown = (p: CaretProps) =>
  clsx(
    'border-7',
    p.isHovered ? 'border-t-gold-400' : 'border-t-gray-900',
    'border-r-transparent',
    'border-b-transparent',
    'border-l-transparent',
  )

export const Checkbox = (p: { className?: ClassName }) => (
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
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
)

export const CheckboxChecked = (p: { className?: ClassName }) => (
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
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

export const GithubIcon = (p: { className?: ClassName }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    className={p.className}
    strokeWidth="0"
    viewBox="0 0 16 16"
    focusable="false"
    height="1.75em"
    width="1.75em"
  >
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
)

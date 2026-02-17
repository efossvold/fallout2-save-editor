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

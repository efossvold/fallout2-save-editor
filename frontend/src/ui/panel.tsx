import type { ComponentChildren } from 'preact'

import type { ColorToken } from '~/styled-system/tokens'

import { css, cx } from '../styled-system/css'

interface PanelHeaderProps {
  title: string
  color?: ColorToken
}

export const PanelHeader = (p: PanelHeaderProps) => (
  <p class={css({ color: 'beige.500', mb: '0', textTransform: 'uppercase' })}>{p.title}</p>
)

interface PanelProps {
  children: ComponentChildren
  class?: string
}

export const Panel = ({ children, class: className = '' }: PanelProps) => (
  <div class={cx(css({ bg: 'gray.900', p: '2', rounded: 'sm' }), className)}>{children}</div>
)

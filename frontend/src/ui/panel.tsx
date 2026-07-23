import type { PropsWithChildren } from 'react'

import type { ColorToken } from '~/styled-system/tokens'

import { css, cx } from '../styled-system/css'

interface PanelHeaderProps {
  title: string
  color?: ColorToken
}

export const PanelHeader = (p: PanelHeaderProps) => (
  <p className={css({ color: 'beige.500', mb: '0', textTransform: 'uppercase' })}>{p.title}</p>
)

export const Panel = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
  <div className={cx(css({ bg: 'gray.900', p: '2', rounded: 'sm' }), className)}>{children}</div>
)

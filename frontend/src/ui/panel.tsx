import type { ColorToken } from '~/styled-system/tokens'
import type { Children } from '~/types'

import { css, cx } from '../styled-system/css'

interface PanelHeaderProps {
  title: string
  color?: ColorToken
}

export const PanelHeader = (p: PanelHeaderProps) => (
  <p className={css({ color: 'beige.500', mb: '0', textTransform: 'uppercase' })}>{p.title}</p>
)

interface PanelProps {
  children: Children
  className?: string
}

export const Panel = ({ children, className = '' }: PanelProps) => (
  <div className={cx(css({ bg: 'gray.900', p: '2', rounded: 'sm' }), className)}>{children}</div>
)

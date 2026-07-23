import type React from 'react'
import type { CSSProperties, Ref } from 'react'

import type { FlexStyles } from '~/styled-system/patterns'

import { cx } from '~/styled-system/css'

import { flex } from '../../styled-system/patterns/flex'

interface FlexProps extends FlexStyles {
  className?: string
  children?: React.ReactNode
  id?: string
  ref?: Ref<HTMLDivElement>
  style?: CSSProperties
  sx?: string
}

export const Flex = ({ children, ref, id, className, sx, style, ...styles }: FlexProps) => (
  <div id={id} ref={ref} className={cx(flex(styles), sx, className)} style={style}>
    {children}
  </div>
)

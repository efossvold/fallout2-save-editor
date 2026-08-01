import type { GridStyles } from '~/styled-system/patterns/grid'
import type { OctaneNode, StyleElementProps } from '~/types'

import { cx } from '~/styled-system/css'
import { grid } from '~/styled-system/patterns/grid'

import type { FlexStyles } from '../../styled-system/patterns/flex'

import { flex } from '../../styled-system/patterns/flex'

export const Flex = ({
  children,
  ref,
  id,
  className,
  sx,
  style,
  ...styles
}: StyleElementProps & FlexStyles): OctaneNode => (
  <div id={id} ref={ref} className={cx(flex(styles), sx, className)} {...(style && { style })}>
    {children}
  </div>
)

export const Grid = ({
  children,
  ref,
  id,
  className,
  sx,
  style,
  ...styles
}: StyleElementProps & GridStyles) => (
  <div id={id} ref={ref} className={cx(grid(styles), sx, className)} {...(style && { style })}>
    {children}
  </div>
)

export const HStack = ({
  children,
  ref,
  id,
  className,
  sx,
  style,
  ...styles
}: StyleElementProps & FlexStyles) => (
  <div
    id={id}
    ref={ref}
    className={cx(flex({ direction: 'row', ...styles }), sx, className)}
    {...(style && { style })}
  >
    {children}
  </div>
)

export const VStack = ({
  children,
  ref,
  id,
  className,
  sx,
  style,
  ...styles
}: StyleElementProps & FlexStyles) => (
  <div
    id={id}
    ref={ref}
    className={cx(flex({ direction: 'column', ...styles }), sx, className)}
    {...(style && { style })}
  >
    {children}
  </div>
)

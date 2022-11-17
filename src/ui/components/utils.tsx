import React from 'react'
import { Box, DivProps } from 'react-native-magnus'

export const getSpacedChildren = (
  children: React.ReactNode,
  space: number,
  axis: 'X' | 'Y',
  reverse: boolean,
): any => {
  let childrenArray = React.Children.toArray(children)
  childrenArray = reverse ? [...childrenArray].reverse() : childrenArray

  const spacingProp: DivProps = space
    ? {
        ...(axis === 'X' ? { w: space } : { h: space }),
      }
    : {}

  childrenArray = childrenArray.map((child: any, index: number) => {
    return (
      <React.Fragment key={child.key ?? `spaced-child-${index}`}>
        {child}
        {index < childrenArray.length - 1 ? <Box {...spacingProp} /> : <></>}
      </React.Fragment>
    )
  })

  return childrenArray
}

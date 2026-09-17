import type { PatternConfig } from '@bamboocss/types'

const definePattern = <T extends PatternConfig>(config: T) => config

const flex = definePattern({
  properties: {
    align: { type: 'property', value: 'alignItems' },
    justify: { type: 'property', value: 'justifyContent' },
    direction: { type: 'property', value: 'flexDirection' },
    wrap: { type: 'property', value: 'flexWrap' },
    basis: { type: 'property', value: 'flexBasis' },
    grow: { type: 'property', value: 'flexGrow' },
    shrink: { type: 'property', value: 'flexShrink' },
  },
  transform(props) {
    const { direction, align, justify, wrap, basis, grow, shrink, ...rest } = props
    return {
      display: 'flex',
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      ...rest,
    }
  },
})

const vstack = definePattern({
  jsxName: 'VStack',
  properties: {
    justify: { type: 'property', value: 'justifyContent' },
    gap: { type: 'property', value: 'gap' },
  },
  defaultValues: {
    gap: '8px',
  },
  transform(props) {
    const { justify, gap, ...rest } = props
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: justify,
      gap,
      flexDirection: 'column',
      ...rest,
    }
  },
})

const hstack = definePattern({
  jsxName: 'HStack',
  properties: {
    justify: { type: 'property', value: 'justifyContent' },
    gap: { type: 'property', value: 'gap' },
  },
  defaultValues: {
    gap: '8px',
  },
  transform(props) {
    const { justify, gap, ...rest } = props
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: justify,
      gap,
      flexDirection: 'row',
      ...rest,
    }
  },
})

const grid = definePattern({
  properties: {
    gap: { type: 'property', value: 'gap' },
    columnGap: { type: 'property', value: 'gap' },
    rowGap: { type: 'property', value: 'gap' },
    columns: { type: 'number' },
    minChildWidth: { type: 'token', value: 'sizes', property: 'width' },
    templateCols: { type: 'string' },
    templateRows: { type: 'string' },
    justify: {
      type: 'enum',
      value: [
        'flex-start',
        'flex-end',
        'center',
        'space-around',
        'space-between',
        'space-evenly',
        'stretch',
        'left',
        'normal',
        'right',
      ],
    },
  },
  defaultValues({ columnGap, rowGap }) {
    return { gap: columnGap || rowGap ? undefined : '0' }
  },
  transform(props /*, { map, isCssUnit }*/) {
    const {
      columnGap,
      rowGap,
      gap,
      // columns,
      // minChildWidth,
      templateCols,
      templateRows,
      justify,
      ...rest
    } = props
    // const getValue = (v: string) => (isCssUnit(v) ? v : `token(sizes.${v}, ${v})`)
    return {
      display: 'grid',
      // gridTemplateColumns:
      //   columns != null
      //     ? map(columns, v => `repeat(${v}, minmax(0, 1fr))`)
      //     : minChildWidth != null
      //       ? map(minChildWidth, v => `repeat(auto-fit, minmax(${getValue(v)}, 1fr))`)
      //       : undefined,
      gridTemplateColumns: templateCols,
      gridTemplateRows: templateRows,
      justifyContent: justify,
      gap,
      columnGap,
      rowGap,
      ...rest,
    }
  },
})

export const patterns = {
  flex,
  vstack,
  hstack,
  grid,
}

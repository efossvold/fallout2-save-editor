import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { DivProps, Text, TextProps, ThemeType } from 'react-native-magnus'
import { ToastConfig } from 'react-native-toast-message'
import { Center } from './components/center'

export type Color = keyof typeof colors

// export const colors2 = {
//   blue: '#28599F',
//   black: '#000',
//   cream: '#FCFCFC',
//   gray: '#FCFCFC',
//   coolGray: '#9CA3AF',
//   beige: '#E8B064',
//   metal: '#585858',
//   wood: '#78583C',
//   gold: '#FCDC34',
//   green: '#60FC00',
//   darkGreen: '#204820',
// }

export const colors = {
  black: '#000',

  blue50: '#94ACCF',
  blue100: '#7997C3',
  blue200: '#5E83B7',
  blue300: '#436EAB',
  blue400: '#28599F',
  blue500: '#24508F',
  blue600: '#20477F',
  blue700: '#1C3E6F',
  blue800: '#18355F',
  blue900: '#142D50',

  beige50: '#46351E',
  beige100: '#664D2C',
  beige200: '#87663A',
  beige300: '#A77F48',
  beige400: '#C89756',
  beige500: '#E8B064',
  beige600: '#EBBC7B',
  beige700: '#EFC893',
  beige800: '#F2D4AA',
  beige900: '#F6DFC1',

  gray50: '#FCFCFC',
  gray100: '#DBDBDB',
  gray200: '#BABABA',
  gray300: '#9A9A9A',
  gray400: '#797979',
  gray500: '#585858',
  gray600: '#434343',
  gray700: '#2D2D2D',
  gray800: '#181818',
  gray900: '#030303',

  green50: '#173D00',
  green100: '#A9FD75',
  green200: '#60FC00',
  green300: '#55E000',
  green400: '#4BC400',
  green500: '#153700',
  green600: '#40A800',
  green700: '#358C00',
  green800: '#2B7000',
  green900: '#205400',

  brown50: '#BFAB9B',
  brown100: '#AD9682',
  brown200: '#9C826B',
  brown300: '#8A6D53',
  brown400: '#78583C',
  brown500: '#664C35',
  brown600: '#55402D',
  brown700: '#443325',
  brown800: '#33271D',
  brown900: '#221B14',

  gold50: '#FFF490',
  gold100: '#FFF077',
  gold200: '#FFEA5F',
  gold300: '#FFE349',
  gold400: '#FCDC34',
  gold500: '#D5BB30',
  gold600: '#B09B2B',
  gold700: '#8B7B25',
  gold800: '#685C1E',
  gold900: '#463E16',
} as const

export const theme: ThemeType = {
  fontFamily: {
    normal: 'fallouty',
    bold: 'fallouty',
    400: 'fallouty',
    500: 'fallouty',
  },
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
  },
  shadow: {
    default: {
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0,
      shadowRadius: 10,
      elevation: 20,
    },
  },
  colors,
}

export const border = (color?: string, p?: DivProps): DivProps => ({
  borderColor: color || '#f00',
  borderWidth: 1,
  ...p,
})

export const LINE_HEIGHT = 3

export const toastConfig: ToastConfig = {
  default: ({ text2, props }) => (
    <Center
      w={300}
      minH={50}
      bg="rgba(252, 252, 252, 0.9)"
      shadow="default"
      rounded="sm"
      p={8}
    >
      <Text color="#333">{text2}</Text>
    </Center>
  ),
}

export const scrollViewStyle = (height = 1): StyleProp<ViewStyle> => ({
  height,
})

export const tabsScrollViewStyle: StyleProp<ViewStyle> = scrollViewStyle(192)

import React from 'react'
import { Box, BoxProps, Text } from 'react-native-magnus'
import { Center } from '../components/center'
import { colors, LINE_HEIGHT } from '../theme'
import { useHelpTextStore } from './store'

export const HelpText = (p: BoxProps) => {
  const title = useHelpTextStore(s => s.title)
  const helpText = useHelpTextStore(s => s.helpText)
  return (
    <Box minH={190} pb={4} pl={8} pr={8}>
      <Text fontSize={20} color={colors.gray800}>
        {title}
      </Text>
      {title ? (
        <Box w="100%" borderBottomColor="#000" borderWidth={1} mt={8} mb={8} />
      ) : (
        <></>
      )}
      <Text fontSize={16} color={colors.gray800}>
        {helpText}
      </Text>
    </Box>
  )
}

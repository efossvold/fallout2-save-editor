import React from 'react'
import { PressableProps } from 'react-native'
import { Icon, Text } from 'react-native-magnus'
import { HStack } from '../components/flex'
import { SAVE_FILENAME } from '../constants'
import { Hoverable } from '../hoverable'
import { Color, colors } from '../theme'
import { getBasename } from './utils'

export const FileItem = (p: {
  path: string
  onPress: PressableProps['onPress']
}) => {
  const basename = getBasename(p.path)

  const isSaveFile = () => basename === SAVE_FILENAME
  const getItemColor = (): Color => (isSaveFile() ? 'beige500' : 'gray700')

  return (
    <Hoverable onPress={p.onPress}>
      {({ isHovered }) => (
        <HStack alignItems="center">
          <Icon
            name="file1"
            fontFamily="AntDesign"
            fontSize={14}
            color={isHovered ? colors.beige500 : getItemColor()}
            mr={4}
          />
          <Text
            color={isHovered ? colors.beige500 : getItemColor()}
            textDecorationLine={isHovered ? 'underline' : 'none'}
            fontWeight={isSaveFile() ? '500' : '400'}
          >
            {basename}
          </Text>
        </HStack>
      )}
    </Hoverable>
  )
}

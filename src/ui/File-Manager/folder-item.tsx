import React from 'react'
import { PressableProps } from 'react-native'
import { Icon, Text } from 'react-native-magnus'
import { HStack } from '../components/flex'
import { Hoverable } from '../hoverable'
import { colors } from '../theme'
import { getBasename } from './utils'

export const FolderItem = (p: {
  path: string
  onPress: PressableProps['onPress']
}) => {
  const basename = getBasename(p.path)

  return (
    <Hoverable onPress={p.onPress}>
      {({ isHovered }) => (
        <HStack alignItems="center">
          <Icon
            name="folder1"
            fontFamily="AntDesign"
            color={isHovered ? 'beige500' : 'gray700'}
            mr={6}
          />
          <Text
            color={isHovered ? 'beige500' : 'gray700'}
            textDecorationLine={isHovered ? 'underline' : 'none'}
          >
            {basename}
          </Text>
        </HStack>
      )}
    </Hoverable>
  )
}

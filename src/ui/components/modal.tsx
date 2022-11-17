import { OverlayContainer } from '@react-native-aria/overlays'
import React, { PropsWithChildren, useRef, useState } from 'react'
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { Box, BoxProps, Text } from 'react-native-magnus'
import { Disclosure } from '../hooks'
import { colors } from '../theme'
import { HStack } from './flex'

type ModalProps = PropsWithChildren<{
  disclosure: Disclosure
  w?: number
  h?: number
}>

const ANIM_DURATION = 300

export const Modal = ({ disclosure, ...p }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(disclosure.isOpen)
  const fadeAnim = useRef(new Animated.Value(isVisible ? 1 : 0)).current

  const fadeIn = () => {
    setIsVisible(true)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIM_DURATION,
      useNativeDriver: true,
    }).start()
  }

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: ANIM_DURATION,
      useNativeDriver: true,
    }).start(() => setIsVisible(false))
  }

  if (!disclosure.isOpen) {
    setTimeout(fadeOut, 0)
  }
  if (disclosure.isOpen) {
    setTimeout(fadeIn, 0)
  }

  const style: {
    overlay: StyleProp<ViewStyle>
    animated: StyleProp<ViewStyle>
  } = {
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      display: isVisible ? 'flex' : 'none',
      zIndex: isVisible ? 1000 : undefined,
      elevation: 1000,
    },
    animated: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      opacity: fadeAnim as unknown as number,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: isVisible ? 1001 : undefined,
      elevation: 1001,
    },
  }

  return (
    <OverlayContainer style={style.overlay}>
      <Animated.View style={style.animated}>
        <Pressable
          onPress={ev => {
            ev.preventDefault()
            ev.stopPropagation()
            disclosure.onClose()
          }}
        >
          <Box
            justifyContent="center"
            alignItems="center"
            h="100%"
            zIndex={1001}
          >
            <Pressable
              onPress={ev => {
                // Prevent closing modal when clicking on it
                // (since click on overlay closes modal)
                ev.preventDefault()
                ev.stopPropagation()
              }}
            >
              <Box
                minW={400}
                minH={400}
                w={p.w}
                h={p.h}
                bg={colors.gray50}
                zIndex={1002}
                rounded="sm"
                p={8}
                pl={16}
                pr={16}
              >
                {p.children}
              </Box>
            </Pressable>
          </Box>
        </Pressable>
      </Animated.View>
    </OverlayContainer>
  )
}

export const ModalHeader = ({ children, ...props }: BoxProps) => (
  <Text fontSize={24} color="#333" {...props}>
    {children}
  </Text>
)

export const ModalFooter = ({ children, ...props }: BoxProps) => (
  <HStack justifyContent="space-between" alignItems="center" {...props}>
    {children}
  </HStack>
)

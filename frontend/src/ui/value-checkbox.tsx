import type { IconProps } from '@chakra-ui/react'
import { HStack, Icon, Text, Tooltip } from '@chakra-ui/react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { useHelpTextStore } from './help-text/store'
import { useHoverColor } from './hooks'
import { Hoverable } from './hoverable'
import { TOOLTIP_PROPS } from './constants'
import { useIsMobile } from './theme/media-queries'

interface Props {
  name: string
  value: boolean
  helperText: string
  onCheck: () => void
  onUncheck: () => void
  checkboxProps?: IconProps
}

export const ValueCheckbox = (p: Props) => {
  const getColor = useHoverColor()
  const setHelpText = useHelpTextStore(s => s.setHelpText)
  const isMobile = useIsMobile()

  return (
    <Hoverable
      onHover={() => setHelpText(p.name, p.helperText)}
      cursor="pointer"
      onClick={ev => {
        ev.preventDefault()
        ev.stopPropagation()

        if (p.value) {
          p.onUncheck()
        } else {
          p.onCheck()
        }
      }}
    >
      {({ isHovered }) => (
        <HStack justifyContent="space-between">
          <Tooltip
            {...TOOLTIP_PROPS}
            label={p.helperText}
            isDisabled={!isMobile}
          >
            <Text
              color={getColor(isHovered, p.value ? 'green.200' : 'green.900')}
            >
              {p.name}
            </Text>
          </Tooltip>
          <Icon
            as={p.value ? MdCheckBox : MdCheckBoxOutlineBlank}
            color={getColor(
              isHovered,
              p.value || isHovered ? 'green.200' : 'green.900',
              'gold.400',
            )}
            mt={1}
            mr={4}
            {...p.checkboxProps}
          />
        </HStack>
      )}
    </Hoverable>
  )
}

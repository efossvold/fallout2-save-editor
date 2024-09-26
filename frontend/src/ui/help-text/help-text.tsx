import type { BoxProps } from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/react'
import { useHelpTextStore } from './store'

export const HelpText = (p: BoxProps) => {
  const title = useHelpTextStore(s => s.title)
  const helpText = useHelpTextStore(s => s.helpText)

  return (
    <Box pb={2} pl={2} pr={2}>
      <Text fontSize={20} color="gray.800">
        {title}
      </Text>
      {title ? (
        <Box
          w="100%"
          bg="beige.500"
          borderWidth={1}
          mt={2}
          mb={2}
          borderColor="gray.800"
        />
      ) : (
        <></>
      )}
      <Text fontSize={16} color="gray.800">
        {helpText}
      </Text>
    </Box>
  )
}

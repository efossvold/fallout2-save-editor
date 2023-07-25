import type { PropsWithChildren } from 'react'
import type { ButtonProps, TextProps } from '@chakra-ui/react'
import {
  HStack,
  Text,
  VStack,
  Button,
  Tooltip,
  Box,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useToaster } from './hooks'
import { Hoverable } from './hoverable'
import { Logo } from './logo'
import * as S from './selectors'
import { useAPIStore } from './store'
import { colors } from './theme'
import { ReadFile, SaveFile } from '../../wailsjs/go/main/App'
import { basename, dirname } from './utils'
import { useIsLargerThanMedium } from './theme/media-queries'
import { getError } from '../api/utils'
import { TOOLTIP_PROPS } from './constants'

export const IText = (p: PropsWithChildren<TextProps>) => (
  <Text color={p.color || 'gray600'} fontSize={12}>
    {p.children}
  </Text>
)

const IButton = ({ children, ...rest }: ButtonProps) => (
  <Button w={['100px', '90px']} {...rest}>
    <Text fontSize={[20, 16]}>{children}</Text>
  </Button>
)

const InfoItem = (p: { name: string; value: string }) => (
  <HStack justify="space-between">
    <IText color={colors.gray[600]}>{p.name}</IText>
    <IText color={colors.gray[400]}>{p.value}</IText>
  </HStack>
)

const SaveGameMeta = () => {
  const { currentSaveFile } = useAPIStore(s => s)
  const saveName = useAPIStore(s => s.data.saveName)
  const gameVersion = useAPIStore(s => s.data.gameVersion)
  const inGameTimeText = useAPIStore(S.getInGameTimeText)

  const gridStyle = useBreakpointValue({
    base: {
      gridTemplateColumns: '40% 40%',
      templateColumns: 'repeat(2)',
      w: '100%',
      justifyContent: 'space-between',
    },
    sm: {
      gridTemplateColumns: '40% 25%',
      templateColumns: 'repeat(2)',
      w: '100%',
      justifyContent: 'space-between',
    },
    md: {
      gridTemplateColumns: '42% 25%',
      templateColumns: 'repeat(2)',
      w: '50%',
      justifyContent: 'space-between',
    },
  })

  return currentSaveFile ? (
    <Grid {...gridStyle}>
      <GridItem>
        <Tooltip {...TOOLTIP_PROPS} label={currentSaveFile} cursor="pointer">
          <Box cursor="pointer">
            <InfoItem
              name="Path"
              value={`${currentSaveFile?.split('/').slice(-2).join('/')}`}
            />
          </Box>
        </Tooltip>
      </GridItem>
      <GridItem>
        <InfoItem name="Save name" value={saveName} />
      </GridItem>
      <GridItem>
        <InfoItem name="In-game time" value={inGameTimeText} />
      </GridItem>
      <GridItem>
        <InfoItem name="Game version" value={gameVersion} />
      </GridItem>
    </Grid>
  ) : null
}

export const Toolbar = () => {
  const isLargerThanMedium = useIsLargerThanMedium()
  const { save, toBase64, currentSaveFile } = useAPIStore(s => s)
  const load = useAPIStore(s => s.load)
  const toast = useToaster()

  return (
    <VStack w="100%" py={1} px={2} bg="gray.50" rounded={4}>
      <HStack justify="space-between" w="100%">
        <Hoverable>
          {({ isHovered }) => (
            <Logo
              height={38}
              fill={isHovered ? colors.blue[400] : colors.gray[200]}
            />
          )}
        </Hoverable>

        {isLargerThanMedium && <SaveGameMeta />}

        <HStack justify="space-between" spacing={18}>
          <IButton
            onClick={async () => {
              try {
                const [path, content, error] = await ReadFile()
                if (error) {
                  toast.error(error)
                } else if (path) {
                  load(path, content)
                }
              } catch (err) {
                toast.error(getError(err).message)
              }
            }}
          >
            Open
          </IButton>
          <IButton
            isDisabled={!currentSaveFile}
            onClick={async () => {
              try {
                save()

                const [filename, error] = await SaveFile(
                  toBase64(),
                  dirname(currentSaveFile || ''),
                  basename(currentSaveFile || ''),
                )
                if (error) {
                  toast.error(error)
                } else if (filename) {
                  toast.success('Save successful')
                }
              } catch (err) {
                toast.error(getError(err).message)
              }
            }}
          >
            Save
          </IButton>
          <IButton
            onClick={() => {
              window.runtime.Quit()
            }}
          >
            Quit
          </IButton>
          SaveGameMeta
        </HStack>
      </HStack>

      {!isLargerThanMedium && <SaveGameMeta />}
    </VStack>
  )
}

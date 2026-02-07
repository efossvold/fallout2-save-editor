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
import type { PropsWithChildren } from 'react'
// oxlint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react'

import { ReadFile, SaveFile } from '../../wailsjs/go/main/App'
// oxlint-disable-next-line no-unused-vars
import saveBase64 from '../api/slot01-stats.base64'
import type { MayBeError } from '../api/types/misc'
import { getError } from '../api/utils'

import { TOOLTIP_PROPS } from './constants'
import { useToaster } from './hooks'
import { Hoverable } from './hoverable'
import { Logo } from './logo'
import * as S from './selectors'
import { useAPIStore, handler } from './store'
import { colors } from './theme'
import { useIsLargerThanMedium } from './theme/media-queries'
import { basename, dirname } from './utils'

export const IText = (p: PropsWithChildren<TextProps>) => (
  <Text color={p.color ?? 'gray600'} fontSize={12}>
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
            <InfoItem name="Path" value={currentSaveFile.split('/').slice(-2).join('/')} />
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
  ) : (
    <></>
  )
}

export const Toolbar = () => {
  const isLargerThanMedium = useIsLargerThanMedium()
  const { save, currentSaveFile } = useAPIStore(s => s)
  const load = useAPIStore(s => s.load)
  const toast = useToaster()

  // const [hasLoaded, setHasLoaded] = useState(false)

  // useEffect(() => {
  //   if (!hasLoaded) {
  //     load('/savegame.file', saveBase64)
  //     setHasLoaded(true)
  //   }
  // }, [hasLoaded, load, setHasLoaded])

  return (
    <VStack w="100%" py={1} px={2} bg="gray.50" rounded={4}>
      <HStack justify="space-between" w="100%">
        <Hoverable>
          {({ isHovered }) => (
            <Logo height={38} fill={isHovered ? colors.blue[400] : colors.gray[200]} />
          )}
        </Hoverable>

        {isLargerThanMedium && <SaveGameMeta />}

        <HStack justify="space-between" spacing={18}>
          <IButton
            onClick={async () => {
              try {
                // oxlint-disable-next-line new-cap
                const [path, content, error] = (await ReadFile()) as [string, string, string]
                if (error) {
                  toast.error(error)
                } else if (path) {
                  load(path, content)
                }
              } catch (error) {
                toast.error(getError(error).message)
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
                // oxlint-disable-next-line new-cap
                const [filename, error] = (await SaveFile(
                  handler.toBase64(),
                  dirname(currentSaveFile ?? ''),
                  basename(currentSaveFile ?? ''),
                )) as [string, string]
                if (error) {
                  toast.error(error)
                } else if (filename) {
                  toast.success('Save successful')
                }
              } catch (error) {
                toast.error(getError(error as MayBeError).message)
              }
            }}
          >
            Save
          </IButton>
          <IButton
            onClick={() => {
              // oxlint-disable-next-line new-cap
              globalThis.runtime.Quit()
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

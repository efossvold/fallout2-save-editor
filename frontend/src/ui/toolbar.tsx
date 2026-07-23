import React, { use, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'

import { ReadFile, SaveFile } from '../../wailsjs/go/main/App'
import { base64toBlob, getError } from '../api/utils'
import { css } from '../styled-system/css'
import { Grid, HStack } from '../styled-system/jsx'
import { flex } from '../styled-system/patterns/flex'
import { ToolbarButton } from './components/buttons'
import { DEFAULT_SAVE_FILENAME } from './constants'
import { useIsWeb } from './hooks/use-is-web'
import { Logo } from './logo'
import * as S from './selectors'
import { useAPIStore, handler } from './store'
import { basename, dirname } from './utils'

const InfoItem = (p: React.PropsWithChildren<{ name: string }>) => (
  <div
    className={css({
      display: 'flex',
      justifyContent: 'space-between',
      fs: 'xs',
    })}
  >
    <p className={css({ color: 'gray.600' })}>{p.name}</p>
    <div className={css({ color: 'gray.400' })}>{p.children}</div>
  </div>
)

const SaveGameMeta = () => {
  const { currentSaveFile, saveName, gameVersion, inGameTimeText } = useAPIStore(
    useShallow(s => ({
      currentSaveFile: s.currentSaveFile,
      saveName: s.data.saveName,
      gameVersion: s.data.gameVersion,
      inGameTimeText: S.getInGameTimeText(s),
    })),
  )
  const savePathShort = currentSaveFile?.split('/').slice(-2).join('/')

  return currentSaveFile ? (
    <Grid
      templateCols={{ base: '50% 30%', sm: '40% 25%' }}
      justify="space-between"
      className={css({
        w: 'full',
        m: 'auto',
        order: '999',
        lg: { w: '1/2', order: 0 },
      })}
    >
      <InfoItem name="Path">
        <button
          // @ts-expect-error
          interestfor="tooltip-save-path"
          id="save-path-btn"
          className={css({ cursor: 'pointer' })}
          style={{
            anchorName: '--tooltip-anchor',
          }}
        >
          {savePathShort}
        </button>
        <div
          id="tooltip-save-path"
          popover="hint"
          className="tooltip"
          style={{
            positionAnchor: '--tooltip-anchor',
          }}
        >
          {currentSaveFile}
        </div>
      </InfoItem>
      <InfoItem name="Save name">{saveName}</InfoItem>
      <InfoItem name="In-game time">{inGameTimeText}</InfoItem>
      <InfoItem name="Game version">{gameVersion}</InfoItem>
    </Grid>
  ) : (
    <></>
  )
}

const useLoadDevData = () => {
  const load = useAPIStore(s => s.load)
  const isWeb = useIsWeb()
  const [hasLoaded, setHasLoaded] = useState(false)

  const loadStats = async () => {
    try {
      const saveBase64 = await import('../api/fixtures/slot01-stats.base64')
      load('/xxx/yyy/savegame.file', saveBase64.default)
      setHasLoaded(true)
    } catch (error) {
      toast.error(getError(error).message)
    }
  }

  if (!import.meta.env.PROD && Boolean(isWeb) && !hasLoaded) {
    use(loadStats())
  }
}

export const Toolbar = () => {
  const save = useAPIStore(s => s.save)
  const currentSaveFile = useAPIStore(s => s.currentSaveFile)
  const load = useAPIStore(s => s.load)
  const toggleDebugWindow = useAPIStore(s => s.toggleDebugWindow)
  const isWeb = useIsWeb()
  const showDebugWindow = useAPIStore(s => s.showDebugWindow)

  useLoadDevData()

  const onFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()

    let filename = ''
    const reader = new FileReader()

    reader.addEventListener('load', readEvent => {
      const data = readEvent.target?.result

      if (data) {
        if (typeof data === 'string') {
          const base64 = data.replace(/^data:application\/octet-stream;base64,/, '')
          load(filename, base64)
        } else {
          toast.error('Invalid file format')
        }
      }
    })

    const { files } = ev.target

    if (files && files.length > 0) {
      const [file] = files
      if (file) {
        filename = file.name
        reader.readAsDataURL(file)
      }
    }
  }

  const handleOpenFile = async () => {
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
  }

  const handleSaveFile = async () => {
    save()

    if (isWeb) {
      try {
        const blob = base64toBlob(handler.toBase64(), 'application/octet-stream')
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')

        a.href = url
        a.download = currentSaveFile ?? DEFAULT_SAVE_FILENAME
        document.body.appendChild(a)
        a.click()

        setTimeout(() => {
          URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }, 100)
      } catch (error) {
        const err = getError(error)
        if (!err.name.startsWith('AbortError')) {
          toast.error(getError(error).message)
        }
      }
    } else {
      try {
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
        toast.error(getError(error).message)
      }
    }
  }

  return (
    <div
      className={css({
        px: '2',
        py: '1',
        rounded: 'sm',
        bg: 'gray.50',
        w: 'full',
      })}
    >
      <HStack justify="space-between" gap="1" className={css({ w: 'full', flexWrap: 'wrap' })}>
        <Logo
          active={Boolean(currentSaveFile)}
          className={css({
            h: '11',
            fill: 'gray.200',
            _active: { fill: 'blue.400' },
          })}
        />

        <SaveGameMeta />

        <HStack gap="4" justify="space-around">
          {isWeb ? (
            <>
              <input type="file" id="open-file" onChange={onFileChange} hidden />
              <label
                htmlFor="open-file"
                className={flex({
                  justify: 'center',
                  color: 'gray.900',
                  bg: 'gray.100',
                  rounded: 'sm',
                  align: 'center',
                  h: '11',
                  w: '24',
                  cursor: 'pointer',
                  fontWeight: 'semibold',
                  sm: { fs: 'lg' },
                  _hover: { bg: 'gray.200' },
                })}
              >
                Open
              </label>
            </>
          ) : (
            <ToolbarButton onClick={handleOpenFile}>Open</ToolbarButton>
          )}
          <ToolbarButton isDisabled={!currentSaveFile} onClick={handleSaveFile}>
            Save
          </ToolbarButton>

          {isWeb && !import.meta.env.PROD && (
            <ToolbarButton
              isToggled={showDebugWindow}
              onClick={toggleDebugWindow}
              className={css({
                display: {
                  base: 'none',
                  // sm: 'none',
                  sm: 'block',
                },
              })}
            >
              Debug
            </ToolbarButton>
          )}

          {!isWeb && (
            <ToolbarButton
              onClick={() => {
                // oxlint-disable-next-line new-cap
                globalThis.runtime.Quit()
              }}
            >
              Quit
            </ToolbarButton>
          )}
        </HStack>
      </HStack>
    </div>
  )
}

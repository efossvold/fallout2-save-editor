import type { FunctionComponent } from 'preact'

import { useState } from 'preact/hooks'

import type { IInputEventHandler } from '~/types'

import { grid, hstack } from '~/styled-system/patterns'

import saveBase64 from '../api/fixtures/slot01-stats.base64'
import { base64toBlob, getError } from '../api/utils'
import { css } from '../styled-system/css'
import { flex } from '../styled-system/patterns/flex'
import { ToolbarButton } from './components/buttons'
import { DEFAULT_SAVE_FILENAME } from './constants'
import { useIsWeb } from './hooks/use-is-web'
import { Logo } from './logo'
import * as S from './selectors'
import { useAPIStore, handler } from './store'
import { useToaster } from './toaster/store'
import { basename, dirname, getFileService, getWailsRuntimeApp, getDocument } from './utils'

const InfoItem: FunctionComponent<{ name: string }> = p => (
  <div
    class={css({
      display: 'flex',
      justifyContent: 'space-between',
      fs: 'xs',
    })}
  >
    <p class={css({ color: 'gray.600' })}>{p.name}</p>
    <div class={css({ color: 'gray.400' })}>{p.children}</div>
  </div>
)

const SaveGameMeta = () => {
  const currentSaveFile = useAPIStore(s => s.currentSaveFile)
  const saveName = useAPIStore(s => s.data.saveName)
  const gameVersion = useAPIStore(s => s.data.gameVersion)
  const inGameTimeText = useAPIStore(s => S.getInGameTimeText(s))
  const savePathShort = currentSaveFile?.split('/').slice(-2).join('/')

  return currentSaveFile ? (
    <div
      class={grid({
        templateCols: { base: '50% 30%', sm: '40% 25%' },
        justify: 'space-between',
        w: 'full',
        m: 'auto',
        order: '999',
        lg: { w: '1/2', order: 0 },
      })}
    >
      <InfoItem name="Path">
        <button
          tabIndex={-1}
          // @ts-expect-error
          interestfor="tooltip-save-path"
          id="save-path-btn"
          class={css({ cursor: 'pointer' })}
          style={{
            anchorName: '--tooltip-anchor',
          }}
        >
          {savePathShort}
        </button>
        <div
          id="tooltip-save-path"
          popover="hint"
          class="tooltip"
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
    </div>
  ) : (
    <></>
  )
}

const useLoadDevData = () => {
  const load = useAPIStore(s => s.load)
  const isWeb = useIsWeb()
  const [hasLoaded, setHasLoaded] = useState(false)

  if (!import.meta.env.PROD && Boolean(isWeb) && !hasLoaded) {
    load('/xxx/yyy/savegame.file', saveBase64)
    setHasLoaded(true)
  }
}

export const Toolbar = () => {
  const toast = useToaster()
  const save = useAPIStore(s => s.save)
  const currentSaveFile = useAPIStore(s => s.currentSaveFile)
  const load = useAPIStore(s => s.load)
  const toggleDebugWindow = useAPIStore(s => s.toggleDebugWindow)
  const isWeb = useIsWeb()
  const showDebugWindow = useAPIStore(s => s.showDebugWindow)

  useLoadDevData()

  const onFileChange: IInputEventHandler = ev => {
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

    const { files } = ev.currentTarget

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
      const fs = await getFileService()
      // oxlint-disable-next-line new-cap
      const [path, content, error] = (await fs.ReadFile()) as [string, string, string]
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
        const doc = getDocument()

        if (!doc) {
          return
        }

        const blob = base64toBlob(handler.toBase64(), 'application/octet-stream')
        const url = URL.createObjectURL(blob)
        const a = doc.createElement('a')

        a.href = url
        a.download = currentSaveFile ?? DEFAULT_SAVE_FILENAME
        doc.body.appendChild(a)
        a.click()

        setTimeout(() => {
          URL.revokeObjectURL(url)
          doc.body.removeChild(a)
        }, 100)
      } catch (error) {
        const err = getError(error)
        if (!err.name.startsWith('AbortError')) {
          toast.error(getError(error).message)
        }
      }
    } else {
      try {
        const fs = await getFileService()
        // oxlint-disable-next-line new-cap
        const [filename, error] = (await fs.SaveFile(
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
      class={css({
        px: '2',
        py: '1',
        rounded: 'sm',
        bg: 'gray.50',
        w: 'full',
      })}
    >
      <div class={hstack({ justify: 'space-between', gap: '1', w: 'full', flexWrap: 'wrap' })}>
        <Logo
          active={Boolean(currentSaveFile)}
          class={css({
            h: '11',
            fill: 'gray.200',
            _active: { fill: 'blue.400' },
          })}
        />

        <SaveGameMeta />

        <div class={hstack({ gap: '4', justify: 'space-around' })}>
          {isWeb ? (
            <>
              <input type="file" id="open-file" onInput={onFileChange} hidden />
              <label htmlFor="open-file">
                <span
                  role="button"
                  aria-label="Open"
                  tabIndex={0}
                  aria-controls="open-file"
                  class={flex({
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
                </span>
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
              class={css({
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
              onClick={async () => {
                const app = await getWailsRuntimeApp()
                // oxlint-disable-next-line new-cap
                await app.Quit()
              }}
            >
              Quit
            </ToolbarButton>
          )}
        </div>
      </div>
    </div>
  )
}

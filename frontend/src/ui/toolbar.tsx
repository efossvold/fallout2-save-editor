import { Button } from '@headlessui/react'
import { clsx } from 'clsx'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { cn } from 'tailwind-variants'

import { ReadFile, SaveFile } from '../../wailsjs/go/main/App'
import type { MayBeError } from '../api/types/misc'
import { base64toBlob, getError } from '../api/utils'
import type { ButtonProps } from '../types/types'

import { useIsWeb } from './hooks'
import { Hoverable } from './hoverable'
import { Logo } from './logo'
import * as S from './selectors'
import { useAPIStore, handler } from './store'
import { basename, dirname } from './utils'

const ToolbarButton = ({ children, onClick, isDisabled, isToggled, className }: ButtonProps) => (
  <Button
    className={cn(
      'h-11 w-24 flex justify-center items-center sm:text-lg  bg-gray-100 text-gray-900 font-semibold rounded-sm hover:bg-gray-200 cursor-pointer transition-colors data-disabled:bg-gray-300 data-disabled:cursor-default',
      isToggled && 'bg-gray-600 text-gray-100 hover:bg-gray-400 hover:text-gray-50',
      className,
    )}
    onClick={onClick}
    disabled={isDisabled}
  >
    {children}
  </Button>
)

const InfoItem = (p: React.PropsWithChildren<{ name: string }>) => (
  <div className="flex justify-between text-xs">
    <p className="text-gray-600">{p.name}</p>
    <div className="text-gray-400">{p.children}</div>
  </div>
)

const SaveGameMeta = () => {
  const { currentSaveFile } = useAPIStore(s => s)
  const saveName = useAPIStore(s => s.data.saveName)
  const gameVersion = useAPIStore(s => s.data.gameVersion)
  const inGameTimeText = useAPIStore(S.getInGameTimeText)
  const savePathShort = currentSaveFile?.split('/').slice(-2).join('/')

  return currentSaveFile ? (
    <div className="m-auto w-full lg:w-1/2 grid grid-cols-[50%_30%] sm:grid-cols-[40%_25%] justify-between order-last lg:order-0">
      <InfoItem name="Path">
        <div className="tooltip tooltip-right cursor-pointer" data-tip={currentSaveFile}>
          <div>{savePathShort}</div>
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

export const Toolbar = () => {
  const { save, currentSaveFile } = useAPIStore(s => s)
  const load = useAPIStore(s => s.load)
  const toggleDebugWindow = useAPIStore(s => s.toggleDebugWindow)
  const isWeb = useIsWeb()
  const showDebugWindow = useAPIStore(s => s.showDebugWindow)

  const [hasLoaded, setHasLoaded] = useState(false)

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
        a.download = currentSaveFile ?? 'SAVE.DAT'
        document.body.appendChild(a)
        a.click()

        setTimeout(() => {
          URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }, 100)
      } catch (error) {
        const err = getError(error as MayBeError)
        if (!err.name.startsWith('AbortError')) {
          toast.error(getError(error as MayBeError).message)
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
        toast.error(getError(error as MayBeError).message)
      }
    }
  }

  useEffect(() => {
    const loadStats = async () => {
      try {
        const saveBase64 = await import('../api/fixtures/slot01-stats.base64')
        load('/xxx/yyy/savegame.file', saveBase64.default)
        setHasLoaded(true)
      } catch (error) {
        toast.error(getError(error).message)
      }
    }

    if (import.meta.env.MODE === 'development' && Boolean(isWeb) && !hasLoaded) {
      // oxlint-disable-next-line typescript/no-floating-promises
      loadStats()
    }
  }, [hasLoaded, load, isWeb, setHasLoaded])

  return (
    <div className="w-full py-1 px-2 bg-gray-50 rounded-sm">
      <div className="flex flex-row flex-wrap justify-between justify-items-center w-full gap-1">
        <Hoverable>
          {({ isHovered }) => (
            <Logo
              className={clsx('h-11 transition', isHovered ? 'fill-blue-400' : 'fill-gray-200')}
            />
          )}
        </Hoverable>

        <SaveGameMeta />

        <div className="flex flex-row justify-between gap-4">
          {isWeb ? (
            <>
              <input type="file" id="open-file" onChange={onFileChange} hidden />
              <label
                htmlFor="open-file"
                className="flex justify-center items-center sm:text-lg  bg-gray-100 text-gray-900 font-semibold rounded-sm hover:bg-gray-200 cursor-pointer transition-colors h-11 w-24"
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

          {isWeb ? (
            <ToolbarButton
              isDisabled={!currentSaveFile}
              isToggled={showDebugWindow}
              onClick={toggleDebugWindow}
              className="hidden sm:block"
            >
              Debug
            </ToolbarButton>
          ) : (
            <ToolbarButton
              onClick={() => {
                // oxlint-disable-next-line new-cap
                globalThis.runtime.Quit()
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

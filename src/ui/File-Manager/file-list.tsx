import React from 'react'
import { getError } from '../../api/utils'
import { VStack } from '../components/flex'
import { Disclosure } from '../hooks'
import { useAPIStore } from '../store'
import { FileItem } from './file-item'
import { useFileMgrStore } from './store'
import { getBasename } from './utils'

export const FileList = (p: { disclose: Disclosure }) => {
  const api = useAPIStore()
  const files = useFileMgrStore(s => s.files)
  const setError = useFileMgrStore(s => s.setError)

  return (
    <VStack mt={1}>
      {files
        .sort((a, b) => a.localeCompare(b))
        .map(path => (
          <FileItem
            key={path}
            path={path}
            onPress={async () => {
              try {
                await api.load(path)
                p.disclose.onClose()
                setError(null)
              } catch (err) {
                setError(
                  `'${getBasename(
                    path,
                  )}' does not look like a compatible save game (${
                    getError(err).message
                  })`,
                )
              }
            }}
          />
        ))}
    </VStack>
  )
}

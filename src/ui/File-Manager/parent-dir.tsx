import React from 'react'
import { VStack } from '../components/flex'
import { FolderItem } from './folder-item'
import { useFileMgrStore } from './store'

export const ParentDir = () => {
  const currentDir = useFileMgrStore(s => s.currentDir)
  const setCurrentDir = useFileMgrStore(s => s.setCurrentDir)
  const isRoot = currentDir.split('/').length < 1

  if (isRoot) return null

  return (
    <VStack mt={1}>
      <FolderItem
        path=".."
        onPress={() => {
          const parts = currentDir.split('/')
          parts.pop()
          setCurrentDir(parts.join('/'))
        }}
      />
    </VStack>
  )
}

import React from 'react'
import { VStack } from '../components/flex'
import { FolderItem } from './folder-item'
import { useFileMgrStore } from './store'

export const DirectoryList = () => {
  const currentDir = useFileMgrStore(s => s.currentDir)
  const directories = useFileMgrStore(s => s.directories)
  const setCurrentDir = useFileMgrStore(s => s.setCurrentDir)

  return (
    <VStack mt={1}>
      {directories
        .sort((a, b) => a.localeCompare(b))
        .map(path => (
          <FolderItem
            key={path}
            path={path}
            onPress={() => {
              if (path === '..') {
                const parts = currentDir.split('/')
                parts.pop()
                setCurrentDir(parts.join('/'))
                return
              }
              setCurrentDir(path)
            }}
          />
        ))}
    </VStack>
  )
}

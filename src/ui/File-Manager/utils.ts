import type { ReadDirItem } from 'react-native-fs'

export const getBasename = (path: string): string | undefined =>
  path.split('/').at(-1)
const exclude = ['.', '$']

export const fileFilter = (f: ReadDirItem): boolean => {
  const basename = getBasename(f.path)
  if (!f.isFile()) return false
  return !exclude.some(char => basename?.startsWith(char))
}

export const dirFilter = (f: ReadDirItem): boolean => {
  const basename = getBasename(f.path)
  if (!f.isDirectory()) return false
  return !exclude.some(char => basename?.startsWith(char))
}

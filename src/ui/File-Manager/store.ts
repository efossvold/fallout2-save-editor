import create from 'zustand'
import {
  exists,
  LibraryDirectoryPath,
  DocumentDirectoryPath,
} from 'react-native-fs'

export const DEFAULT_PATH = `${LibraryDirectoryPath}/Application Support/GOG.com/Fallout 2/saves`
// export const FALLOUT2_DIR = '/Users/currentUser/Games/fallout2-ce'
// export const SAVE_GAME_DIR = `${FALLOUT2_DIR}/DATA/SAVEGAME/SLOT01`

export const getSaveDir = async (): Promise<string> =>
  // (await exists(DEFAULT_PATH)) ? DEFAULT_PATH : SAVE_GAME_DIR
  (await exists(DEFAULT_PATH)) ? DEFAULT_PATH : DocumentDirectoryPath

interface FileManagerState {
  currentDir: string
  files: string[]
  error: string | null
  directories: string[]
  setCurrentDir: (text: string) => void
  setFiles: (files: string[]) => void
  setDirectories: (dirs: string[]) => void
  setError: (error: string | null) => void
}

export const useFileMgrStore = create<FileManagerState>(set => ({
  currentDir: '.',
  files: [],
  error: null,
  directories: [],
  setCurrentDir: path => set(state => ({ currentDir: path })),
  setFiles: files => set(state => ({ files })),
  setDirectories: directories => set(state => ({ directories })),
  setError: error => set(state => ({ error })),
}))

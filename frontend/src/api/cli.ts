import { homedir } from 'node:os'

import { saveHandler } from './save-handler'
import data from './slot01-stats.base64'

// export const DEFAULT_PATH = `${homedir()}/Application Support/GOG.com/Fallout 2/saves`
// export const DEFAULT_PATH = `${LibraryDirectoryPath}/Application Support/GOG.com/Fallout 2/saves`
// export const FALLOUT2_DIR = '/Users/currentUser/Games/fallout2-ce'
export const FALLOUT2_DIR = `${homedir()}/Spill/fallout2-ce`
export const SAVE_GAME_DIR = `${FALLOUT2_DIR}/DATA/SAVEGAME.backup/SLOT01`
export const SAVE_GAME_FILE = `${SAVE_GAME_DIR}/SAVE.DAT`

const handler = saveHandler()

// handler.readFile(SAVE_GAME_FILE)
handler.fromBase64(data)

console.log(handler.getData())

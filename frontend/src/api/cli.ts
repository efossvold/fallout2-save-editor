import { homedir } from 'node:os'

import data from './fixtures/slot01-stats'
import dataBase64 from './fixtures/slot01-stats.base64'
import { saveHandler } from './save-handler'

// export const DEFAULT_PATH = `${homedir()}/Application Support/GOG.com/Fallout 2/saves`
// export const DEFAULT_PATH = `${LibraryDirectoryPath}/Application Support/GOG.com/Fallout 2/saves`
// export const FALLOUT2_DIR = '/Users/currentUser/Games/fallout2-ce'
export const FALLOUT2_DIR = `${homedir()}/Spill/fallout2-ce`
export const SAVE_GAME_DIR = `${FALLOUT2_DIR}/DATA/SAVEGAME.backup/SLOT01`
export const SAVE_GAME_FILE = `${SAVE_GAME_DIR}/SAVE.DAT`

const handler = saveHandler()

// const data = readFileSync(`${homedir()}/Downloads/save1.dat`)

handler.fromBase64(dataBase64, data)
// handler.setData(data)

// handler.setCombatUnknown1(0)

// writeFileSync(
//   './slot01-stats.base64.1.ts',
//   `// oxlint-disable-next-line\nexport default '${handler.toBase64()}'`,
// )

console.log(handler.getGameVersion())

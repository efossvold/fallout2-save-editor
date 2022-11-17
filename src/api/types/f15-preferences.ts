import { PrefixedDictIndices } from './misc'

export type F17PreferencesNames =
  | 'gameDifficulty'
  | 'combatDifficulty'
  | 'violenceLevel'
  | 'targetHighlight'
  | 'combatLooks'
  | 'combatMessages'
  | 'combatTaunts'
  | 'languageFilter'
  | 'running'
  | 'subtitles'
  | 'itemHighlight'
  | 'combatSpeed'
  | 'playerSpeedup'
  | 'textBaseDelay'
  | 'masterVolume'
  | 'musicVolume'
  | 'sndFxVolume'
  | 'speechVolume'
  | 'brightness'
  | 'mouseSensitivity'

export type F17Preferences = PrefixedDictIndices<
  F17PreferencesNames,
  number,
  'pref'
>

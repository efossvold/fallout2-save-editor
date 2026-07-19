import { VERSION } from '../version'
import * as E from './editors'
import { HelpText } from './help-text'
import { useHeightObserver } from './hooks'
import { GithubIcon } from './icons'
import { Panel } from './panel'
import { useAPIStore } from './store'
import { Tabs } from './tabs'
import { Toolbar } from './toolbar'

export const Panels = () => {
  const setPanelsHeight = useAPIStore(s => s.setPanelsHeight)

  const ref = useHeightObserver({
    onChange: height => {
      setPanelsHeight(height)
    },
  })

  return (
    <div ref={ref} id="panels" className="flex flex-col gap-0.5">
      <Toolbar />

      <div className="gap-0.5 grid grid-cols-1 lg:grid-cols-[47%_1fr]">
        <div className="gap-0.5 grid grid-cols-1 sm:grid-cols-2">
          <div className="gap-0.5 grid grid-rows-[auto_1fr]">
            <Panel bg="bg-gradient-to-br from-brown-400 to-brown-600">
              <E.AttributesEditor />
            </Panel>
            <Panel>
              <E.PlayerXP />
            </Panel>
          </div>
          <div className="gap-0.5 grid grid-rows-[auto_1fr]">
            <Panel>
              <E.HealthEditor />
            </Panel>
            <Panel>
              <E.MiscStatsEditor />
            </Panel>
          </div>
        </div>

        <div className="gap-0.5 grid grid-cols-1 sm:grid-cols-[44%_1fr]">
          <Panel>
            <E.SkillsEditor />
          </Panel>
          <Panel>
            <E.PerksEditor />
          </Panel>
        </div>
      </div>

      <div className="gap-0.5 grid grid-cols-1 sm:grid-cols-[47%_1fr]">
        <Panel>
          <Tabs />
        </Panel>
        <Panel bg="px-4 bg-gradient-to-br from-beige-600 to-beige-400 min-h-55">
          <div className="flex flex-col h-full justify-between">
            <HelpText />
            <div className="text-gray-50 flex items-end justify-between">
              <div>v{VERSION}</div>
              <a href="https://github.com/efossvold/fallout2-save-editor" target="_blank">
                <GithubIcon className="hover:fill-gray-700" />
              </a>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}

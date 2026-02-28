import { VERSION } from '../version'

import * as E from './editors'
import { HelpText } from './help-text'
import { GithubIcon } from './icons'
import { Panel } from './panel'
import { Tabs } from './tabs'
import { Toolbar } from './toolbar'

export const Panels = () => (
  <div id="panels" className="flex flex-col gap-0.5">
    <Toolbar />

    <div className="grid grid-cols-1 lg:grid-cols-[47%_1fr] gap-0.5">
      <div className="grid-cols-1 grid sm:grid-cols-2 gap-0.5">
        <div className="grid grid-rows-[auto 1fr] gap-0.5">
          <Panel bg="bg-gradient-to-br from-brown-400 to-brown-600">
            <E.AttributesEditor />
          </Panel>
          <Panel>
            <E.PlayerXP />
          </Panel>
        </div>
        <div className="grid grid-rows-[auto 1fr] gap-0.5">
          <Panel>
            <E.HealthEditor />
          </Panel>
          <Panel>
            <E.MiscStatsEditor />
          </Panel>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[44%_1fr] gap-0.5">
        <Panel>
          <E.SkillsEditor />
        </Panel>
        <Panel>
          <E.PerksEditor />
        </Panel>
      </div>
    </div>

    <div className="grid-cols-1 grid sm:grid-cols-[47%_1fr] gap-0.5">
      <Panel>
        <Tabs />
      </Panel>
      <Panel bg="px-4 bg-gradient-to-br from-beige-600 to-beige-400 min-h-55">
        <div className="h-full flex flex-col justify-between">
          <HelpText />
          <div className="flex justify-between items-end text-gray-50">
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

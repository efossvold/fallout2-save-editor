import { VERSION } from '../version'

import * as E from './editors'
import { HelpText } from './help-text'
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
      <Panel bg="bg-gradient-to-br from-beige-600 to-beige-400">
        <div className="relative">
          <HelpText />
          <div className="absolute right-0 bottom-0 text-gray-50">v{VERSION}</div>
        </div>
      </Panel>
    </div>
  </div>
)

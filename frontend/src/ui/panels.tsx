import { grid } from '~/styled-system/patterns'

import { css } from '../styled-system/css'
import { flex } from '../styled-system/patterns/flex'
import { VERSION } from '../version'
import * as E from './editors'
import { HelpText } from './help-text'
import { useHeightObserver } from './hooks/use-height-observer'
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
    <div role="main" ref={ref} id="panels" class={flex({ direction: 'column', gap: '0.5' })}>
      <Toolbar />
      <div class={grid({ templateCols: { lg: '47% 1fr' }, gap: '0.5' })}>
        <div class={grid({ templateCols: { sm: 'repeat(2,minmax(0,1fr))' }, gap: '0.5' })}>
          <div class={grid({ templateRows: 'auto 1fr', gap: '0.5' })}>
            <Panel
              class={css({
                bgLinear: 'to-r',
                gradientFrom: 'brown.400',
                gradientTo: 'brown.600',
              })}
            >
              <E.AttributesEditor />
            </Panel>
            <Panel>
              <E.PlayerXP />
            </Panel>
          </div>
          <div class={grid({ templateRows: 'auto 1fr', gap: '0.5' })}>
            <Panel>
              <E.HealthEditor />
            </Panel>
            <Panel>
              <E.MiscStatsEditor />
            </Panel>
          </div>
        </div>

        <div class={grid({ templateCols: { base: '1fr', sm: '44% 1fr' }, gap: '0.5' })}>
          <Panel>
            <E.SkillsEditor />
          </Panel>
          <Panel>
            <E.PerksEditor />
          </Panel>
        </div>
      </div>
      <div
        class={grid({
          templateCols: { sm: '47% 1fr' },
          gap: '0.5',
          minH: { base: '80', lg: '55' },
        })}
      >
        <Panel>
          <Tabs />
        </Panel>
        <Panel
          class={css({
            bgLinear: 'to-r',
            gradientFrom: 'beige.600',
            gradientTo: 'beige.400',
            px: '4',
            minH: { base: '80', lg: '55' },
          })}
        >
          <div class={flex({ direction: 'column', justify: 'space-between', h: 'full' })}>
            <HelpText />
            <div class={flex({ justify: 'space-between', color: 'gray.50', fill: 'gray.50' })}>
              <div>v{VERSION}</div>
              <a
                href="https://github.com/efossvold/fallout2-save-editor"
                target="_blank"
                aria-label="Checkout project at github"
              >
                <GithubIcon
                  class={css({
                    _hover: { fill: 'gray.800' },
                  })}
                />
              </a>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}

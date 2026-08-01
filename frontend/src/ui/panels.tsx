import { css } from '../styled-system/css'
import { flex } from '../styled-system/patterns/flex'
import { Grid } from '../ui/components/layout'
import { VERSION } from '../version'
import { Flex } from './components/layout'
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
    <div ref={ref} id="panels" className={flex({ direction: 'column', gap: '0.5' })}>
      <Toolbar />
      <Grid templateCols={{ lg: '47% 1fr' }} gap="0.5">
        <Grid templateCols={{ sm: 'repeat(2,minmax(0,1fr))' }} gap="0.5">
          <Grid templateRows="auto 1fr" gap="0.5">
            <Panel
              className={css({
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
          </Grid>
          <Grid templateRows="auto 1fr" gap="0.5">
            <Panel>
              <E.HealthEditor />
            </Panel>
            <Panel>
              <E.MiscStatsEditor />
            </Panel>
          </Grid>
        </Grid>

        <Grid templateCols={{ base: '1fr', sm: '44% 1fr' }} gap="0.5">
          <Panel>
            <E.SkillsEditor />
          </Panel>
          <Panel>
            <E.PerksEditor />
          </Panel>
        </Grid>
      </Grid>
      <Grid
        templateCols={{ sm: '47% 1fr' }}
        gap="0.5"
        className={css({ minH: { base: '80', lg: '55' } })}
      >
        <Panel>
          <Tabs />
        </Panel>
        <Panel
          className={css({
            bgLinear: 'to-r',
            gradientFrom: 'beige.600',
            gradientTo: 'beige.400',
            px: '4',
            minH: { base: '80', lg: '55' },
          })}
        >
          <Flex direction="column" justify="space-between" sx={css({ h: 'full' })}>
            <HelpText />
            <Flex justify="space-between" sx={css({ color: 'gray.50', fill: 'gray.50' })}>
              <div>v{VERSION}</div>
              <a href="https://github.com/efossvold/fallout2-save-editor" target="_blank">
                <GithubIcon
                  className={css({
                    _hover: { fill: 'gray.800' },
                  })}
                />
              </a>
            </Flex>
          </Flex>
        </Panel>
      </Grid>
    </div>
  )
}

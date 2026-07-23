import { getLevelXP } from '../../api/data/xp-levels'
import { css } from '../../styled-system/css'
import { Flex } from '../components/flex'
import { MAX_LEVEL, MIN_LEVEL } from '../constants'
import { NameChanger } from '../name-changer'
import { PanelHeader } from '../panel'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { ValueSetter } from '../value-setter'

export const PlayerXP = () => {
  const data = useAPIStore(s => s.data)
  const setProp = useAPIStore(s => s.setProp)
  const playerAge = useAPIStore(S.getPlayerAge)

  return (
    <div className={css({ color: 'green.200' })}>
      <PanelHeader title="PLAYER INFO" />

      <NameChanger name={data.characterName} />

      <ValueSetter
        name="Age"
        baseValue={data.baseAge}
        bonusValue={data.bonusAge}
        helperText="How old you are. Sometimes we forget... :)"
        valueText={`${playerAge}`}
        isMinValue={playerAge <= 18}
        minValueMsg="Come on, let's respect the PG shall we?"
        onIncrease={() => {
          setProp('baseAge', data.baseAge + 1)
        }}
        onDecrease={() => {
          setProp('baseAge', data.baseAge - 1)
        }}
        dimOnZero={false}
      />

      <ValueSetter
        name="Gender"
        baseValue={data.baseGender}
        valueText={data.baseGender === 0 ? 'Male' : 'Female'}
        helperText="Yup. Haven't changed."
        onIncrease={() => {
          setProp('baseGender', 1)
        }}
        onDecrease={() => {
          setProp('baseGender', 0)
        }}
        minBaseValue={0}
        dimOnZero={false}
      />

      <ValueSetter
        name="Level"
        baseValue={data.playerLevel}
        helperText="Keep up the good work."
        minBaseValue={MIN_LEVEL}
        maxBaseValue={MAX_LEVEL}
        minValueMsg="Oh, back to where we started..."
        maxValueMsg="Now don't get gready..."
        onIncrease={() => {
          const nextLevel = data.playerLevel + 1
          setProp('playerLevel', data.playerLevel + 1)
          if (nextLevel < 99) {
            setProp('playerXP', Number(getLevelXP(data.playerLevel - 1)))
          }
        }}
        onDecrease={() => {
          const nextLevel = data.playerLevel - 1
          setProp('playerLevel', data.playerLevel - 1)
          if (nextLevel < 99) {
            setProp('playerXP', Number(getLevelXP(data.playerLevel - 1)))
          }
        }}
        dimOnZero={false}
      />

      <ValueSetter
        name="XP"
        baseValue={data.playerXP}
        helperText="Keep 'em coming."
        minValueMsg="Already as noob as one can get. It's a hard world out there, best of luck"
        maxValueMsg="Now don't get greedy..."
        onIncrease={() => {
          const xp = Math.trunc(data.playerXP * 1.1)
          setProp('playerXP', xp)
        }}
        onDecrease={() => {
          setProp('playerXP', data.playerXP * 0.9)
        }}
        dimOnZero={false}
      />

      <Flex justify="space-between">
        <p>Next Level</p>
        <Flex justify="space-between">
          {getLevelXP(data.playerLevel + 1)}
          <div className={css({ w: '4' })} />
        </Flex>
      </Flex>
    </div>
  )
}

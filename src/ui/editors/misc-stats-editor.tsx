import React from 'react'
import { Box } from 'react-native-magnus'
import { VStack } from '../components/flex'
import { PanelHeader } from '../panel'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { LINE_HEIGHT } from '../theme'
import { ValueSetter } from '../value-setter'

export const MiscStatsEditor = () => {
  const data = useAPIStore(s => s.data)
  const setData = useAPIStore(s => s.setData)

  return (
    <Box>
      <PanelHeader text="MISCHELLANEOUS" />
      <VStack space={LINE_HEIGHT}>
        <ValueSetter
          name="Armor Class"
          baseValue={useAPIStore(S.getACDerived)}
          bonusValue={data.bonusAC}
          minBonusValue={0}
          dimOnZero={false}
          helperText="Modifies the chance to hit this particular character."
          minValueMsg="Any less and the wind will blow you over"
          onIncrease={() => {
            setData('bonusAC', data.bonusAC + 1)
          }}
          onDecrease={() => {
            setData('bonusAC', data.bonusAC - 1)
          }}
        />

        <ValueSetter
          name="Action Points"
          baseValue={useAPIStore(S.getAPDerived)}
          bonusValue={data.bonusAP}
          minBaseValue={1}
          dimOnZero={false}
          helperText="The number of actions that the character can take during one combat turn."
          minValueMsg="Already as low as it gets, sorry"
          onIncrease={() => {
            setData('bonusAP', data.bonusAP + 1)
          }}
          onDecrease={() => {
            setData('bonusAP', data.bonusAP - 1)
          }}
        />

        <ValueSetter
          name="Carry Weight"
          baseValue={useAPIStore(S.getCarryWeightDerived)}
          bonusValue={data.bonusCarryWeight}
          minBonusValue={0}
          dimOnZero={false}
          helperText="The maximum amount of equipment your character can carry, in pounds."
          minValueMsg="Fate has decided to... NOT grant your request"
          onIncrease={() => {
            setData('bonusCarryWeight', data.bonusCarryWeight + 10)
          }}
          onDecrease={() => {
            setData('bonusCarryWeight', data.bonusCarryWeight - 10)
          }}
        />

        <ValueSetter
          name="Melee Damage"
          baseValue={useAPIStore(S.getMeleeDmgDerived)}
          bonusValue={data.bonusMeleeDmg}
          helperText="The amount of bonus damage your character does in hand-to-hand combat."
          minBonusValue={0}
          dimOnZero={false}
          minValueMsg="No we don't go there"
          onIncrease={() => {
            setData('bonusMeleeDmg', data.bonusMeleeDmg + 1)
          }}
          onDecrease={() => {
            setData('bonusMeleeDmg', data.bonusMeleeDmg - 1)
          }}
        />

        <ValueSetter
          name="Damage Resistance"
          baseValue={data.baseDmgResistanceNormal}
          bonusValue={data.bonusDmgResistanceNormal}
          unit="%"
          minBaseValue={null}
          minBonusValue={0}
          dimOnZero={false}
          helperText="Any damage taken is reduced by this amount. Damage Resistance can be increased by wearing armor."
          minValueMsg="You definitely like the extra challenge..."
          onIncrease={() => {
            setData(
              'bonusDmgResistanceNormal',
              data.bonusDmgResistanceNormal + 1,
            )
          }}
          onDecrease={() => {
            setData(
              'bonusDmgResistanceNormal',
              data.bonusDmgResistanceNormal - 1,
            )
          }}
        />

        <ValueSetter
          name="Poison Resistance"
          baseValue={useAPIStore(S.getPoisonResistanceDerived)}
          bonusValue={data.bonusPoisonResistance}
          unit="%"
          minBonusValue={0}
          dimOnZero={false}
          helperText="Reduces poison damage by this amount."
          minValueMsg="You're definitely not related to Indiana Jones..."
          onIncrease={() => {
            setData('bonusPoisonResistance', data.bonusPoisonResistance + 1)
          }}
          onDecrease={() => {
            setData('bonusPoisonResistance', data.bonusPoisonResistance - 1)
          }}
        />

        <ValueSetter
          name="Radiation Resistance"
          baseValue={useAPIStore(S.getRadiationResistanceDerived)}
          bonusValue={data.bonusRadiationResistance}
          unit="%"
          minBonusValue={0}
          dimOnZero={false}
          helperText="The amound of radiation you are exposed to is reduced by this percentage. Radiation Resistance can be modified by the type of armor worn, and anti-radiation chems."
          minValueMsg="That's as low as it goes, be thankful"
          onIncrease={() => {
            setData(
              'bonusRadiationResistance',
              data.bonusRadiationResistance + 1,
            )
          }}
          onDecrease={() => {
            setData(
              'bonusRadiationResistance',
              data.bonusRadiationResistance - 1,
            )
          }}
        />

        <ValueSetter
          name="Sequence"
          baseValue={useAPIStore(S.getSequenceDerived)}
          bonusValue={data.bonusSequence}
          minBonusValue={0}
          dimOnZero={false}
          helperText="Determines how soon in a combat turn your character can react."
          minValueMsg="Yeah, let's get killed while waiting for our turn"
          onIncrease={() => {
            setData('bonusSequence', data.bonusSequence + 1)
          }}
          onDecrease={() => {
            setData('bonusSequence', data.bonusSequence - 1)
          }}
        />

        <ValueSetter
          name="Healing Rate"
          baseValue={useAPIStore(S.getHealingRateDerived)}
          bonusValue={data.bonusHealingRate}
          minBonusValue={0}
          dimOnZero={false}
          helperText="At the end of each day your character will heal 1 HP for each point of Healing Rate. When you rest, you heal every six hours."
          minValueMsg="We're trying to stay alive here, ok?"
          onIncrease={() => {
            setData('bonusHealingRate', data.bonusHealingRate + 1)
          }}
          onDecrease={() => {
            setData('bonusHealingRate', data.bonusHealingRate - 1)
          }}
        />

        <ValueSetter
          name="Critical Change"
          baseValue={useAPIStore(S.getCriticalChanceDerived)}
          bonusValue={data.bonusCriticalChance}
          minBonusValue={0}
          dimOnZero={false}
          unit="%"
          helperText="The chance to cause a criticial hit in combat is increased by this amount."
          minValueMsg="Come on, give us a chance will you?"
          onIncrease={() => {
            setData('bonusCriticalChance', data.bonusCriticalChance + 1)
          }}
          onDecrease={() => {
            setData('bonusCriticalChance', data.bonusCriticalChance - 1)
          }}
        />
      </VStack>
    </Box>
  )
}

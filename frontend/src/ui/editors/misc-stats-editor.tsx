import { PanelHeader } from '../panel'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { ValueSetter } from '../value-setter'

export const MiscStatsEditor = () => {
  const data = useAPIStore(s => s.data)
  const setProp = useAPIStore(s => s.setProp)

  return (
    <>
      <PanelHeader title="MISCHELLANEOUS" />
      <div className="flex flex-col">
        <ValueSetter
          name="Armor Class"
          baseValue={useAPIStore(S.getACDerived)}
          bonusValue={data.bonusAC}
          minBonusValue={0}
          dimOnZero={false}
          helperText="Modifies the chance to hit this particular character."
          minValueMsg="Any less and the wind will blow you over"
          onIncrease={() => {
            setProp('bonusAC', data.bonusAC + 1)
          }}
          onDecrease={() => {
            setProp('bonusAC', data.bonusAC - 1)
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
            setProp('bonusAP', data.bonusAP + 1)
          }}
          onDecrease={() => {
            setProp('bonusAP', data.bonusAP - 1)
          }}
        />

        <ValueSetter
          name="Carry Weight"
          baseValue={useAPIStore(S.getCarryWeightDerived)}
          bonusValue={data.bonusCarryWeight}
          minBaseValue={0}
          dimOnZero={false}
          helperText="The maximum amount of equipment your character can carry, in pounds."
          minValueMsg="Fate has decided to... NOT grant your request"
          onIncrease={() => {
            setProp('bonusCarryWeight', data.bonusCarryWeight + 10)
          }}
          onDecrease={() => {
            setProp('bonusCarryWeight', data.bonusCarryWeight - 10)
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
            setProp('bonusMeleeDmg', data.bonusMeleeDmg + 1)
          }}
          onDecrease={() => {
            setProp('bonusMeleeDmg', data.bonusMeleeDmg - 1)
          }}
        />

        <ValueSetter
          name="Damage Resistance"
          baseValue={data.baseDmgResistanceNormal}
          bonusValue={data.bonusDmgResistanceNormal}
          unit="%"
          minBonusValue={0}
          dimOnZero={false}
          helperText="Any damage taken is reduced by this amount. Damage Resistance can be increased by wearing armor."
          minValueMsg="You definitely like the extra challenge..."
          onIncrease={() => {
            setProp('bonusDmgResistanceNormal', data.bonusDmgResistanceNormal + 1)
          }}
          onDecrease={() => {
            setProp('bonusDmgResistanceNormal', data.bonusDmgResistanceNormal - 1)
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
            setProp('bonusPoisonResistance', data.bonusPoisonResistance + 1)
          }}
          onDecrease={() => {
            setProp('bonusPoisonResistance', data.bonusPoisonResistance - 1)
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
            setProp('bonusRadiationResistance', data.bonusRadiationResistance + 1)
          }}
          onDecrease={() => {
            setProp('bonusRadiationResistance', data.bonusRadiationResistance - 1)
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
            setProp('bonusSequence', data.bonusSequence + 1)
          }}
          onDecrease={() => {
            setProp('bonusSequence', data.bonusSequence - 1)
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
            setProp('bonusHealingRate', data.bonusHealingRate + 1)
          }}
          onDecrease={() => {
            setProp('bonusHealingRate', data.bonusHealingRate - 1)
          }}
        />

        <ValueSetter
          name="Critical Change"
          baseValue={useAPIStore(S.getCriticalChanceDerived)}
          bonusValue={data.bonusCriticalChance}
          dimOnZero={false}
          unit="%"
          helperText="The chance to cause a criticial hit in combat is increased by this amount."
          minValueMsg="Come on, give us a chance will you?"
          onIncrease={() => {
            setProp('bonusCriticalChance', data.bonusCriticalChance + 1)
          }}
          onDecrease={() => {
            setProp('bonusCriticalChance', data.bonusCriticalChance - 1)
          }}
        />
      </div>
    </>
  )
}

import React, { useEffect } from 'react'
import { Text } from 'react-native-magnus'
import { VStack } from '../components/flex'
import { PanelHeader } from '../panel'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { LINE_HEIGHT } from '../theme'
import { ValueCheckbox } from '../value-checkbox'
import { ValueSetter } from '../value-setter'

export const HealthEditor = () => {
  const data = useAPIStore(s => s.data)
  const setData = useAPIStore(s => s.setData)
  const HPTotal = useAPIStore(S.getHPTotal)
  const HPDerived = useAPIStore(S.getHPDerived)
  const setCrippledLimb = useAPIStore(s => s.setCrippledLimb)

  const hasEyeDamage = useAPIStore(s => S.getIsLimbCrippled(s, 'EYES'))
  const hasCrippledRightArm = useAPIStore(s =>
    S.getIsLimbCrippled(s, 'RIGHT_ARM'),
  )
  const hasCrippledLeftArm = useAPIStore(s =>
    S.getIsLimbCrippled(s, 'LEFT_ARM'),
  )
  const hasCrippledRightLeg = useAPIStore(s =>
    S.getIsLimbCrippled(s, 'RIGHT_LEG'),
  )
  const hasCrippledLeftLeg = useAPIStore(s =>
    S.getIsLimbCrippled(s, 'LEFT_LEG'),
  )

  useEffect(() => {
    setData('currentHP', HPDerived + data.bonusHP)
  }, [HPDerived, data.bonusHP, setData])

  return (
    <VStack space={LINE_HEIGHT}>
      <PanelHeader text="HEALTH" />
      <ValueSetter
        name="Hit Points"
        baseValue={HPDerived}
        bonusValue={data.bonusHP}
        valueText={`${data.currentHP}/${HPTotal}`}
        helperText="How much damage your character can take before dying. If you reach 0 HP or less, you are dead."
        minBonusValue={0}
        minValueMsg="Trying to kill yourself before you've even started?"
        onIncrease={() => {
          setData('bonusHP', data.bonusHP + 1)
        }}
        onDecrease={() => {
          setData('bonusHP', data.bonusHP - 1)
        }}
      />

      <ValueSetter
        name="Poisoned"
        baseValue={data.poison}
        helperText="Your character been poisoned. Poison will do damage over a period of time, until cured or it passes from your system."
        minValueMsg="You're already free of poison, no need to push your luck"
        onIncrease={() => {
          setData('poison', data.poison + 1)
        }}
        onDecrease={() => {
          setData('poison', data.poison - 1)
        }}
      />

      <ValueSetter
        name="Radiated"
        baseValue={data.radiation}
        helperText="Your character is suffering from a significant amount of Radiation poisoning. The more radiation damage, the more deadly the effect."
        minValueMsg="Radiation be gone. Yup, definitely gone"
        onIncrease={() => {
          setData('radiation', data.radiation + 1)
        }}
        onDecrease={() => {
          setData('radiation', data.radiation - 1)
        }}
      />

      <ValueCheckbox
        name="Eye Damage"
        value={hasEyeDamage}
        helperText="This means your character has been seriously hit in one or both of your eyes. This affects your Perception."
        onCheck={() => {
          setCrippledLimb('EYES', !hasEyeDamage)
        }}
        onUncheck={() => {
          setCrippledLimb('EYES', !hasEyeDamage)
        }}
      />

      <ValueCheckbox
        name="Crippled Right Arm"
        value={hasCrippledRightArm}
        helperText="The right arm has been severely hurt, and cannot function well. If one arm has been crippled, you cannot use two-handed weapons. If both arms have been crippled, you cannot attack with weapons."
        onCheck={() => {
          setCrippledLimb('RIGHT_ARM', !hasCrippledRightArm)
        }}
        onUncheck={() => {
          setCrippledLimb('RIGHT_ARM', !hasCrippledRightArm)
        }}
      />

      <ValueCheckbox
        name="Crippled Left Arm"
        value={hasCrippledLeftArm}
        helperText="Your character's left arm has been severely hurt, and cannot function well. If one arm has been crippled, you cannot use two-handed weapons. If both arms have been crippled, you cannot attack with weapons."
        onCheck={() => {
          setCrippledLimb('LEFT_ARM', !hasCrippledLeftArm)
        }}
        onUncheck={() => {
          setCrippledLimb('LEFT_ARM', !hasCrippledLeftArm)
        }}
      />

      <ValueCheckbox
        name="Crippled Right Leg"
        value={hasCrippledRightLeg}
        helperText="Your character has a crippled right leg."
        onCheck={() => {
          setCrippledLimb('RIGHT_LEG', !hasCrippledRightLeg)
        }}
        onUncheck={() => {
          setCrippledLimb('RIGHT_LEG', !hasCrippledRightLeg)
        }}
      />

      <ValueCheckbox
        name="Crippled Left Leg"
        value={hasCrippledLeftLeg}
        helperText="Your character has a crippled left leg."
        onCheck={() => {
          setCrippledLimb('LEFT_LEG', !hasCrippledLeftLeg)
        }}
        onUncheck={() => {
          setCrippledLimb('LEFT_LEG', !hasCrippledLeftLeg)
        }}
      />
    </VStack>
  )
}

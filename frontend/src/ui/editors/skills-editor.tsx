import { SKILLS } from '../../api/data/skills'
import type { SkillValues } from '../../api/types/skills'
import { entries } from '../../api/utils'
import { MAX_SKILL_VALUE, MIN_SKILL_VALUE } from '../constants'
import { PanelHeader } from '../panel'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { ValueSetter } from '../value-setter'

export const SkillSetter = (p: { name: keyof SkillValues; value: number }) => {
  const setProp = useAPIStore(s => s.setProp)
  const skillTotal = useAPIStore(s => S.getSkillTotal(s, p.name))
  const isSkillTagged = useAPIStore(s => S.getSkillIsTagged(s, p.name))

  return (
    <ValueSetter
      name={SKILLS[p.name].name}
      baseValue={p.value}
      helperText={SKILLS[p.name].desc}
      valueText={`${Math.min(skillTotal, MAX_SKILL_VALUE)}%`}
      dimOnZero={false}
      minBaseValue={MIN_SKILL_VALUE}
      isMaxValue={skillTotal >= MAX_SKILL_VALUE}
      minValueMsg="Minimum level reached for this skill, why go lower?"
      maxValueMsg="Max level reached. Way to go! Or... Did you cheat?"
      onIncrease={() => {
        setProp(p.name, p.value + 1)
      }}
      onDecrease={() => {
        setProp(p.name, p.value - 1)
      }}
      color={isSkillTagged ? 'gray100' : undefined}
    />
  )
}

export const SkillsEditor = () => {
  const skills = useAPIStore(S.getSkills)

  return (
    <>
      <PanelHeader title="SKILLS" />
      <div className="flex flex-col">
        {entries(skills).map(([name, value]) => (
          <SkillSetter key={name} name={name} value={value} />
        ))}
      </div>
    </>
  )
}

import type { SaveGameData } from '~/api/types/map'

import { createSaveData } from '~/api/save-data'

import { Wrapper } from '../../../cypress/support/wrapper'
import { MAX_TAGGED_SKILLS } from '../constants'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { SkillSetter } from './skills-editor'

const ui = {
  hoverable: '[data-cy="value-setter"] >',
  main: '[data-cy="value-setter"] > :first',
  rightBtn: 'button[aria-label="Increase Sneak"]',
  leftBtn: 'button[aria-label="Decrease Sneak"]',
}

const Component = ({ data }: { data: SaveGameData }) => {
  const skills = useAPIStore(S.getSkills)
  return (
    <Wrapper data={data}>
      <SkillSetter name="skillSneak" value={skills.skillSneak} />
    </Wrapper>
  )
}

describe('SkillsEditor', () => {
  it('should render component', () => {
    cy.mount(
      <Component
        data={createSaveData({
          baseAttrAgility: 10,
          bonusAttrAgility: 0,
        })}
      />,
    )

    cy.log('Should contain skill name (Sneak)')
    cy.contains('Sneak').should('be.visible')

    // Skill will have value 25% (5% + (3 × Agility[10]))
    cy.log('Should contain skill value of 35%')
    cy.contains('35%').should('be.visible')

    cy.log('Text color should be green')
    cy.get(ui.main).should('have.css', 'color', 'oklch(0.8723 0.2743 138.9)') // color: green

    cy.log('Text color should be white when hovered')
    cy.get(ui.hoverable).trigger('pointerenter')
    cy.get(ui.main).should('have.css', 'color', 'oklch(0.9911 0 0)') // color: white

    // Test right arrow button (skill untagged)
    cy.log('Clicking right arrow should increase value by 1')
    cy.get('button[aria-label="Increase Sneak"]').click()
    cy.contains('36%').should('be.visible')

    // Test left arrow button (skill untagged)
    cy.log('Clicking right arrow should increase value by 1')
    cy.get('button[aria-label="Decrease Sneak"]').click()
    cy.contains('35%').should('be.visible')

    // Test tagging skill
    cy.log('Clicking on name should tag skill')
    cy.get(ui.main).click().should('have.css', 'color', 'oklch(0.929 0.1573 100.7)') // color: gold
    cy.contains('55%').should('be.visible')

    // Test right arrow button (skill tagged)
    cy.log('Clicking right arrow should increase value by 2 when skill is tagged')
    cy.get(ui.rightBtn).click()
    cy.contains('57%').should('be.visible')

    // Test left arrow button (skillntagged)
    cy.log('Clicking left arrow should decrease value by 2 when skill is tagged')
    cy.get(ui.leftBtn).click()
    cy.contains('55%').should('be.visible')
  })

  it('should show toast when trying to decrease value below base value (35)', () => {
    cy.mount(
      <Component
        data={createSaveData({
          baseAttrAgility: 10,
          bonusAttrAgility: 0,
        })}
      />,
    )

    cy.get('button[aria-label="Decrease Sneak"]').click()
    cy.get('[role="status"]').should(
      'contain.text',
      'Minimum level reached for this skill, why go lower?',
    )
    cy.contains('35%').should('be.visible')
  })

  it('should show toast when trying to increase value above max value (300)', () => {
    cy.mount(
      <Component
        data={createSaveData({
          baseAttrAgility: 10,
          bonusAttrAgility: 0,
          skillSneak: 300,
        })}
      />,
    )

    cy.get('button[aria-label="Increase Sneak"]').click()
    cy.get('[role="status"]').should(
      'contain.text',
      'Max level reached. Way to go! Or... Did you cheat?',
    )
    cy.contains('300%').should('be.visible')
  })

  it('should show toast when trying tag more than 4 skills', () => {
    cy.mount(
      <Component
        data={createSaveData({
          taggedSkill1: 1,
          taggedSkill2: 2,
          taggedSkill3: 3,
          taggedSkill4: 4,
        })}
      />,
    )

    cy.get(ui.main)
      .click()
      .trigger('pointerleave')
      // Should be green (untagged), not gold (tagged)
      .should('have.css', 'color', 'oklch(0.8723 0.2743 138.9)')
    cy.get('[role="status"]').should(
      'contain.text',
      `Cannot tag more than ${MAX_TAGGED_SKILLS} skills. This is a game limitation.`,
    )
  })
})

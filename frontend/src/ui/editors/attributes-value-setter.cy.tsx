import { wrapper } from '../../../cypress/support/wrapper'
import { AttrValueSetter } from './attributes-value-setter'

const KEYS = Cypress.Keyboard.Keys

it('should render AttributesValueSetter', () => {
  cy.mount(wrapper(<AttrValueSetter name="strength" />))

  cy.log('Focus on component')
  cy.contains('Strength').press(KEYS.TAB)
  cy.contains('00')

  cy.log('Pressing up while having focus should increment value')
  cy.contains('Strength').press(KEYS.UP)
  cy.contains('01')
  cy.contains('Strength').press(KEYS.UP)
  cy.contains('02')

  cy.log('Pressing right while having focus should increment value')
  cy.contains('Strength').press(KEYS.RIGHT)
  cy.contains('03')

  cy.log('Pressing down while having focus should decrement value')
  cy.contains('Strength').press(KEYS.DOWN)
  cy.contains('02')

  cy.log('Pressing left while having focus should decrement value')
  cy.contains('Strength').press(KEYS.LEFT)
  cy.contains('01')

  cy.log('Mouse click on up arrow should increment value')
  cy.get('button[aria-label="Increase strength"]').as('up-btn').click()
  cy.contains('02')

  cy.log('Pressing enter key on up arrow should increment value')
  cy.get('@up-btn').focus().press(KEYS.ENTER)
  cy.contains('03')

  cy.log('Pressing space key on up arrow should increment value')
  cy.get('@up-btn').focus().press(KEYS.SPACE)
  cy.contains('04')

  cy.log('Mouse click on down arrow should increment value')
  cy.get('button[aria-label="Decrease strength"]').as('down-btn').click()
  cy.contains('03')

  cy.log('Pressing enter key on up arrow should increment value')
  cy.get('@down-btn').focus().press(KEYS.ENTER)
  cy.contains('02')

  cy.log('Pressing space key on up arrow should increment value')
  cy.get('@down-btn').focus().press(KEYS.SPACE)
  cy.contains('01')

  cy.log('Trying to decrease lower than 1 should not work and should show toast')
  cy.get('@down-btn').press(KEYS.SPACE)
  cy.contains('01')
  cy.get('[role="status"]').should(
    'contain.text',
    'Minimum attribute level reached, not your strongest side is it?',
  )

  cy.log('Trying to increase value above 10 should not work and should show toast')
  Cypress._.times(10, () => {
    cy.get('@up-btn').click()
  })
  cy.contains('10')
  cy.get('[role="status"]').should('contain.text', 'Max attribute level reached, you rock!')
})

import { wrapper } from '../../cypress/support/wrapper'
import { ValueSetter } from './value-setter'

const KEYS = Cypress.Keyboard.Keys

it('should render ValueSetter', () => {
  const onClick = cy.stub().as('onClick')
  const onIncrease = cy.stub().as('onIncrease')
  const onDecrease = cy.stub().as('onDecrease')

  cy.mount(
    wrapper(
      <ValueSetter
        name="sneak"
        baseValue={1}
        helperText="helperText"
        valueText="0"
        color="green.600"
        hoverColor="blue.600"
        onClick={onClick}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />,
    ),
  )

  cy.log('Text color should be green')
  cy.getByCy('value-setter')
    .as('hoverable')
    .children()
    .first()
    .as('main')
    .should('have.css', 'color', 'oklch(0.6862 0 0)')

  cy.log('Text color should be blue when component is hovered')
  cy.get('@hoverable').trigger('pointerenter')
  cy.get('@main').should('have.css', 'color', 'oklch(0.6862 0 0)')
  cy.get('@hoverable').trigger('pointerleave')

  cy.log('Focus on component')
  cy.get('@hoverable').press(KEYS.TAB)

  // Test key events on main component
  cy.log('Pressing up while having focus should call onIncrease')
  cy.get('@hoverable').press(KEYS.UP)
  cy.get('@onIncrease').should('have.callCount', 1)

  cy.log('Pressing right while having focus should call onIncrease')
  cy.get('@hoverable').press(KEYS.RIGHT)
  cy.get('@onIncrease').should('have.callCount', 2)

  cy.log('Pressing up while having focus should call onDecrease')
  cy.get('@hoverable').press(KEYS.DOWN)
  cy.get('@onDecrease').should('have.callCount', 1)

  cy.log('Pressing right while having focus should call onDecrease')
  cy.get('@hoverable').press(KEYS.LEFT)
  cy.get('@onDecrease').should('have.callCount', 2)

  // Test left arrow button
  cy.log('Clicking right arrow should call onIncrease')
  cy.get('button[aria-label="Increase sneak"]').as('left-btn').click()
  cy.get('@onIncrease').should('have.callCount', 3)

  cy.log('Pressing enter key on left arrow should call onIncrease')
  cy.get('@left-btn').focus().press(KEYS.ENTER)
  cy.get('@onIncrease').should('have.callCount', 4)

  cy.log('Pressing space key on left arrow should call onIncrease')
  cy.get('@left-btn').focus().press(KEYS.SPACE)
  cy.get('@onIncrease').should('have.callCount', 5)

  // Test right arrow button
  cy.log('Clicking right arrow should call onDecrease')
  cy.get('button[aria-label="Decrease sneak"]').as('right-btn').click()
  cy.get('@onDecrease').should('have.callCount', 3)

  cy.log('Pressing enter key on right arrow should call onDecrease')
  cy.get('@right-btn').focus().press(KEYS.ENTER)
  cy.get('@onDecrease').should('have.callCount', 4)

  cy.log('Pressing space key on right arrow should call onDecrease')
  cy.get('@right-btn').focus().press(KEYS.SPACE)
  cy.get('@onDecrease').should('have.callCount', 5)
})

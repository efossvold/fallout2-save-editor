// oxlint-disable no-undef
// Import commands.js using ES2015 syntax:
// oxlint-disable-next-line import/no-unassigned-import
import './commands'
import { mount } from 'cypress-ct-octane-js'

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount

      /**
       * Get element with Cypress Id
       * @example cy.getByCy('unique-id').should('exist')
       */
      getByCy: (
        selector: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
      ) => Chainable<JQuery>
    }
  }
}

Cypress.Commands.add('mount', mount)

/*
 * getByCy (get by Cypress test Id)
 */
Cypress.Commands.add('getByCy', (selector, ...args) => cy.get(`[data-cy="${selector}"]`, ...args))

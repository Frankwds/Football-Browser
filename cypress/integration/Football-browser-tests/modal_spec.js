import {listenForDetailedGameData, listenForGameData, listenForUserData} from "../../support/listenFunctions"

/// <reference types="cypress" />

const { systemProps } = require("@chakra-ui/styled-system")

describe('Game modal, rating and commenting', () => {

    beforeEach( () => {
        listenForGameData()
        listenForDetailedGameData()
        listenForUserData()
        cy.visit('http://localhost:3000/prosjekt4')
        })

    // it('Optional: Cannot comment when Game is not openened', () => {
        
    // })

    it.skip('Game modal can open', () => {
      // Wait for game and user data to load
      cy.wait('@getGames')
      cy.wait('@userData')
      cy.wait('@userData')
      cy.wait('@userData')
      
      // Click first game
      cy.get('.Result').children().eq(1).click()

      // Confirm modal text is there
      cy.contains('The id of the game is:')
    })



    it('Can Close by X', () => {
              // Wait for game and user data to load
      cy.wait('@getGames')
      cy.wait('@userData')
      cy.wait('@userData')
      cy.wait('@userData')
      
      // Click first game
      cy.get('.Result').children().eq(1).click()

      // Confirm modal text is there
      cy.contains('The id of the game is:')

      //Close modal
      cy.get(`[id="CloseModal"]`).click()
      // Confirm modal text is not there
      cy.wait(200)
      cy.contains('The id of the game is:').should('not.exist')
    })



    it('Can Close by clicking outside', () => {
                      // Wait for game and user data to load
      cy.wait('@getGames')
      cy.wait('@userData')
      cy.wait('@userData')
      cy.wait('@userData')
      
      // Click first game
      cy.get('.Result').children().eq(1).click()

      // Confirm modal text is there
      cy.contains('The id of the game is:')

      //Close modal
      cy.get('body').click(10,10);
      // Confirm modal text is not there
      cy.wait(200)
      cy.contains('The id of the game is:').should('not.exist')
    })
})




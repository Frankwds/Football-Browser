import {listenForDetailedGameData, listenForGameData, listenForUserData, listenForRatings} from "../../support/listenFunctions"


/// <reference types="cypress" />

const { systemProps } = require("@chakra-ui/styled-system")

describe('Game modal, rating and commenting', () => {

    beforeEach( () => {
        listenForRatings()
        listenForGameData()
        listenForDetailedGameData()
        listenForUserData()
        cy.visit('http://localhost:3000/prosjekt4')
        })

    // it('Optional: Cannot comment when Game is not openened', () => {
        
    // })


    it('Can write comment', () => {
      // Wait for game and user data to load
      cy.wait('@getGames')
      cy.wait('@userData') 
      cy.wait('@userData') 
      cy.wait('@userData') 
      
      // Click first game
      cy.get('.Result').children().eq(1).click()
      cy.wait('@gameDetails')
      
      // Find the input field
      cy.get('[testid="comment-input-field"]').type('Input a comment into the database 2')
      cy.get('[testid="comment-input-field"]').invoke('val').then((text) => {
        expect(text === "Input a comment into the database 2").to.be.true
      })
      
    })

    it('Can write and commit comment', () => {
      // Wait for game and user data to load
      cy.wait('@getGames')
      cy.wait('@userData') 
      cy.wait('@userData') 
      cy.wait('@userData') 
      
      // Click first game
      cy.get('.Result').children().eq(1).click()
      cy.wait('@gameDetails')

      // Find the input field
      cy.get('[testid="comment-input-field"]').type('Best match ever!')
      cy.get('[id="commentComponent"]').children().its('length').then(size1 => {
        
        const sizeBefore = size1;
        
        cy.get('[testid = "commentButton"]').click()
        cy.get('[testid="comment-input-field"]').invoke('val').then((text) => {
          expect(text === "").to.be.true
          cy.get('[id="commentComponent"]').children().should('have.length', sizeBefore+1)
        })
      })
    })

    it('Can Rate', () => {
      cy.wait('@getGames')
      cy.wait('@userData') 
      cy.wait('@userData') 
      cy.wait('@userData') 
      
      // Click first game
      cy.get('.Result').children().eq(1).click()
      cy.wait('@gameDetails')
      cy.wait(200)
      cy.get('[id="rating-stars-text"]').invoke('text').then((text1) => {
        const ratingBeforeClick = text1;
        
        cy.get('[testid="rating-stars"]').children().eq(4).click({force: true});
        cy.wait('@rateGame') 
        cy.get('[id="rating-stars-text"]').invoke('text').then((text2) => {
          const ratingAfterClick = text2;
          console.log(ratingBeforeClick);
          console.log(ratingAfterClick);
          expect(ratingBeforeClick != ratingAfterClick).to.be.true
          })
        })
    })
    


  })



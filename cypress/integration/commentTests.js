/// <reference types="cypress" />

describe('Game modal, rating and commenting', () => {

    beforeEach( () => {
        listenForGameData()
        listenForDetailedGameData()
        listenForUserData()
        cy.visit('http://localhost:3000/prosjekt4')
        })

    // it('Optional: Cannot comment when Game is not openened', () => {
        
    // })

    it('Game modal can open', async () => {
      // Wait for game and user data to load
      await cy.wait('@getGames')
      await cy.wait('@userData')  
      
      // Click first game
      cy.get('.Result').children().eq(1).click()

      // Confirm modal text is there
      cy.contains('The id of the game is:')
    })

    it('Can comment', async () => {
      // Wait for game and user data to load
      cy.wait('@getGames')
      cy.wait('@userData') 
      
      // Click first game
      cy.get('.Result').children().eq(1).click()
      cy.wait('@gameDetails')

      // Find the input field
      cy.get('[testid="comment-input-field"]').type('Input a comment into the database 2')
      cy.get('[testid="comment-input-field"]').contains('Input a comment into the database 2')
    })
    // it('Can Rate', () => {
        
    // })
    // it('Can Close by X', () => {
        
    // })
    // it('Can Close by clicking outside', () => {
        
    // })
})
/*

I should test the following:

1. Test sort by date

2. Test sort by country

3. Test sort by League

- Test filter: League and Season.

4. That typing country:eng - england - EnGLand- all results in the same 707 pages of games.

5. Test the same for Home and Away team. Also here case sensitivity should be lowered..

6. That pages change and cannot be zero or less.

7. Test that commenting cannot be done until modal is open.

8. Test that modal opens.

9. Test that commenting works.

10. That that rating works.

*/


function listenForGameData() {
  const URL = "http://it2810-50.idi.ntnu.no:4000/graphql"
  cy.intercept("POST", URL, (req) =>{
    if(req.body.operationName === "GetGamesFilterList"){
      req.alias = "getGames"
      req.continue()
    }
  })
}

function listenForDetailedGameData() {
  const URL = "http://it2810-50.idi.ntnu.no:4000/graphql"
  cy.intercept("POST", URL, (req) =>{
    if(req.body.operationName === "GetGameDetailsByID"){
      req.alias = "gameDetails"
      req.continue()
    }
  })
}
function listenForUserData() {
  const URL = "http://it2810-50.idi.ntnu.no:4000/graphql"
  cy.intercept("POST", URL, (req) =>{
    if(req.body.operationName === "GetUserDataByGameIDMutation"){
      req.alias = "userData"
      req.continue()
    }
  })
}
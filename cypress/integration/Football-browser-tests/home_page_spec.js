describe('The Home Page', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/prosjekt4')
    })

    it('successfully loads', () => {
      cy.visit('/') // Automatically visits URL specified in cypress.json in root
    })

    it('Contains key elements', () => {
      cy.contains("WebDev Project3 - Football browser")
      cy.contains("Filter By")
      cy.contains("Date")
      cy.contains("Page")
      })
  })
  

  describe('Filter and Search', () => {
    it('Filters by League', () => {
        
    })
    it('Filters for Season', () => {
        
    })
    it('Searches for country', () => {
        
    })
    it('Searches for Home Teams', () => {
        
    })
    it('Searches for Away Teams', () => {
        
    })
  })

  describe('Game modal, rating and commenting', () => {

    it('Optional: Cannot comment when Game is not openened', () => {
        
    })
    it('Game modal can open', () => {
        
    })
    it('Can comment', () => {
        
    })
    it('Can Rate', () => {
        
    })
    it('Can Close by X', () => {
        
    })
    it('Can Close by clicking outside', () => {
        
    })
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

function waitForGameData() {
  const URL = "http://it2810-50.idi.ntnu.no:4000/graphql"
  cy.intercept("POST", URL, (req) =>{
    if(req.body.operationName === "GetGamesFilterList"){
      req.alias = "getGames"
      req.continue()
    }
  })
}

function waitForDetailedGameData() {
  const URL = "http://it2810-50.idi.ntnu.no:4000/graphql"
  cy.intercept("POST", URL, (req) =>{
    if(req.body.operationName === "GetGameDetailsByID"){
      req.alias = "gameDetails"
      req.continue()
    }
  })
}
describe('Pagination and Sort', () => {
    beforeEach(() => {
        listenForGameData()
        listenForDetailedGameData()
        cy.visit('http://localhost:3000/prosjekt4')
    })

    it('Is default at page 1', () => {
        cy.contains("Page: 1 of")
    })

    it('Can browse pages', () => {
      

      cy.wait("@getGames")
      cy.get(`[aria-label="Go page front"]`).click().click().click()
      cy.contains("Page: 4 of")
/*       cy.get(`[aria-label="Go page back"]`).click().click().click()
      cy.contains("Page: 1 of") */
    })

    it('Can not browse to less than page 1', () => {
      cy.get(`[aria-label="Go page back"]`).click().click().click().click().click().click()
      cy.contains("Page: 1 of")
    })

    it('Can not browse past last page', () => {
      //This must be tested after filter functions, to get less pages.
    })

    it('Sorts by Date', () => {
        
    })
    it('Sorts by Country', () => {
        
    })
    it('Sorts by League', () => {
        
    })
  })



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